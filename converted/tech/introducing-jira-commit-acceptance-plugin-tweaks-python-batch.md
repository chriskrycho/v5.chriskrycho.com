Title: Introducing: JIRA Commit Acceptance Plugin Tweaks (Python, Batch)
Date: 2012-06-25 22:28
Author: chriskrycho
Category: Tools
Tags: batch files, Commit Acceptance, JIRA, plugin, Python, scripts, Subversion
Slug: introducing-jira-commit-acceptance-plugin-tweaks-python-batch

One of the tasks I set for myself with
"JIRA":http://www.atlassian.com/software/jira/overview at
"Quest":http://questconsult.com/ was to configure it and Subversion so
that people can't check in with referencing a JIRA Issue. This is a
little thing, but it helps ensure people will actually use the issue
tracker, instead of letting it languish. Add good version and source
control policies - the kind you implement on the server, not just the
kind you tell people to use (because we all know how well \_that\_ works
out) - and you have a solution that helps people use both version
control and the issue tracker sensibly. <!--more-->

h2. JIRA Commit Acceptance Plugin

h3. Background

The easiest way to get this setup going is with the "JIRA Commit
Acceptance
Plugin":https://studio.plugins.atlassian.com/wiki/display/CMMT/JIRA+Commit+Acceptance,
which allows you to configure various options for allowing or
disallowing check-ins based on whether they reference a JIRA issue and
whether the issue in question has been resolved or not. It even has the
ability to specify different settings project-by-project. This is all
great stuff, and it has support for several version control systems; I'm
using Subversion.

To make it work with Subversion requires integrating with Subversion's
"pre-commit
hook":http://svnbook.red-bean.com/en/1.7/svn.ref.reposhooks.pre-commit.html
concept. Subversion fires these hook scripts off when it hits certain
points in the commit process. It will actually run \_any\_ script that
is executable and named @pre-commit.<extension>@, so you can use
@pre-commit.py@, @pre-commit.sh@, @pre-commit.bat@, @pre-commit.exe@,
@pre-commit.jar@, @pre-commit.rb@... you get the idea. Since the hook is
just an executable script, you can configure actions to do pretty much
whatever you want during that period of time, including call other
scripts.

In this case, the plugin authors provided a set of files:

\* a pre-commit hook (in @.sh@ or @.bat@ form depending on whether
you're on a \*nix or Windows machine, respectively)  
\* two options for the actual script the pre-commit hook calls, which
goes out and checks JIRA for the issues  
\*\* jira-client.py, a Python implementation  
\*\* jira-client.pl, a Perl implementation

I don't know Perl, and frankly I don't care to. It's a fine scripting
language by all accounts, but so is Python - and Python tickles my fancy
for lots of reasons, not least its aesthetic elegance. So it was a
no-brainer for me to use the Python implementation.

h3. Problems and Solutions

There were, however, two problems that needed resolving:

\# As provided, the software didn't actually work. Specifically, the
pre-commit hook didn't play nicely, thanks to the way environment
variables are set and the fact that I couldn't guarantee a local install
of Python.  
\#\* Specifically: the Subversion pre-commit hook runs in an empty
environment, so you have to provide the necessary environment variables.
Being on Windows, this was harder than you might think.  
\# The Python script was woefully out of date.
Hasn't-been-updated-since-2009 out of date,
uses-deprecated-modules-and-functions out of date.

Seeing as the solutions to each of these problems are useful to more
than just me, here they are for the world to make use of. Source code
for each is included below, as well as on its respective page.

h4. jira-client.py tweaks

Download the tweaked file
"here":http://dl.chriskrycho.com/scripts/jira-client.py. See a detailed
writeup of what I did, how and why
"here":http://www.chriskrycho.com/web/tools/jira-commit-acceptance-plugin-tweaks/.

h4. pre-commit.bat tweaks

Necessary to deal with Windows Network Shares (as opposed to good old
Unix network shares, which work much more sensibly). Download the batch
file "here":http://dl.chriskrycho.com/scripts/remote-executable.bat. See
a detailed writeup on dealing with shared network drives and executables
"here":http://www.chriskrycho.com/web/tools/run-executable-on-a-network-drive-batch-file/.
I included some detailed notes on dynamically mapping directories, if
you're curious.

h2. Source code

The following should work with minimal tweaking (after supplying the
@<user-defined pieces>@). Please see the aforementioned pages for
detailed explanations.

h3. jira-client.py

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

h3. Batch file

~~~~ {lang="winbatch"}
@ECHO OFF

setlocal

:: Store working directory to return to after finished
set WORKDIR=%CD%

:: Map and switch to a network drive and give it an arbitrary, unmapped drive letter
pushd \\  

:: Store the name of network drive so it can be unmapped when finished
set NETDRIVE=%CD%
set NETDRIVE=%NETDRIVE:\=%

:: Change back to the original directory
cd /d %WORKDIR%

:: Run commands with the network drive mapped
%NETDRIVE%  

:: Uncomment this if you want to catch errors from the executable
:: if %errorlevel% GTR 0 exit %errorlevel%

:: Unmap the network drive
net use %NETDRIVE% /delete /y

endlocal
~~~~
