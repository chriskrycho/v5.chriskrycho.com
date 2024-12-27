---
title: "TrainingPeaks Virtual and Garmin TacX <span class='all-smcp'>NEO</span> Bike"
subtitle: This combo works but it’s easy to set it up wrong today.

date: 2024-12-27T13:29:00-0700

tags:
    - fitness
    - health

image:
    cdn: tpv-social.jpg

summary: >
    TrainingPeaks Virtual (formerly IndieVelo) will only correctly send incline changes to the bike if it sees the bike primarily as a virtual trainer rather than as a power meter.

---

The short version: If you want [TrainingPeaks Virtual][tpv] to send incline changes to a [Garmin TacX <span class='all-smcp'>NEO</span> Bike][bike] smart trainer app is not using the trainer for power at all, only for a trainer. (Cadence is fine, and an external heart rate monitor is also fine.) It should look about like this: 

![The TrainingPeaks Virtual app showing the smart trainer selected and the power meter *not* selected][screenshot]

Slightly longer version: With the smart trainer connected to the app as both a smart trainer and a power meter, the app may or may not correctly send elevation changes to the bike. As far as I can tell, this is because it does not consistently pick the smart trainer as the primary data source. It seems, though I have not fully confirmed this, that TrainingPeaks Virtual prioritizes whiechever is connected later between the smart trainer data source and the power meter data source (from the trainer!). Given the trainer sends power data just as well when the app sees it as a smart trainer only, there is no reason to have it connected separately as a power meter, though—and doing so only confuses the app. Hopefully they fix this in the future, but this seems to do the trick in the meantime.

[tpv]: https://www.trainingpeaks.com/virtual/
[bike]: https://www.garmin.com/en-US/p/690885
[screenshot]: https://cdn.chriskrycho.com/images/tpv.jpg