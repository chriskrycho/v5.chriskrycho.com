Title: Python—homebrew, virtualenv, and OS X Framework builds
Date: 2013-10-11 21:37
Author: chriskrycho
Category: Posts
Slug: python-homebrew-virtualenv-os-x-framework-builds

A few weeks ago, I accidentally clobbered my Python 3 installation on
OS X. I had gotten pretty much everything set up again---or so I
thought. To my chagrin, as I got working on a GUI development project
this afternoon, I ended up working on getting Python virtual
environments to play nicely with OS X's special Framework version of
Python. (The fact that I'm using the homebrew version of Python
complicates things even more.)

Moreover, this is not specific to wxPython: the same issues will crop up
with *any* GUI development setup using Python. Since this was an
inordinately painful process, and one I've gone through before, I
resolved to write up what I did to get it working, so that I can avoid
going through this painful process of exploration, Googling, and
face-palming in the future.

Gladly, the solution is pretty simple, albeit a little ugly.

I already had [virtualenvwrapper][] installed, but if you don't, you can
install it easily enough. (Note: use your *primary* system Python---the
one you execute by typing `python` and nothing else. Things get confused
and messy with `virtualenv` and `virtualenvwrapper` if you don't.)

    $ pip install virtualenvwrapper
    $ source /usr/local/bin/virtualenvwrapper.sh

To install Python 3, I ran the following command, using [Homebrew][] to
get a [Framework][] build of Python 3 on my system:

    $ brew install python3 --framework

Note that the command to install a Python 2 framework is the *same*
other than the name of the brew (`python` versus `python3`).

Once you have virtualenvwrapper and a Framework Python installed, you
can go ahead and create a virtual environment to use:

    $ mkvirtualenv -p /usr/local/bin/python3 my_virtual_env

Now things get a little funky. For reasons that are not yet entirely
clear to me, the `virtualenv` tool (around which `virtualenvwrapper` and
its corresponding `mkvirtualenv` call wrap) creates a non-Framework
version of Python, even when you give it the path to a Framework
Python.^[1][]^ This is, to say the least, frustrating. However, there is
a workaround: simply copy the executable you want to use over the one
created in the virtual environment.

You may want to make a backup of the original first---I did.

    $ cp ~/.virtualenvs/my_virtual_env/python3.3 ~/.virtual_envs/my_virtual_env/python3.3-backup
    $ cp /usr/local/bin/python3 ~/.virtualenvs/my_virtual_env/bin

That should do the trick. Obviously you'll still need to install
wxPython (or whatever else) in the correct site packages directory. In
my case, that simply involved one more step:

    $ cp -r ~/Downloads/wx/* ~/.virtualenvs/my_virtual_env/lib/python3.3/site-packages

Summary
-------

To summarize, here is the full installation process on OS X:

1.  Install virtualenvwrapper if you don't already have it

        $ pip install virtualenvwrapper
        $ source /usr/local/bin/virtualenvwrapper.sh

2.  Install a Framework version of Python(3)

        $ brew install python3 --framework

3.  Create and then fix the virtual environment:

        $ mkvirtualenv -p /usr/local/bin/python3.3 my_virtual_env
        $ cp ~/.virtualenvs/my_virtual_env/python3.3 ~/.virtual_envs/my_virtual_env/python3.3-backup
        $ cp /usr/local/bin/python3 ~/.virtualenvs/my_virtual_env/bin

<div class="footnotes">

* * * * *

1.  I'm hoping to spend some time in November seeing if I can figure out
    why `virtualenv` does not create the right kind of Python
    executable. If I get that figured out, I will (1) post my findings
    here and (2) see if I can't get a patch in to remove this pain point
    for others in the future. [↩][]

</div>

  [virtualenvwrapper]: https://bitbucket.org/dhellmann/virtualenvwrapper
  [Homebrew]: http://brew.sh/
  [Framework]: http://stackoverflow.com/q/1444543
  [1]: #fn:1
  [↩]: #fnref:1
