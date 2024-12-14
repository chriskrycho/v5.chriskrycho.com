---
title: >
  Product Idea: Meal Tracking for Athletes
subtitle: >
  All of the existing tools need broader design vocabularies.
summary: >
  It would be really great if meal tracking apps had a broader design vocabulary—one which supports what even serious amateur athletes (still less pros!) actually need… because not every day is the same!
date: 2023-01-08T16:23:00-0700
updated: 2023-01-11T08:55:00-0700
updates:
  - at: 2023-01-11T08:55:00-0700
    changes: >
      Added reader feedback about [Cronometer](https://cronometer.com).
permalink: /journal/meal-tracking-for-athletes/
qualifiers:
  audience: >
    People who are at least a little familiar with the landscape of meal tracking apps, especially other serious amateur athletes.
  discusses:
    - caloric restriction
    - dieting
tags:
  - product ideas
  - fitness
  - health
  - software development
  - design

---

I just got back from a long(ish) run and caught up on tracking my food intake for the day and once again got annoyed by how mediocre [MyFitnessPal][mfp] is for the task for athletes in particular.[^mediocre] Most importantly: its design vocabulary starts and stops with losing weight. (It can be bent into supporting for people who want to maintain their current weight, or who need to gain weight, but as a key example of its design vocabulary's limitations: it will not offer congratulations on anything but being “under your goal.”) For athletes, the fit is even worse.

[mfp]: https://www.myfitnesspal.com

My primary goal is not to lose weight, but instead to make sure I eat appropriately for my overall health and fitness. I would like to weight 5–7 pounds less than I do right now at the end of the year, mostly because I *race* better that way, but if I maintain exactly the weight I am at today for the rest of my life that would be perfectly healthy and good. My use of the app is focused instead on matching my eating to my workouts—and I do not mean macro-counting which it does support (…though only because of the constant fads of macro-oriented diets).

No, I mean things like this: I have discovered through long experimentation over the years that it is fine and in fact very helpful for me to do some degree of caloric restriction on off days or days when I am doing some kind of aerobic base building work, whether running or cycling. Indeed, most days right now that is what I *should* do given my goal of being back at my optimal weight for race performance. At the same time, I have also found that I should not do any caloric restriction on days when I have done a hard workout—speed work, tempo runs, fartleks, long runs, etc. If I do, I feel *terrible* the next day. MyFitnessPal understands none of this, and comes near to chastising me for being over my caloric restriction goal on those days, even though I *need* to eat more to be healthy.

A meal-tracking app absolutely could support that kind of differentiation. It would simply need a design vocabulary expansive enough to capture different kinds of days. Preferably, in fact, it would come with some good defaults, but would support you as a user defining your own vocabulary if that were useful. (MyFitnessPal actually supports this for meal names… indicating that this is doable even for an app which is barely trying.) With that capability in place, I would define rest days, base training days, and hard workout days, with slightly different rules and targets for each. I could imagine that going even further, too: focusing on different macros based on my schedule, up to and including knowing what the *next* day’s schedule is.

An app focused on supporting athletes this way could integrate with <abbr title="application programming interface">API</abbr>s from Strava (or other fitness tracking apps),[^why-strava] letting your actual activity inform what the day’s targets should be—in terms of calories and/or macros. For example: given even Strava's simple system of tagging activities as "workout" or "long" or "race", it would be straightforward to associate it with your existing rules for different kinds of days. Heck, MyFitnessPal could build this, though I would rather they start by fixing the basics in the app.

<aside>

As is often the case when making a tool more capability of being shaped to its users’ needs, I strongly suspect that these features would have much broader utility. Off the top of my head: It would be great for women to be able to account for their menstrual cycles. It would be nice to be able to treat sick days differently. It would make it possible for people to build their own plans and approaches for things like intermittent fasting. It would support people going through medical treatments, who need to customize their diets for days when they undergo specific procedures. The list is… long. MyFitnessPal *should* do this.

</aside>

I would absolutely pay money for this feature. I have no idea how many other people would, of course—“There are dozens of us!” might be the extent of it—but I would guess that a *lot* of other serious amateur athletes would appreciate it, and actual pro athletes even more so.

<div class=callout>

A reader (who noted their feedback wasn’t an ad, just an enthusiastic recommendation) suggested checking out [Cronometer](https://cronometer.com):

> I’m also interested in meal tracking that isn’t strictly focused on losing weight. I’ve found the app Cronometer to be a HUGE improvement of my fitness pal. Although it doesn’t quite hit all the points in your post. 
> 
> It is more configurable than my fitness pal, you can base your calories off of other sources (strava included), although not quite in the fine tuned way you described in your post. You can also just set a number of calories, or have it guess based on height/weight/age etc. You can also set custom macro goals for each day of the week. Macronutrient goals aren’t necessarily tied to calories, they can be set in grams too.
> 
> The customizability is nice, but personally the main reason I like Cronometer is that it shows a *ton* of information about your nutrient intake. At least for me, this takes a lot of the emphasis off of the weight and calories, and makes it more about living healthy.

I have just started playing with it, so I cannot say whether I will stick with it, but it may be worth checking out!

</div>



[^mediocre]: This is to say nothing of the app’s enduring mediocrity in every other way. It features astonishing feats of horrible app quality like: having zero state preservation or support for multitasking (good luck looking up a recipe in a browser and returning to an in-progress meal-logging session: said session is gone now!), showing the login screen half the time even when you are already logged in, not having support for dark mode until late 2022, etc.

[^why-strava]: I highlight Strava not only because I use it but because it seems to be the most actively developed and its <abbr>API</abbr> most actively maintained.
