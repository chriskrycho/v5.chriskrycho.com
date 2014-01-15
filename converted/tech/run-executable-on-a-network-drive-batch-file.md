Title: Run Executable on a Network Drive - Batch File
Date: 2012-06-09 00:32
Author: chriskrycho
Slug: run-executable-on-a-network-drive-batch-file

You may find you need to run an executable (in my case it was Python)
remotely for some reason or another. This isn't particularly difficult
to pull of on Linux or Unix systems, of course - it's trivial, actually.
It's much more involved on Windows, not least because you can't count on
everyone having the network location mapped the same way, even if they
do have it mapped. However, some fairly straightforward work in a batch
file will make your life much easier.

All you need is the executable installed in a shared location on the
network, and this batch file, and you can basically get the same
functionality you would have with a \*nix network location.

\* Download:
"click":http://dl.chriskrycho.com/scripts/remote-executable.bat  
\* Source:

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

h4. Notes:

\* The big one: you may have trouble with this because Windows can't
find DLLs it relies on. There is often a simple way around this, though:
just copy the DLLs to the same folder as the executable you want to run.
In the case of Python, that's a single DLL (@python27.dll@). Not too
bad!  
\* I'm using @pushd@ rather than @net use \*@ in the beginning of the
script because it automatically changes to the new location. This makes
it trivial to get the name of the newly mapped drive using @%CD%@ -
something that is much more difficult otherwise. (I never actually found
an \_easy\_ way to do it, though there \_are\_ ways out there.)  
\* You can of course also (generally) do as you like with @stdout@ and
@stderr@.  
\* If you want to leave the new drive mapped, you can just drop the
@/delete@ command at the end.
