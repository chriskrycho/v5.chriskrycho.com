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

1. Inescapable Complexity
    1. Forms are stateful
        1. Field state
        2. Form state
        3. Multipart form state
    2. Forms are UIs
        1. Domain model mismatches
        2. Serialization format mismatches
	3. Forms are unique

2. Embracing the Complexity
    1. Principles for forms
    2. Choosing appropriate primitives
    3. Composing the primitives

:::

# I: Inescapable Complexity

## 1. Forms are stateful

### a. Field state

### b. Form state

Not only is every single field in a form stateful; the *entirety* of the form is stateful. We see this even in one of the simplest forms imaginable: a login form. There are only two fields: username and password.[^simpler-login] However, whether the whole form is valid or not is a function of *both fields*: the form as a whole is valid only if both the username and password are valid. This gives rise to one of the 

[^simpler-login]: Some login forms do away with the password and simply user your email for confirmation. That has its upsides, but even there, it has all the problems of state described in the previous section!

### c. Multipart form state

## 2. Forms are UIs

A form is a *user interface*. That obvious statement makes it easy to skip over one of the fundamental challenges with forms: designed *well*, they optimize for the user, not for the programmer.

### a. Domain model mismatches

### b. Serialization format mismatches

## 3. Forms are unique

# II: Embracing the Complexity

There is no way to eliminate all of those complexities in a general way. Remember: every form is not just stateful but *differently* stateful! There is no one-size-fits-all or even one-size-fits most solution. Insteadn

## 1. Principles for forms
## 2. Choosing appropriate primitives
## 3. Composing the primitives
