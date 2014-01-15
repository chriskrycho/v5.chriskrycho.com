Title: JIRA, Confluence, Intranets and Windows Firewall
Date: 2012-06-07 08:00
Author: chriskrycho
Category: Posts
Tags: Atlassian, Confluence, development, firewall, intranet, JIRA, port access, Tomcat, Windows 7
Slug: jira-confluence-intranets-and-windows-firewall

For my work with Quest Consultants, I've been working on setting up
version control, issue tracking, and document control. After doing quite
a bit of research, I settled on a few Atlassian products, integrating
JIRA and Confluence with Subversion (you just can't beat TortoiseSVN for
a Subversion client).

Installation goes off without a hitch, generally speaking, but I started
to run into a singular, most annoying problem: I couldn't access the
site on the intranet.<!--more-->

Logging in from the machine where JIRA and Confluence were installed, I
could hit
`localhost:8080`{style="font-family: adelle; font-size: 0.853em"} and
`localhost:8090`{style="font-family: adelle; font-size: 0.853em"} just
fine. I could hit
`machineName:8080`{style="font-family: adelle; font-size: 0.853em"} and
`machineName:8090`{style="font-family: adelle; font-size: 0.853em"} just
fine, too. Attempting to hit them from another machine on the intranet
via the browser got me nowhere. Installing the Telnet server and clients
on Windows 7[1] got me nowhere.

I spent ages looking around and ignoring the obvious solution, because
Windows 7 explicitly asked me if I wanted to allow access to JIRA and
Confluence through the firewall, giving me the option to block all
traffic, allow intranet traffic, allow internet traffic, or allow all
traffic. I picked intranet traffic and moved on, content to know I'd
solved my problem.

Not so. Either the installer didn't report its requirements correctly,
or Windows didn't ask. Either way: Windows 7 was allowing access to the
\_applications\_, but not to the ports the Tomcat Servlets listen on. So
no traffic was ever hitting the server. Open up ports 8080 and 8090, and
boom: everything worked. The same thing applies to any other Atlassian
apps (Fisheye, etc.), and I would guess it's generally applicable to web
applications listening for traffic on nonstandard ports in a Windows 7
environment.

Takeaway: Even if Windows asks you about application permissions, \_you
have to set port permissions manually yourself\_.

Lesson learned: always check the firewall settings first.

For those who have yet be initiated into the wonders of administering
Windows Firewall, here's a basic walkthrough:

\# Open the Start Menu and go to Control Panel  
\# Open the Windows Firewall program. There are three ways to get to
this:  
\#\# If you have your view set to icons (large or small), just look for
Windows Firewall; it's in the list near the bottom.  
\#\# If you have your view set to Category, select System and Security,
then Windows Firewall  
\#\# In either view, simply type "firewall" into the search bar at the
top right and click on Windows Firewall  
\# Click Advanced Settings  
\# Click Inbound Rules  
\# Click New Rule under Actions on the left side of the screen  
\# Select Port in the list of types of rule  
\# Leave TCP selected, and specify all the Altassian application
listener ports you need open - in my case, it was just 8080 and 8090; if
you're running others they'll have their own. Click Next.  
\# Select Allow the Connection; click Next.  
\# Specify the domains you want the rule to apply to. I left Domain and
Private checked, but unchecked Public for security reasons. Click Next.  
\# Give the new rule a name (I went with "JIRA and Confluence Ports")
and, if you want, a description. Click Finish.

That should do it!

* * * * *

fn1. Seriously: why aren't they installed by default, along with tftp
and a half dozen other incredibly useful utilities you have to install
manually?
