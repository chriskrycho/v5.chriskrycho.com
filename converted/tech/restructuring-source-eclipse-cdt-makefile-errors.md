Title: Restructuring Source, Eclipse CDT, Makefile Errors
Date: 2012-07-25 16:51
Author: chriskrycho
Category: Posts
Tags: CDT, Eclipse, makefiles, source structure
Slug: restructuring-source-eclipse-cdt-makefile-errors

Just a quick note to the world: beware of leftover makefiles if you
restructure a project in Eclipse CDT. Eclipse will happily create new
makefiles with the appropriate information in them when you restructure
you code - if, for example, you move source and header files into their
own directories instead of being in one big blob at the root - but it
won't delete the old ones. As a result, you're likely to see that
ever-so-informative
`` make: *** No rule to make target `calcVCE.o', needed by `cplus2.exe'.  Stop. ``
message that `make` generates when it's looking for a file it can't
find. The old makefile is still hanging around, and Eclipse happily
tries to run `make` against it. The easy solution is just to delete all
your old makefiles when restructuring code and let Eclipse CDT rebuild
them for you from scratch.
