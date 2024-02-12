---
title: Garmin Training Status – A Complaint
subtitle: >
    The feature ends up being useless to me because it does not model my real-world training very well.

date: 2024-02-10T19:05:00-0700

summary: >
    Garmin’s “Training Status” feature could be handy… if it understood a few more details about how real-world training actually works.

image: https://cdn.chriskrycho.com/images/training-status.jpg

qualifiers:
    audience: >
        Other serious (“recreationally competitive”) athletes  interested in Garmin’s training analysis features.

tags:
    - fitness
    - running
    - health
    - product ideas
    - software development

---

I picked up a [Garmin Forerunner 255][255] last year,[^fr-265] and have kept a curious eye on its [Training Status][ts] feature while training for a few races over that time. Unfortunately, I do not find it particularly useful. There are several significant problems with how it interprets training data in my experience to date.

[255]: https://www.garmin.com/en-US/p/780139/pn/010-02641-00
[ts]: https://www.garmin.com/en-US/garmin-technology/running-science/physiological-measurements/training-status/

First, over the same span, I also started using the [80/20 Endurance][8020] training plans, which emphasize an 80/20% mix of foundation work to higher intensity work.[^using-8020] Theoretically, Garmin’s Training Status feature ought to work really well with this. It breaks down your training load into one of three categories: anaerobic, high aerobic, and low aerobic. The anaerobic and high aerobic buckets *should* both map directly to 80/20’s high-intensity zones (X, 3, Y, 4, and 5), with the low aerobic bucket mapping to the low-intensity zones (1 and 2). In practice, the Training Status report gets very confused by the actual runs I do using the 80/20 plans.

[8020]: https://www.8020endurance.com

As far as I can tell, this is because Training Status is designed to give every run a *single* score, and only breaks down the effect of the run between aerobic and anaerobic. That is: if you take a run that is a mix of sprint-type intervals and a long, slow warm-up and cool-down, Garmin might characterize that as contributing to both aerobic and anaerobic buckets. What it will *not* do is characterize a single run as contributing to both low and high aerobic buckets, even though many runs are designed to do just that. The 80/20 plans in particular nearly always include a mix of easy Zone 1 warm-ups and Zone 2 base mileage before switching over to tempo work, intervals, etc., and often also include a long cooldown. That kind of run is doing multiple things for your system in terms of physical performance, but Garmin seems to treat the whole run as “high aerobic” once it crosses some (relatively low!) percentage threshold of the run in Zone 3 or higher. Once it does that, the entire run is treated as increasing high aerobic load and high aerobic load *only*. The 80/20 plans incorporate foundation work into nearly every run, though, rather than having specific runs which are purely for speed or tempo work. Net, Garmin substantially mischaracterizes the runs in a way it would not if I broke them into three separate runs for the warm-up, tempo or interval work, and cooldown. I am not doing that because it would be a huge pain.[^split]

Second, it is weirdly inconsistent about how it characterizes runs and rides. I regularly see it categorize an hour-long ride where I spent the whole time solidly in Zone 2 for power and much of it in Zone 1 for heart rate as a tempo ride. From time to time I have seen it do the same with long runs with similar heart rate and power zone breakdowns—including times where I have never even come close to the top of Zone 2 for heart rate. Despite the fact that power is all over the place—there is literally nowhere I can run around here that does not include 200+ feet of climb and descent, and keeping running power perfectly “in zone” on those kinds of hills is difficult to say the least—I have seen those results even on runs where I carefully kept my power output consistently in Zone 2 as well. I have repeatedly checked that the Garmin heart rate and power zones are set reasonably, but… it does not matter. This results in Garmin consistently mis-categorizing even more of my runs as being in its “high aerobic” bucket.

Finally, Garmin simply does not seem to adjust for the impact of things like temperature on performance. My Training Status reports have asserted that I am “Maintaining” or “Unproductive” since the start of January, despite the fact that I have made significant progress on benchmark exercises in ways that are really obvious to me. The reason? It has been *really dang cold out*, because I live in Colorado. Oftentimes, there has been snow on the ground which I have been dodging. I am “not improving” on Garmin’s estimation of my <abbr title="maximal aerobic capacity (volume oxygen per time)">V̇O<sub>2</sub> max</abbr>… because I am spending an enormous amount of my physical energy staying warm, carrying around a bunch of extra pounds of gear to help me literally not freeze, and dodging ice. It turns out that my runs under those conditions do in fact not get faster compared to a baseline of runs in beautiful 50–60º weather in mid-to-late fall. This is not weird; this is entirely to be expected. The same dynamic shows up in hot summer runs, where Garmin regularly interprets running slower to avoid heat exhaustion in 90º weather under a bright Colorado sun as a performance regression—when in fact careful heat acclimation often contributes to significant performance *improvements* once temperatures come down in the autumn!

I wish Training Status understood that many workouts have multiple phases to them. In many cases, much of the underlying data is already there, given I am using “structured workouts” which carry along automatic sectioning data. Likewise, I wish it adjusted for weather, and had the ability to supply information about conditions like ice and snow and slush[^trail]—the first part of which is also already possible, since Garmin pulls weather data to associate with activities already! I wish, in sum, that Training Status were smart enough to be useful to me—but as of today, I just ignore it.

[^fr-265]: Annoyingly, I picked it up only a month or so before the [Forerunner 265][265] came out, and I would definitely prefer the 265… but I was not about to turn around and buy a new watch again right after upgrading for the first time in almost five years!

[265]: https://www.garmin.com/en-US/p/886785/pn/010-02810-01

[^using-8020]: This is the same basic approach to training I have used for many years, but (a) with a bit more rigor than the Maffetone age-based heart-rate guide and (b) some nice structured plans I have really enjoyed after more than a decade of building my own plans. I highly recommend the 80/20 materials overall. My one caveat is that their lactate threshold heart rate test formula for a 20-minute test seems to be pretty substantially wrong. Do the test the way they say… and then do the traditional 95% adjustment to get a much more correct number.

[^split]: I *have* seen other athletes I follow on Strava doing this though I suspect that is mostly for ease of their own personal analysis.

[^trail]: You can work around this to a degree by using the “Trail Running” mode, or a mode copied from it, since Garmin does not factor those activities into its <abbr>V̇O<sub>2</sub> max</abbr> calculations… but that is a hack, and it should not be necessary.