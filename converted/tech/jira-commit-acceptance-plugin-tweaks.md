Title: JIRA Commit Acceptance Plugin Tweaks
Date: 2012-06-09 01:53
Author: chriskrycho
Slug: jira-commit-acceptance-plugin-tweaks

"JIRA":http://www.atlassian.com/software/jira/ is a great tool, with a
great set of plugin support. Unfortunately, the plugins are not always
kept up to date, and they don't always play as nicely with Windows as
one might hope. The "JIRA Commit Acceptance
Plugin":https://studio.plugins.atlassian.com/wiki/display/CMMT/JIRA+Commit+Acceptance
is a perfect example: the functionality is excellent; the documentation
is okay; and it hasn't been updated in quite some time.

The plugin provides Perl and Python scripts tied to Subversion
pre-commit hooks. I can't speak for the Perl script, but the Python one
hasn't been touched since 2009. It relies on functions that have been
deprecated since at least Python 2.7 (which was released in 2010). To
modernize the script, I pulled the references to @os.popen()@ and
replaced them with the modern (and more helpful)
@subprocess.check\_output()@. I also added some more helpful (read:
verbose) error messages. As of 6/8/2012, it's confirmed to be working
with JIRA 5.05.

Note that the path for @svnlook@ must be "local" to the machine that
calls the script, that is to say \_not the server the pre-commit hook is
hosted on\_ if you are connecting to the repository using @file:///@
rather than @svn://@ or @http(s)://@ (see "this discussion Stack
Overflow":http://stackoverflow.com/questions/32598/any-disadvantages-in-accessing-subversion-repositories-through-file-for-a-sol
for why you should always use the server rather than network shares when
possible). See the "note":\#note below.

\* Download: "click":http://dl.chriskrycho.com/scripts/jira-client.py  
\* Source:

~~~~ {lang="python"}
#!/usr/bin/python

# JIRA commit acceptance python client for SVN
# Author: istvan.vamosi@midori.hu
# $Id: jira-client.py 20980 2009-07-23 06:16:03Z dchui $

# Updated by Chris Krycho 2012-06-09                                                                                                
# www.chriskrycho.com / web@chriskrycho.com 

try:
    import subprocess
    import sys
    import urlparse
    import xmlrpclib
except ImportError:
    exit(1)

# configure JIRA access
# ("projectKey" can contain multiple comma-separated JIRA project keys like "projectKey = 'TST,ARP'".
# If you specify multiple keys, the commit will be accepted if at least one project listed accepts it.
# Or you can specify "projectKey = '*'" to force using the global commit acceptance settings if you don't
# want to specify any exact project key.)
jiraBaseURL = ''
jiraLogin = ''
jiraPassword = ''
projectKey = '*'

# configure svnlook path (e.g. C:/Program Files/TortoiseSVN/bin/svnlook or /usr/bin/svnlook)
svnlookPath = ''

# get committer
try:
    author = subprocess.check_output([svnlookPath, 'author', sys.argv[1], '-t', sys.argv[2]])
except:
    errorMessage = "Unable to get commit author with svnlook."
    errorMessage += ("\n\tRepository:\t"  + sys.argv[1])
    errorMessage += ("\n\tTransaction:\t" + sys.argv[2])
    errorMessage += ("\n\tsvnlook path:\t" + svnlookPath)
    print >> sys.stderr, errorMessage
    sys.exit(1)

# get commit message
try:
    message = subprocess.check_output([svnlookPath, 'log', sys.argv[1], '-t', sys.argv[2]])
except:
    errorMessage = "Unable to get commit message with svnlook."
    errorMessage += ("\n\tRepository:\t"  + sys.argv[1])
    errorMessage += ("\n\tTransaction:\t" + sys.argv[2])
    errorMessage += ("\n\tsvnlook path:\t" + svnlookPath)
    print >> sys.stderr, errorMessage
    sys.exit(1)

# print arguments
print >> sys.stderr, 'Author: ' + author
print >> sys.stderr, 'Commit message: "' + message + '"'

# invoke JIRA web service
xmlrpcUrl = jiraBaseURL + '/rpc/xmlrpc'
try:
    s = xmlrpclib.ServerProxy(xmlrpcUrl)
    acceptance, comment = s.commitacc.acceptCommit(jiraLogin, jiraPassword, author, projectKey, message).split('|');
except:
    acceptance, comment = ['false', 'Unable to connect to the JIRA server at "' + jiraBaseURL + '".']

if acceptance == 'true':
    print >> sys.stderr, 'Commit accepted.'
    sys.exit(0)
else:
    print >> sys.stderr, 'Commit rejected: ' + comment
    sys.exit(1)
~~~~

Note that I've provided examples for the Windows condition as well as
the standard \*nix approaches. If you have to use network shares instead
of the server approach, you'll need to go one step further: you won't be
able to easily have @svnlook@ in a common location (i.e. a shared
network location), so you'll need to make sure everyone has their
@svnlook.exe@ file in the same location or take advantage of the
functionality in my "Network Share Executable
batchfile":http://www.chriskrycho.com/web/tools/run-python-on-a-network-drive-batch-file
or something similar. In our case, I just had everyone install
TortoiseSVN with the command line tools to the default location and
pointed to that. (Note that if the remote installation directories for
svnlook are the same as those on the server, the script will run without
modification regardless of whether users connecting using Network Shares
or @svn:@ or @http:@ – a particularly helpful turn if your users are
used to doing everything via network share (as mine are).

If you find yourself in the strange position I did – having to do all
this on Windows without Python necessarily being installed – you can
make use of the "batch
file":http://www.chriskrycho.com/web/tools/run-python-on-a-network-drive-batch-file
I put together to account for that situation. Getting it working right
\_requires\_ two tweaks:

\* Rename the file to pre-commit.bat so that Subversion knows to run the
file. (If you're not familiar with pre-commit hooks, start
"here":http://svnbook.red-bean.com/en/1.7/svn.ref.reposhooks.html with
an introduction to repository hooks and then read "this
page":http://svnbook.red-bean.com/en/1.7/svn.ref.reposhooks.pre-commit.html
specific to pre-commit hooks.  
\* Where you run the executable, you'll need to explicitly reference
the @jira-client.py@ file, as here, where we use the first argument,
`%1`, to get the repository location:

One optional but highly recommended further tweak:

\* You'll almost certainly want to uncomment the @exit %errorlevel%@
command, because otherwise you may have trouble getting the error
reporting back from the Python script if things aren't working right –
Subversion pre-commit hooks "eat their
@stdout@":http://stackoverflow.com/a/3331889/564181.

~~~~ {lang="winbatch"}
:: Run commands with the network drive mapped
%NETDRIVE%\\python.exe %1\hooks\jira-client.py %1 %2

:: Uncomment this if you want to catch errors from the executable
if %errorlevel% GTR 0 exit %errorlevel%
~~~~

\* Finally, you should be aware that these paths have to be full; you
can't rely on the presence of @PATH@ because Subversion hooks work in an
empty environment context.

p(\#note). Note that if you have problems with users' copies of
@svnlook@ not being in the same location on each machine (as they need
to be for the Python script to work properly), you can apply the same
trick I did with Python itself: put it in a network-shared location and
map the drive for the duration of the script's execution.
