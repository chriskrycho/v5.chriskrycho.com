Title: PSA: jQuery Validate 1.10.0 'accept' method
Date: 2012-09-22 15:38
Author: chriskrycho
Category: Posts
Tags: jQuery, Public Service Announcements
Slug: psa-jquery-validate-1-10-0-accept-method

Just an FYI for any other potentially confused developers out there: the
[jQuery Validate][] plugin's [documentation][] is out of date as
concerns the [`accept()` method][]: I just spent an hour trying to
figure out why `accept()` it isn't working... Of course, it works just
fine, but I was missing an important piece of the puzzle.

Though the method used to be part of the main validation plugin, *this
is no longer the case*. The method still exists, but it is now part of
the `additional-methods.js`. Accordingly, if you try to use the
`accept()` method without including the extra file, you're going to see
the error message `Cannot call method 'call' of undefined` in your
Javascript console.

The `additional-methods.js` script is part of the standard zip file
download - it's just not necessarily obvious that you need to include
the extra file to make the method work. Hopefully the documentation will
get updated soon so others don't spend a bunch of time trying to figure
out why a basic method isn't working!

  [jQuery Validate]: http://bassistance.de/jquery-plugins/jquery-plugin-validation/
  [documentation]: http://docs.jquery.com/Plugins/Validation
  [`accept()` method]: http://docs.jquery.com/Plugins/Validation#List_of_built-in_Validation_methods
