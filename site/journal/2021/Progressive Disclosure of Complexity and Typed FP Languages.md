---
title: Progressive Disclosure of Complexity and Typed FP Languages
subtitle: >
  Or, one part of why to some extent Elm, and to a significant degree PureScript Halogen, can be quite difficult for users to get their heads around at first.
qualifiers:
  audience: >
    People interested in software design (especially <abbr title='application programming interface'>API</abbr> design) and in helping other people learn and adopt functional programming.
  epistemic: >
    *Very* exploratory: I basically just copied this out of my notes verbatim and then fixed up the examples and some of the sentences. It’s “thinking out loud” in hopes the internet will sharpen my thinking.
date: 2021-03-21T19:40:00-0600
tags:
  - software development
  - functional programming
  - Ember
  - JavaScript
  - Elm
  - PureScript
  - programming languages
  - API design
image: https://cdn.chriskrycho.com/file/chriskrycho-com/images/three-fp-ish-tools.png
templateEngineOverride: md

---

It can be hard to get your head around how e.g. a Halogen (PureScript) “component” or even an Elm “model-view-update”-style program works when you first encounter it, and part of the reason is related to the idea of *progressive disclosure of complexity* in <abbr title='application programming interface'>API</abbr> design. That is: while there may be a *very* deep degree of complexity available to fully handle all the corners and edges of a given space, provide <abbr>API</abbr>s which make it so that you only *have* to deal with that complexity when you *need* it—and, by contrast, when you’re doing simple which is far away from those edges or corners, there should be <abbr>API</abbr>s to do those simple things *without* being exposed to things required to handle those edges and corners.

(As with all such [design heuristics](https://v5.chriskrycho.com/journal/heuristics-for-good-software-design/introduction/), “progressive disclosure of complexity” is not a universal law. It’s just a good tool for thinking about how you shape your API design when building out whole systems; it must of course be balanced against *other* design considerations.)

Even a minimal [Elm](https://elm-lang.org) program requires all of this to render a counter:

```elm
import Browser
import Html exposing (Html, button, div, text)
import Html.Events exposing (onClick)

main =
  Browser.sandbox { init = 0, update = update, view = view }

type Msg = Increment | Decrement

update msg model =
  case msg of
    Increment ->
      model + 1

    Decrement ->
      model - 1

view model =
  div []
    [ button [ onClick Decrement ] [ text "-" ]
    , div [] [ text (String.fromInt model) ]
    , button [ onClick Increment ] [ text "+" ]
    ]
```

And in [PureScript](https://www.purescript.org) with [Halogen](https://purescript-halogen.github.io/purescript-halogen/print.html), a basic counter looks like this:

```haskell
module Main where

import Prelude

import Effect (Effect)
import Halogen as H
import Halogen.Aff as HA
import Halogen.HTML as HH
import Halogen.HTML.Events as HE
import Halogen.VDom.Driver (runUI)

main :: Effect Unit
main = HA.runHalogenAff do
  body <- HA.awaitBody
  runUI component unit body

type State = Int

data Action = Increment | Decrement

component :: forall query input output m. H.Component query input output m
component =
  H.mkComponent
    { initialState
    , render
    , eval: H.mkEval H.defaultEval { handleAction = handleAction }
    }

initialState :: forall input. input -> State
initialState _ = 0

render :: forall m. State -> H.ComponentHTML Action () m
render state =
  HH.div_
    [ HH.button [ HE.onClick \_ -> Decrement ] [ HH.text "-" ]
    , HH.text (show state)
    , HH.button [ HE.onClick \_ -> Increment ] [ HH.text "+" ]
    ]

handleAction :: forall output m. Action -> H.HalogenM State Action () output m Unit
handleAction = case _ of
  Decrement ->
    H.modify_ \state -> state - 1

  Increment ->
    H.modify_ \state -> state + 1
```

The thing that stands out to me here is that both Halogen and Elm, albeit to very different degrees, require you to make a trade: all of that type safety (which is genuinely great!) and in the case of PureScript future flexibility as well (type safety via monadic effect management) against having to grok all of this up front.

There’s no *progressive* disclosure of complexity with PureScript. It just discloses *all* the complexity. Whether or not you care about monadic effect management (and for a simple example like this, you don’t!), you still have to deal with that `m` type param in `render` and `handleAction`, because it is (not unreasonably) baked into the signature of the record type required by `H.mkComponent`.

There’s a *little* bit of progressivity to Elm’s approach; this simple program and its type signatures don’t include Elm’s `Cmd` commands, which are its equivalent to the monadic effect management Halogen uses. As a result, the Elm program is similar to the amount of complexity you need to do the same thing in React or Glimmer:[^glimmerx]

[^glimmerx]: Here I’m using [GlimmerX](https://github.com/glimmerjs/glimmer-experimental), which is close to what we expect the future of both Glimmer.js and Ember.js to look like.

```js
import Component from '@glimmerx/component';
import { tracked } from '@glimmerx/tracking';

class Counter extends Component {
  @tracked count = 0;

  increment = () => {
    this.count++;
  };

  decrement = () => {
    this.count--;
  };

  static template = hbs`
    <div>
      <button {{on "click" this.decrement}}>-</button>
      {{this.count}}
      <button {{on "click" this.increment}}>+</button>
    </div>
  `;
}
```

Notice that both Elm and Glimmer are *much* simpler than PureScript. But the simplest a program can get is even simpler than this: it’s just static HTML. Here’s how that looks in Glimmer:

```js
import { hbs } from '@glimmerx/component';

export const App = hbs`<div>This is some HTML!</div>`;
```

Here’s the corresponding Elm:

```elm
import Html exposing (div,text)

main =
  div [] [text "Hello!"]
```

These are of similar (extremely low) complexity: both give you a trivial way to represent *just* <abbr>HTML</abbr>, and both also scale up fairly directly from there. Once you need more, Elm requires *slightly* more boilerplate:

```elm
import Browser
import Html exposing (div, text)

main =
  Browser.sandbox { init = (), update = update, view = view }

update _ model =
  model

view _ =
  div [] [ text "This is some HTML!" ]
```

This is *mostly* equivalent to using a `Component` class even though you don’t need it in Glimmer:

```js
import Component, { hbs } from '@glimmer/component';

export default class extends Component {
  static template = hbs`
    <div>This is some HTML!</div>
  `;
}
```

But notice that we can still get away with not including the equivalent of Elm’s elided (via `_`) `msg` parameter for the `update` function and `model` parameter for the `view` function. There is no `@tracked` anywhere until we actually have to introduce reactivity.

Meanwhile, PureScript massively outweighs both—even for the *simplest possible example*:[^cheating]

[^cheating]: I’m not cheating here! This is, [and I quote](https://github.com/JordanMartinez/purescript-cookbook/tree/master/recipes/HelloHalogenHooks):

    > A Halogen port of the ["HTML - Hello" Elm Example](https://elm-lang.org/examples/hello).

```haskell
module HelloHalogenHooks.Main where

import Prelude
import Data.Maybe (Maybe(..))
import Effect (Effect)
import Halogen as H
import Halogen.HTML as HH
import Halogen.Aff as HA
import Halogen.VDom.Driver (runUI)
import Halogen.Hooks as Hooks

main :: Effect Unit
main =
  HA.runHalogenAff do
    body <- HA.awaitBody
    void $ runUI hookComponent Nothing body

hookComponent
  :: forall unusedQuery unusedInput unusedOutput anyMonad
   . H.Component HH.HTML unusedQuery unusedInput unusedOutput anyMonad
hookComponent = Hooks.component \_ _ -> Hooks.do
  Hooks.pure $
    HH.div_ [ HH.text "This is some HTML!" ]
```

Now, there are three things I want to note about this comparison:

1. Elm actually does a very good job of minimizing unnecessary complexity, and *does* progressively disclose that complexity, if not quite as well as Glimmer does. (PureScript… not so much!)

2. Both Elm and PureScript give you something Glimmer’s reactivity system *doesn’t* (for all that I quite like it, and even when you layer in TypeScript): a soundly-typed algebra (meaning: it composes!) that actually delivers top-to-bottom program robustness and control over mutability. As I said above, you’re making a trade, and the trade is real.

3. Perhaps most importantly, building on that second point: it’s totally reasonable to offer as a rejoinder that real programs don’t look like this—and that over-optimizing for the very simplest thing you can do doesn’t make any sense. That goes double in the context of languages and frameworks designed to scale up and support hundreds of thousands or even millions of lines of code robustly!

I totally grant all of those. Even so, I think it’s valuable to consider how these differ along their disclosure of complexity, and the ease (or difficulty) of learning that comes with it.

I deeply care about this because I strongly believe that functional programming really does improve the robustness and reliability of software.[^magic] Indeed: one of the reasons I am enthusiastic about Ember Octane (with its combination of Glimmer components, autotracking, and modifiers,  effects, and resources) is that it has given me a large lever for helping teach a *lot* of JavaScript developers to think in a more ‘functional’ way, with explicit control over *reactive* mutation and explicit bridges into imperative <abbr title="document object model">DOM</abbr> <abbr>API</abbr>s.

[^magic]: The fact that it isn’t a silver bullet doesn’t mean that it doesn’t help. Structured programming wasn’t a silver bullet either, but it helped enormously!

And so I wonder: what would it look like to design future APIs in languages like Elm or especially PureScript… in a way that only *progressively* exposes that complexity as you actually need it? Could we lower the bar to entry with languages like these, make them more accessible, by having “progressive disclosure of complexity” as a key value proposition for the <abbr>API</abbr> design? Could we thereby make languages like these more accessible to more developers, and thereby improve adoption and hopefully thereby make a dent on the state of the industry as a whole? I think the answer is *yes*—though I also think it’s a hard problem, and better minds than mine have been working at it for a long time.

<div class="callout">

Thoughts and comments? [Email me](mailto:hello@chriskrycho.com?subject=Progressive%20Disclosure%20of%20Complexity%20and%20Typed%20FP%20Languages) or comment on [HN] or [Lobste.rs].

</div>

[HN]: https://news.ycombinator.com/item?id=26536038
[Lobste.rs]: https://lobste.rs/s/lxf7h9/progressive_disclosure_complexity
