#!/usr/bin/env python
# -*- coding: utf-8 -*- #
from __future__ import unicode_literals

AUTHOR = 'Chris Krycho'
SITENAME = 'chriskrycho.com'
SITEURL = ''

TIMEZONE = 'America/New_York'

DEFAULT_LANG = 'en'

# Feed generation is usually not desired when developing
FEED_ALL_ATOM = None
CATEGORY_FEED_ATOM = None
TRANSLATION_FEED_ATOM = None

# Social widget
SOCIAL = (('Twitter', 'http://twitter.com/chriskrycho'),
          ('App.net', 'http://app.net/chriskrycho'),
          ('Facebook', 'http://www.facebook.com/chriskrycho'),)

DEFAULT_PAGINATION = 5

# Category settings
USE_FOLDER_AS_CATEGORY = True  # note: this is the default
DEFAULT_CATEGORY = 'blog'

# Output
OUTPUT_SOURCES = True
OUTPUT_SOURCES_EXTENSION = ".txt"

# Markdown and text handling
MD_EXTENSIONS = ['codehilite(css_class=highlight)', 'extra', 'toc', 'headerid']
TYPOGRIFY = True

# Uncomment following line if you want document-relative URLs when developing
RELATIVE_URLS = True

# URLs
ARTICLE_URL = '{date:%Y}/{date:%m}/{slug}.html'
ARTICLE_SAVE_AS = '{date:%Y}/{date:%m}/{slug}.html'

# Path configuration
STATIC_PATHS = ['extra/CNAME',]  # Include the CNAME file
EXTRA_PATH_METADATA = {'extra/CNAME': {'path': 'CNAME'},}  # Copy CNAME file to /output
