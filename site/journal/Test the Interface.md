---
title: Test the Interface
subtitle: An essential principle for effective software testing.
date: 2019-11-13 22:30:00
category: Tech
tags: 
    - software development
    - testing
summary: >
    A fundamental principle of testing software is: test the interface. If you test at the right level, it makes refactoring easy. If you test at the wrong level, you’re not even really testing what you think you are.
audience: >
    software developers interested in honing their craft—especially folks just trying to get a handle on good techniques for testing.
canonical: https://v4.chriskrycho.com/2019/test-the-interface.html

---

A fundamental principle of testing software is: <i>test the interface</i>. Failing to keep this principle in mind is at the root of the majority of the problems I see in automated tests (including quite a few of those I’ve written in the past!).

What do I mean by <i>test the interface</i>? I mean that when you are thinking about what kind of test to write, you can answer it by thinking about how the piece of code will be *used*. That’s the interface: the place that piece of code interacts with the rest of the world around it. The interaction might be between two functions, or it might be feeding data from a web <abbr title="application programming interface">API</abbr> into your application to show users data, or any of a host of things in between. The point is: wherever that interaction is, *that’s* the interface, and *that’s* what you test.

To see what I mean, let’s define some different kinds of interfaces and how we might test them in the context of a JavaScript application. (I’m using this context because it’s the one I’m most familiar with these days—but the basic principles apply equally well in lots of other contexts.) When we’re writing our app, we have a bunch of different levels of abstraction we can deal with:

- the entire application as the user experiences it
- individual user interface elements within the application—<abbr title="user interface">UI</abbr> components
- functions and classes that manage the business logic of the application

This is actually pretty much it, though each of those covers an enormous amount of ground. Notice too that each of these layers of abstraction (each interface) is composed of lower levels of abstraction (smaller interfaces). However, you still want to test each interface on its own terms.

When you are trying to test the entire application as the user experiences it, you should be doing “end-to-end” style testing, preferably with some kind of testing tool that generates the same kinds of input (from the app’s perspective) as a user would. In web apps, we often use tools like [Puppeteer] or [Webdriver] to simulate a user clicking through our <abbr>UI</abbr> and filling in forms and so on. This is the right level of testing: we interact with the whole app and its interface the same way a user does!

What we *shouldn’t* do at this level is use our knowledge of the framework our app is using to go in and replace function calls, or swap out <abbr>UI</abbr> components. As soon as we do that, our test stops actually telling us the truth about the interface it’s testing. A user can’t reach in and swap out a function at runtime. If *you* do that in your tests, then your test tells you something about a fake world you’ve constructed—not the world your user lives in! How do you *know* that’s the right level to test at? Because that’s the level at which your app interacts with the user: in terms of clicks and form-filling and those kinds of events. *Not* in terms of function calls!

What about <abbr>UI</abbr> components? The same basic principle holds here. The public interface of a component in any modern web framework is its template—whether that’s JSX, Glimmer templates, Vue templates, Angular templates, or something else. How do you know that? Because that’s the level at which the rest of your codebase will *use* the component. So what you should test is that template invocation. This is the level of a “rendering” test (as we call them in Ember).

The rest of your codebase doesn’t have the liberty (and in most cases doesn’t have the *ability*) to reach in and change the behavior of the class or function for your component at runtime. All it can do is call that component with its arguments, and work with anything the component hands back to it. If, during your tests, you violate that—say, by reaching in and calling internal methods on the class that backs a component, rather than via the event handlers you set up to trigger those methods—you are no longer testing what you think you are. Again: you’re in a world of your own construction, *not* the world the rest of your app code lives in. Your test only tells you what happens when you do something manually behind the scenes with the internals of your component… *not* what happens when interacting with the component the way other code will.

The same basic principle applies for other classes used in your codebase. This is the layer for “unit” tests. For functions, you just pass in the various arguments allowed and check that you’re getting the results you expect. For classes, you set them up using their public constructors and call only their public methods and set only their public fields. In languages like JavaScript, Python, Ruby, and others, you can often poke at and use methods and data on the class which are really meant to be private.[^private-fields] That can be particularly tempting when you’re the author of the class: *you* know what these internal details are supposed to do, after all! It can seem faster and easier to just set up a class with some state ahead of time, or to swap out one of its methods for an easier one to test using monkey-patching or mocking.[^easier] If you do this, however, instead of using the documented public <abbr>API</abbr>, you’re once again testing something other that what the rest of your app will be using… and this means that once again your tests don’t actually tell you whether the rest of the app can actually use it correctly!

In each of these cases, we need to <i>test the interface</i>—the place where the rest of the world will interact with our code, *not* its internal mechanics.

This helps guarantee that what we are testing is what the rest of the world sees—whether the “world” in question is other functions or classes, or external <abbr>API</abbr>s, or actual users. It also helps us when refactoring, which is making changes to the internals of some piece of code *without changing its public interface*. If we test the interface, we can safely refactor internally and know two things: if our tests break, we got our refactoring wrong; and we don’t have to change our tests in the process of refactoring! If we test the internals instead of the interface, though, we’ll *often* have to make changes to our tests when we’re trying to refactor, because we’ll be changing those “behind the scenes” details.

None of this is obvious or intuitive when you’re just starting out, but keeping the principle of <i>test the interface</i> in mind will help you pick the right kind of test: end-to-end, some kind of rendering/<abbr>UI</abbr> test for individual components, and unit tests for standalone “business logic” classes or functions. Hopefully this can help a few of you out there internalize this faster than I did!


[Puppeteer]: https://developers.google.com/web/tools/puppeteer
[Webdriver]: https://www.seleniumhq.org/projects/webdriver/


[^private-fields]: JavaScript is getting private fields and methods soon, which will help a lot with this—but the basic principle here will remain important even then, because not everything that’s private in terms of <abbr>API</abbr> design can or should be private in terms of the implementation mechanics. This is a question I’d love to dig into… in a future post.

[^easier]: A related tip—if you find yourself wishing that the implementation were easier to *test*, and needing to mock or stub parts of it to make it testable, that’s *often* a sign that your design needs some work!

    Note that I didn’t spend much time on functions here because it’s much *harder* to get yourself into these messes with functions. In most languages, you don’t have any way to reach in and mess with their internals, so you’re safe from a lot of these issues. Inputs and outputs are all you have to work with. This is one of the great advantages to working with a functional style where you can. Use of closures for managing state complicates this story a bit, but even there: less so than with most of the other things discussed here!
