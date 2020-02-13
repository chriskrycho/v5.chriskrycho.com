---
title: Taming Forms
subtitle: …by understanding why they’re so hard to tame.
date: 2020-02-29T08:00
summary: >
    TODO
qualifiers:
    audience: >
        people who write software, especially user interfaces (on any  platform, in any language).
tags:
    - software development
    - UI
    - type-driven development
    - domain-driven design
    - state charts
    - state machines

---


<!--

References:

- [principled forms writeup](https://gist.github.com/chriskrycho/48fa641eeb55217d4063592b411b1192)
- [Slack discussion with Andrew Noyes](https://linkedin-randd.slack.com/archives/DHCGXKD3N/p1581107886022400)

-->

There is a truism among web developers: *forms are hard*. This is a surprising truism given how common forms are, and how simple they seem at first blush. But bound up in forms are some of the more challenging and complex problems in human-computer interaction. In this post, I will do my best to explain just why it is that forms are so difficult, and propose a means of taming them—not by hiding their complexity, but by embracing it.

:::outline

<!-- no toc -->

1. [Inescapable Complexity](#i-inescapable-complexity)
    1. [Forms are stateful](#1-forms-are-stateful)
        1. [Field state](#a-field-state)
        2. [Form state](#b-form-state)
        3. [Multipart form state](#c-multipart-form-state)
    2. [Forms are user interfaces](#2-forms-are-user-interfaces)
        1. [Domain model mismatches](#a-domain-model-mismatches)
        2. [Serialization format mismatches](#b-serialization-format-mismatches)
	3. [Forms are unique](#3-forms-are-unique)

2. [Embracing the Complexity](#ii-embracing-the-complexity)
    1. [Identifying principles](#1-identifying-principles)
    2. [Translating principles into primitives](#2-translating-principles-into-primitives)
    3. [Composing the primitives](#3-composing-primitives-into-abstractions)

:::

# I: Inescapable Complexity

## 1. Forms are stateful

### a. Field state

### b. Form state

Not only is every single field in a form stateful; the *entirety* of the form is stateful. We see this even in one of the simplest forms imaginable: a login form. There are only two fields: username and password.[^simpler-login] However, whether the whole form is valid or not is a function of *both fields*: the form as a whole is valid only if both the username and password are valid. This gives rise to one of the 

[^simpler-login]: Some login forms do away with the password and simply user your email for confirmation. That has its upsides, but even there, it has all the problems of state described in the previous section!

### c. Multipart form state

## 2. Forms are user interfaces

A form is a *user interface*. That obvious statement makes it easy to skip over one of the fundamental challenges with forms: designed *well*, they optimize for the user, not for the programmer.

### a. Domain model mismatches

### b. Serialization format mismatches

## 3. Forms are unique

# II: Embracing the Complexity

There is no way to eliminate all of those complexities in a general way. Remember: every form is not just stateful but *differently* stateful! There is no one-size-fits-all or even one-size-fits most solution. Instead, we must:

1. *Identify principles* that allow us to deal appropriately with the complexity of forms.
2. *Translate* those principles into *appropriate primitives* which can handle any form.
3. *Compose primitives* into useful abstractions.

## 1. Identifying principles

:::alphabetical-list

1. Every form has its own model, where the model is a data structure representing each form field’s type, current value, validation rules, and current validity. The form validity is the composition of the validity of all its fields using the validations.
2. If an input changes something about the rest of the form, that means there is more than one form in play, i.e. that there are sub-forms within the form (even if there is only one `<form>`).
3. Form models are local and freely mutated – because form state is inherently ephemeral unless and until it is “committed” and then persisted in some way.
4. Accordingly, the form model to be mutated is always either:
	- a new instance of a default for the form model (e.g. the empty form, or a form with preselected/prefilled options)
	- a copy of previously-persisted state, mapped to a form model (in what should be a pure function)
5. Persisting a form model is, like creating a form model, a pure function that simply maps back to the target model type in the persistence layer.
6. The validity of a field is not just *invalid* or *valid* but also includes an *unvalidated* state, because forms *begin* unvalidated.

:::

### a. Forms have their own data models

### b. Form models are local and transient

### c. Form fields are individually valid

### d. Form validity is the composition of its fields’ validities

### e. Forms may be composed of sub-forms

### f. Validity is tri-state: <i>unvalidated</i>, <i>invalid</i>, or <i>valid</i>

### g. Form models are owned by whatever validates them

Each form model is owned at whatever level is required for its top-level validation. In a component-based architecture, this would be the component responsible for translating the form model into the domain model for the application.[^anti-corruption]

In the next principle, we will see how this translation happens. Here, we simply need to identify *where* the form model should be defined, where the translation from domain or persistence model to form model happens. This layer matters because it is the layer where we take the untrusted data from the outside world—here, from a user—and turn it into data that is safe to persist into our application.

“Persisting” the data into the rest of our application might mean saving it to a database, or it might just mean that we keep it in memory to perform further operations on it, including using 

[^anti-corruption]: In Domain-Driven Design terms, this is the <i>anti-corruption layer</i>, because [user interfaces are API boundaries](https://v4.chriskrycho.com/2019/user-interfaces-are-api-boundaries.html).

### h. Translate between form and persistence models with pure functions

## 2. Translating principles into primitives

With these principles in hand

## 3. Composing primitives into abstractions

The final step is composing these primitives into abstractions that are appropriate—for a given form, maybe even for an entire app or family of apps. The key is remembering that these abstractions only generalize so far.