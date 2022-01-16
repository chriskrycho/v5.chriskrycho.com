---
title: >
    Ember.js Template Imports: Part 1
subtitle: >
    Introducing the series and walking through the formats.
date: 2021-10-12T21:05:00-0600
image: https://cdn.chriskrycho.com/file/chriskrycho-com/images/template-imports/demo.png
series:
  part: 1

templateEngineOverride: md

---

The Ember and Glimmer community is currently experimenting with designs for component templates being available in the same file as supporting JavaScript—sometimes described as “single-file components” (or <abbr>SFC</abbr>s). There are some working implementations in the [ember-template-imports][eti] repository, and Ember’s community and leadership has already committed to making *some* move in this space [the strict mode templates <abbr title="request for comments">RFC</abbr>][strict].

[eti]: https://github.com/ember-template-imports/ember-template-imports
[strict]: https://emberjs.github.io/rfcs/0496-handlebars-strict-mode.html

While each of these has its own upsides and downsides, I believe `<template>` is far and away the best choice, because of its wins for teaching and understanding, scaling, and testing. In this series, I will do my best to present an even-handed analysis that shows how and why I came to that conclusion over the last few years of thinking about it.

In this first post, I will introduce each of the options and give a high-level overview of what I take the tradeoffs in the design space to be. In the following posts, I will cover **Teaching and Understanding**, **Tooling**, and **Testing**. In a final post, I will summarize the tradeoffs once more.

<section class="note" aria-label="note">

It’s important to say before I jump in: these are *my opinions*. They’re *not* official LinkedIn positions, and in fact I have a number of colleagues who disagree with me about some of these things! I’m writing this series to persuade any and all members of the Ember community, including other people at LinkedIn.

</section>

---

This is a *very* large post with a lot of code repeated with small-but-important variations. Feel free to skip around!

- [The options](#the-options)
- [Definitions](#definitions)
- [The *status quo*](#the-status-quo)
    - [Template-only](#template-only)
    - [Stateful/class-backed](#statefulclass-backed)
    - [Using helpers and modifiers](#using-helpers-and-modifiers)
    - [All features](#all-features)
- [`<template>` tags](#template-tags)
    - [Template-only](#template-only-1)
    - [Stateful/class-backed](#statefulclass-backed-1)
    - [Using helpers and modifiers](#using-helpers-and-modifiers-1)
    - [All features](#all-features-1)
- [Tagged template literals with `hbs`](#tagged-template-literals-with-hbs)
    - [Template-only](#template-only-2)
    - [Stateful/class-backed](#statefulclass-backed-2)
    - [Using helpers and modifiers](#using-helpers-and-modifiers-2)
    - [All features](#all-features-2)
- [Svelte/Vue-style](#sveltevue-style)
    - [Template-only](#template-only-3)
    - [Stateful/class-backed](#statefulclass-backed-3)
    - [Using helpers and modifiers](#using-helpers-and-modifiers-3)
    - [All features](#all-features-3)
- [Imports-only](#imports-only)
    - [Template-only](#template-only-4)
    - [Stateful/class-backed](#statefulclass-backed-4)
    - [Using helpers and modifiers](#using-helpers-and-modifiers-4)
    - [All features](#all-features-4)
- [Looking forward](#looking-forward)

---


## The options

There are two currently-implemented proposals, and two other major designs which members of the community have advocated for:

- `<template>` tags with a custom file extension (currently `.gjs` and `.gts`)
- template literals using an `hbs` literal
- something like Svelte’s and Vue’s <abbr>SFC</abbr> format
- an imports-only extension of the current format

A few things which are *not* under discussion here:

- *whether* to adopt a format which supports “strict mode”—the <abbr>RFC</abbr> has already been approved
- the target compilation format: these all assume we are targeting the Glimmer <abbr title="virtual machine">VM</abbr> and the existing, standard output formats for components on that <abbr>VM</abbr>
- whether we should solve some of these problems in other ways (e.g. having other syntax for object literals or the `and` helper etc.)

Finally, for *this* post I will not be offering any commentary on the tradeoffs in the space. Instead, I will leave the commentary to future posts, and here I will keep my commentary to explaining how each approach works.


## Definitions

Throughout this discussion, I will use the following terms:

<dl>
<dt>template-only components</dt>
<dd>Components which have no backing class and therefore no state of their own. Note that a “template-only” component may still be highly <em>dynamic</em> with the use of helpers, modifiers, and possible future extensions to the framework programming model such as <a href="https://www.pzuraq.com/introducing-use/">Resources and Effects</a>.</dd>

<dt>strict mode</dt>
<dd>The “strict” resolution rules for values in templates defined in <a href="https://emberjs.github.io/rfcs/0496-handlebars-strict-mode.html">Ember RFC #0496</a>.</dd>

</dl>

I will also use the same examples throughout:

- a template-only `Greeting` component
- a stateful component for setting a user’s name
- a component which uses built-in helpers and modifiers
- a component which assembles all of these pieces

In these examples, I also assume the following:

- the [ember-truth-helpers](https://github.com/jmurphyau/ember-truth-helpers) addon
- a `@glimmer/modifier` package, which supplies core functionality like the `on` modifier, and which I assume for the purposes of *this* post also supplies a `modifier` function to define new modifiers[^1]

I am also not using the `@action` decorator: in an Ember Octane app, it doesn’t do anything other than bind the `this` context of the class for the method to which it is applied. Leaving it out makes the code a bit briefer, and method-binding/action-handling is not the focus of this series.[^2]

[^1]: In practice, I expect we will largely be authoring standalone functions courtesy of the open RFCs to that end!

[^2]: I’m also [on record](https://github.com/emberjs/rfcs/issues/547#issuecomment-538675681) that I think “action” is a terrible name for what we’re doing with that decorator anyway—and there’s a high likelihood that the syntax there will have to change if [the current decorators proposal](https://github.com/tc39/proposal-decorators/blob/cc962f994c5ae3cccabd9808fc6d1b2b9d627713/README.md) is accepted.


## The *status quo*

Ember and Glimmer apps *work* today, so it’s important to see what they do well and they do *less* well. What’s more, whenever considering a change to a programming language or an <abbr title="application programming interface">API</abbr>, we should have a strong bias *away* from change, and especially away from change for its own sake. Every change is a cost to existing users who have to migrate their code. Even when the change can be made mostly or entirely with automation, it still takes time—to build the automation, to *test* the automation, and ultimately to run the automation.

However, it is worth remembering that we have already decided as a community to adopt features in [strict mode templates][strict] which the *status quo* does not support!


### Template-only

Here we have a simple component which just “greets” the user. In today’s world, this is a standalone file containing just the content to render:

`greeting.hbs`:

```hbs
<p>Hello{{#if @name}}, {{@name}}{{/if}}!</p>
```


### Stateful/class-backed

This example introduces a stateful, class-backed component which uses a bound function to update some tracked state—a small form to let user input her name and use it to generate an avatar (from an imaginary avatar generator on `example.com`.

- `set-username.js`

    ```js
    import Component from '@glimmer/component';
    import { tracked } from '@glimmer/tracking';

    export default class SetUsername extends Component {
      @tracked name;

      get nameValue() {
        return this.name ?? this.args.name;
      }

      updateName = ({ target: { value } }) => {
        this.name = value;
      }

      saveName = (submitEvent) => {
        submitEvent.preventDefault();
        this.args.onSaveName(this.name);
      };
    }
    ```

- `set-username.hbs`: the form itself, which is using `eq` to disable the button if there is no name set[^3]

    ```hbs
    <form {{on "submit" this.saveName}}>
      <label for='name'>Set username:</label>
      <input
        id='name'
        value={{this.nameValue}}
        {{on "input" this.updateName}}
      />

      <button type='submit' disabled={{eq this.name.length 0}}>
        Generate
      </button>
    </form>
    ```

[^3]: Pro tip: don’t do this. There are better ways of handling accessibility, as described in [this CSS Tricks post](https://css-tricks.com/making-disabled-buttons-more-inclusive/); I implemented the approach described there in [this addon](https://github.com/chriskrycho/a11y-disabled-modifier).


### Using helpers and modifiers

We also need to see what it’s like to work with helpers and modifiers—especially in the case where we only need them for one specific component. In this case, we’ll imagine we’re using an `iframe` and need to update its <abbr title="universal resource locator">URL</abbr> without affecting browser history (a [real-world use case!](https://discuss.emberjs.com/t/change-iframe-src-without-adding-history-entry/18645))

- `replace-location.js`

    ```js
    import { modifier } from 'ember-modifier';

    export default modifier((el, _ , { with: newUrl }) => {
      el.contentWindow.location.replace(newUrl);
    });
    ```

- usage:

    ```hbs
    <iframe
      title='...'
      {{replace-location with=@src}}
    />
    ```


### All features

Now we can assemble all of these together with a parent component, `GenerateAvatar`. I am including *all* the files here to give a more direct comparison between each of the approaches.

- `generate-avatar.js`:

    ```js
    import Component from '@glimmer/component';

    export default class GenerateAvatar extends Component {
      @tracked name = "";

      get previewUrl() {
        return `http://www.example.com/avatars/${this.name}`;
      }

      updateName = (newName) => {
        this.name = newName;
      };
    }
    ```

- `generate-avatar.hbs`:

    ```hbs
    <Greeting @name={{this.name}} />
    <SetUsername
      @name={{this.name}}
      @onSaveName={{this.updateName}}
    />

    {{#if (gt 0 this.name.length)}}
      <iframe
        title='Preview'
        {{replace-location with=this.previewUrl}}
      >
    {{/if}}
    ```

- `replace-location.js`

    ```js
    import { modifier } from 'ember-modifier';

    export default modifier((el, _ , { with: newUrl }) => {
      el.contentWindow.location.replace(newUrl);
    });
    ```

- `greeting.hbs`:

    ```hbs
    <p>Hello{{#if @name}}, {{@name}}{{/if}}!</p>
    ```

- `set-username.js`

    ```js
    import Component from '@glimmer/component';
    import { tracked } from '@glimmer/tracking';

    export default class SetUsername extends Component {
      @tracked name;

      get nameValue() {
        return this.name ?? this.args.name;
      }

      updateName = ({ target: { value } }) => {
        this.name = value;
      }

      saveName = (submitEvent) => {
        submitEvent.preventDefault();
        this.args.onSaveName(this.name);
      };
    }
    ```

- `set-username.hbs`:

    ```hbs
    <form {{on "submit" this.saveName}}>
      <label for='name'>Set username:</label>
      <input
        id='name'
        value={{this.nameValue}}
        {{on "input" this.updateName}}
      />

      <button type='submit' disabled={{eq this.value.length 0}}>
        Generate
      </button>
    </form>
    ```


## `<template>` tags

The second proposed format uses `<template>` in files with a custom file extension (currently the proposal has `.gjs` and `.gts` for Glimmer JavaScript or Glimmer TypeScript files respectively).

A `<template>` tag contains the template content, which will be *compiled* to an appropriate value in the JavaScript context. There are two compilation outputs:

1. A `<template>` in module scope (that is, a `<template>` which is not in a class body) compiles to a template-only component.

    - A `<template>` may be assigned to a binding in the JavaScript module:

        ```js
        const Greeting = <template>Hello!</template>
        ```

    - These bindings may be exported or not, just as any other in a JavaScript module:

        ```js
        export const Greeting = <template>Hello!</template>

        const Conditional = hbs`{{#if @val}}, {{@val}}{{/if}}`;

        const Farewell = <template>
          Goodbye<Conditional @val={{@user}} />!
        </template>
        export default Farewell;
        ```

    - A top-level `<template>` with no binding is equivalent to writing `export default <template>...</template>`.

        Accordingly, you cannot have multiple unbound top-level `<template>`, and you cannot have *both* an explicit `export default` and an unbound top-level `<template>`, because having multiple `export default` statements is not allowed in <abbr>JS</abbr>.

2. A `<template>` within a class body compiles to a template attached to the class (and bound to the class prototype, not to class instances).

    ```js
    class Example extends Component {
      respond = () => {
        alert("You clicked it!");
      };

      <template>
        <button type='button' {{on "click" this.respond}}>
          CLICK
        </button>
      </template>
    }
    ```

3. These are the only locations a `<template>` can be created. You cannot create and return them from a function, for example.


### Template-only

`greeting.js`:

```js
<template>
  <p>
    Hello{{#if @name}}, {{@name}}{{/if}}!
  </p>
</template>
```


### Stateful/class-backed

```js
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { on } from '@glimmer/modifier';
import { eq } from 'ember-truth-helpers';

export default class SetUsername extends Component {
  @tracked name;

  get nameValue() {
    return this.name ?? this.args.name;
  }

  updateName = ({ target: { value } }) => {
    this.name = value;
  }

  saveName = (submitEvent) => {
    submitEvent.preventDefault();
    this.args.onSaveName(this.name);
  };

  <template>
    <form {{on "submit" this.saveName}}>
      <label for='name'>Set username:</label>
      <input
        id='name'
        value={{this.value}}
        {{on "input" this.updateName}}
      />
      <button type='submit' disabled={{eq this.value.length 0}}>
        Generate
      </button>
    </form>
  </template>
}
```


### Using helpers and modifiers

The *definition* of the modifier is identical, but it can appear and be used inline with the files where it is needed. See the next section!


### All features

With all these features available, this can be a single file if there is no need to reuse the components.[^4]

```js
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { on, modifier } from '@glimmer/modifier';
import { eq, gt } from 'ember-truth-helpers';

const Greeting = <template>
  <p>Hello{{#if @name}}, {{@name}}{{/if}}!</p>
</template>

const replaceLocation = modifier(
  (el, _ , { with: newUrl }) => {
    el.contentWindow.location.replace(newUrl);
  }
);

class SetUsername extends Component {
  @tracked name = '';

  updateName = ({ target: { value } }) => {
    this.name = value;
  }

  saveName = (submitEvent) => {
    submitEvent.preventDefault();
    this.args.onSaveName(this.name);
  };

  <template>
    <form {{on "submit" this.saveName}}>
      <label for='name'>Set username:</label>
      <input
        id='name'
        value={{this.value}}
        {{on "input" this.updateName}}
      />
      <button type='submit' disabled={{eq this.value.length 0}}>
        Generate
      </button>
    </form>
  </template>
}

export default class GenerateAvatar extends Component {
  @tracked name = "";

  get previewUrl() {
    return `http://www.example.com/avatars/${name}`;
  }

  updateName = (newName) => {
    this.name = newName;
  };

  <template>
    <Greeting @name={{this.name}} />
    <SetUsername
      @name={{this.name}}
      @onSaveName={{this.updateName}}
    />
    
    {{#if (gt 0 this.name.length)}}
      <iframe
        title='Preview'
        {{replaceLocation with=this.previewUrl}}
      >
    {{/if}}
  </template>
}
```

[^4]: And even if there *is*, if we think about them as related: `Greeting` could be a named export, for example.


## Tagged template literals with `hbs`

The second proposal, currently implemented in the GlimmerX experiment, is an extension of an existing feature in Ember: the use of a special `hbs` tagged template literals. (This is similar to how templates defined for tests work today.) In the proposed design, `hbs` is imported from `ember-template-imports` as a named import; in a final design it would presumably be imported from `@glimmer/component`:

```js
import { hbs } from '@glimmer/component';
```

The rules are very similar to those for the `<template>` proposal:

1. The result of an `hbs` invocation in module scope (not in a class body) is a template-only component, bound to a name in a module. It can be a default export or a named export or not exported at all:

    - An `hbs` invocation may be assigned to a binding in the JavaScript module:

        ```js
        import { hbs } from '@glimmer/component';
        
        const Greeting = hbs`Hello!`;
        ```

    - These bindings may be exported or not, just as any other in a JavaScript module:    

        ```js
        import { hbs } from '@glimmer/component';

        export const Greeting = hbs`Hello!`;

        const Conditional = hbs`{{#if @val}}, {{@val}}`;

        const Farewell = hbs`Goodbye<Conditional @val={{@user}} />!`;
        export default Farewell;
        ```

    - Unlike with `<template>`, there is no special case behavior for a single definition, so a default template-only component export would be written like so:

        ```js
        import { hbs } from '@glimmer/component';

        export default hbs`Hello!`;
        ```

2. To define the template for a class-backed/stateful component, you assign it to the specially-named (effectively *reserved*) `static` field `template` on the backing class:
     
    ```js
    import Component, { hbs } from '@glimmer/component';

    class Example extends Component {
      respond = () => {
        alert("You clicked it!");
      };

      static template = hbs`
        <button type='button' {{on "click" this.respond}}>
          CLICK
        </button>
      `;
    }
    ```

3. These are the only locations the result of `hbs` can be used. You cannot create and return them from a function, for example.

4. `hbs` invocations are compiled out; they are *not* actual tagged template strings, and so cannot use `${...}` syntax for string interpolation.


### Template-only

`greeting.js`:

```js
import { hbs } from '@glimmer/component';

export default hbs`
  <p>Hello{{#if @name}}, {{@name}}{{/if}}!</p>
`;
```


### Stateful/class-backed

`set-username.js`:

```js
import Component, { hbs } from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { on } from '@glimmer/modifier';
import { eq } from 'ember-truth-helpers';

export default class SetUsername extends Component {
  @tracked name;

  get nameValue() {
    return this.name ?? this.args.name;
  }

  updateName = ({ target: { value } }) => {
    this.name = value;
  }

  saveName = (submitEvent) => {
    submitEvent.preventDefault();
    this.args.onSaveName(this.name);
  };

  static template = hbs`
    <form {{on "submit" this.saveName}}>
      <label for='name'>Set username:</label>
      <input
        id='name'
        value={{this.value}}
        {{on "input" this.updateName}}
      />
      <button type='submit' disabled={{eq this.value.length 0}}>
        Generate
      </button>
    </form>
  `;
}
```


### Using helpers and modifiers

As with `<template>`, the *definition* of the modifier is identical, but it can appear and be used inline with the files where it is needed. See the next section!


### All features

Again, with all these features available, this can be a single file if there is no need to reuse the components.

```js
import Component, { hbs } from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { on, modifier } from '@glimmer/modifier';
import { eq, gt } from 'ember-truth-helpers';

const Greeting = hbs`
  <p>Hello{{#if @name}}, {{@name}}{{/if}}!</p>
`;

const replaceLocation = modifier((el, _ , { with: newUrl }) => {
  el.contentWindow.location.replace(newUrl);
});

class SetUsername extends Component {
  @tracked name = '';

  updateName = ({ target: { value } }) => {
    this.name = value;
  }

  saveName = (submitEvent) => {
    submitEvent.preventDefault();
    this.args.onSaveName(this.name);
  };

  static template = hbs`
    <form {{on "submit" this.saveName}}>
      <label for='name'>Set username:</label>
      <input
        id='name'
        value={{this.value}}
        {{on "input" this.updateName}}
      />
      <button type='submit' disabled={{eq this.value.length 0}}>
        Generate
      </button>
    </form>
  `;
}

export default class GenerateAvatar extends Component {
  @tracked name = "";

  get previewUrl() {
    return `http://www.example.com/avatars/${name}`;
  }

  updateName = (newName) => {
    this.name = newName;
  };

  static template = hbs`
    <Greeting @name={{this.name}} />
    <SetUsername
      @name={{this.name}}
      @onSaveName={{this.updateName}}
    />
    
    {{#if (gt 0 this.name.length)}}
      <iframe
        title='Preview'
        {{replaceLocation with=this.previewUrl}}
      >
    {{/if}}
  `;
}
```


## Svelte/Vue-style

For convenience, and following Svelte and Vue’s example, I am using a `.glimmer` file extension for the following examples:

### Template-only

`greeting.glimmer`:

```hbs
<p>Hello{{#if @name}}, {{@name}}{{/if}}!</p>
```


### Stateful/class-backed

`set-username.glimmer`:

```hbs
<script>
  import Component from '@glimmer/component';
  import { tracked } from '@glimmer/tracking';

  export default class SetUsername extends Component {
    @tracked name;

    get nameValue() {
      return this.name ?? this.args.name;
    }

    updateName = ({ target: { value } }) => {
      this.name = value;
    }

    saveName = (submitEvent) => {
      submitEvent.preventDefault();
      this.args.onSaveName(this.name);
    };
  }
</script>

<form {{on "submit" this.saveName}}>
  <label for='name'>Set username:</label>
  <input
    id='name'
    value={{this.value}}
    {{on "input" this.updateName}}
  />
  <button type='submit' disabled={{eq this.value.length 0}}>
    Generate
  </button>
</form>
```


### Using helpers and modifiers

Helpers and modifiers in a hypothetical Svelte/Vue-style template could be defined next to the component backing class, so I will demonstrate them in the next section that way. They could of course also be defined in other modules and imported.


### All features

Unlike in the `<template>` and `hbs` scenarios, you cannot define multiple components in the same file with this format. Accordingly, here we *must* have three separate files:

- `greet.glimmer`:

    ```hbs
    <p>Hello{{#if @name}}, {{@name}}{{/if}}!</p>
    ```

- `set-username.glimmer`:

    ```hbs
    <script>
      import Component from '@glimmer/component';
      import { tracked } from '@glimmer/tracking';
      import { on } from '@glimmer/modifier';
      import { eq } from 'ember-truth-helpers';

      export default class SetUsername extends Component {
        @tracked name = '';

        updateName = ({ target: { value } }) => {
          this.name = value;
        }

        saveName = (submitEvent) => {
          submitEvent.preventDefault();
          this.args.onSaveName(this.name);
        };
      }
    </script>

    <form {{on "submit" this.saveName}}>
      <label for='name'>Set username:</label>
      <input
        id='name'
        value={{this.value}}
        {{on "input" this.updateName}}
      />
      <button type='submit' disabled={{eq this.value.length 0}}>
        Generate
      </button>
    </form>
    ```

- `generate-avatar.glimmer`:

    ```hbs
    <script>
      import Component from '@glimmer/component';
      import { tracked } from '@glimmer/tracking';
      import { modifier } from '@glimmer/modifier';
      import { gt } from 'ember-truth-helpers';

      import Greeting from './greeting';
      import SetUsername from './set-username';

      const replaceLocation = modifier(
        (el, _ , { with: newUrl }) => {
          el.contentWindow.location.replace(newUrl);
        }
      );

      export default class GenerateAvatar extends Component {
        @tracked name = "";

        get previewUrl() {
          return `http://www.example.com/avatars/${name}`;
        }

        updateName = (newName) => {
          this.name = newName;
        };
      }
    </script>

    <Greeting @name={{this.name}} />
    <SetUsername
      @name={{this.name}}
      @onSaveName={{this.updateName}}
    />
    
    {{#if (gt 0 this.name.length)}}
      <iframe
        title='Preview'
        {{replaceLocation with=this.previewUrl}}
      >
    {{/if}}
    ```


## Imports-only

The final option under consideration is a very small extension of today’s baseline, which adds support for “front-matter” to templates, to allow them to specify imports explicitly. In this case, things work *exactly* as they do today, but all non-keyword functionality must be explicitly imported, including other components invoked within the component. For example, to define a template-only component which uses the `{{on}}` modifier, you would do this:

```hbs
---
import { on } from '@glimmer/modifier';
---

<div {{on "mousenter" @isHovered}}></div>
```


### Template-only

Template-only components with no imports look exactly as they do today:

`greeting.hbs`:

```hbs
<p>Hello{{#if @name}}, {{@name}}{{/if}}!</p>
```


### Stateful/class-backed

Class-backed/stateful components look much the same on the class definition side as they do today. The big difference is that the template side must separately define its imports as well.

- `set-username.js`

    ```js
    import Component from '@glimmer/component';
    import { tracked } from '@glimmer/tracking';

    export default class SetUsername extends Component {
      @tracked name = '';

      updateName = ({ target: { value } }) => {
        this.name = value;
      }

      saveName = (submitEvent) => {
        submitEvent.preventDefault();
        this.args.onSaveName(this.name);
      };
    }
    ```

- `set-username.hbs`

    ```hbs
    ---
    import { on } from '@glimmer/modifier';
    import { eq } from 'ember-truth-helpers';
    ---

    <form {{on "submit" this.saveName}}>
      <label for='name'>Set username:</label>
      <input
        id='name'
        value={{this.value}}
        {{on "input" this.updateName}}
      />
      <button type='submit' disabled={{eq this.value.length 0}}>
        Generate
      </button>
    </form>
    ```


### Using helpers and modifiers

In the imports-only world, helpers and modifiers must be defined in their own file and imported. Accordingly, the definition is as it is with today’s *status quo*.

`replace-location.js`

```js
import { modifier } from 'ember-modifier';

export default modifier((el, _ , { with: newUrl }) => {
  el.contentWindow.location.replace(newUrl);
});
```


### All features

As with the rest of this section, this represents a fairly minimal change over the *status quo*. The only difference is the requirement for templates to explicitly define their imports.

- `generate-avatar.js`:

    ```js
    import Component from '@glimmer/component';

    export default class GenerateAvatar extends Component {
      @tracked name = "";

      get previewUrl() {
        return `http://www.example.com/avatars/${name}`;
      }

      updateName = (newName) => {
        this.name = newName;
      };
    }
    ```

- `generate-avatar.hbs`:

    ```hbs
    ---
    import { gt } from 'ember-truth-helpers';
    import Greeting from './greeting';
    import SetUsername from './set-username';
    import replaceLocation from '../modifiers/replace-location';
    ---

    <Greeting @name={{this.name}} />
    <SetUsername
      @name={{this.name}}
      @onSaveName={{this.updateName}}
    />

    {{#if (gt 0 this.name.length)}}
      <iframe
        title='Preview'
        {{replaceLocation with=this.previewUrl}}
      >
    {{/if}}
    ```

- `replace-location.js`

    ```js
    import { modifier } from 'ember-modifier';

    export default modifier((el, _ , { with: newUrl }) => {
      el.contentWindow.location.replace(newUrl);
    });
    ```

- `greeting.hbs`:

    ```hbs
    <p>Hello{{#if @name}}, {{@name}}{{/if}}!</p>
    ```

- `set-username.js`

    ```js
    import Component from '@glimmer/component';
    import { tracked } from '@glimmer/tracking';

    export default class SetUsername extends Component {
      @tracked name;

      get nameValue() {
        return this.name ?? this.args.name;
      }

      updateName = ({ target: { value } }) => {
        this.name = value;
      }

      saveName = (submitEvent) => {
        submitEvent.preventDefault();
        this.args.onSaveName(this.name);
      };
    }
    ```

- `set-username.hbs`: the form itself, which is using `eq` to disable the button if there is no name set[^3]

    ```hbs
    ---
    import { on } from '@glimmer/modifier';
    import { eq } from 'ember-truth-helpers';
    ---

    <form {{on "submit" this.saveName}}>
      <label for='name'>Set username:</label>
      <input
        id='name'
        value={{this.nameValue}}
        {{on "input" this.updateName}}
      />

      <button type='submit' disabled={{eq this.value.length 0}}>
        Generate
      </button>
    </form>
    ```


## Looking forward

Hopefully this gives you a good sense of the overall *feel* of the moves currently under consideration in design the space. You may have some opinions already about which of these you like best—certainly I did when I first started thinking about this. Even so, I hope you’ll also consider the tradeoffs here with an open mind as I present them! You can start by reading [**Part 2**](https://v5.chriskrycho.com/journal/ember-template-imports/part-2/).
