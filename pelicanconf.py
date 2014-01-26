#!/usr/bin/env python
# -*- coding: utf-8 -*- #
from __future__ import unicode_literals

AUTHOR = 'Chris Krycho'
SITENAME = 'chriskrycho.com'
SITEURL = ''

TIMEZONE = 'America/New_York'

DEFAULT_LANG = 'en'

# Feed generation is usually not desired when developing
FEED_ATOM = None
FEED_ALL_ATOM = None
CATEGORY_FEED_ATOM = None
FEED_ALL_RSS = None
CATEGORY_FEED_RSS = None

# Social widget
IDENTITY = {'App.net': 'https://app.net/chriskrycho',
            'Facebook': 'https://www.facebook.com/chriskrycho',
            'Google+': 'https://plus.google.com/+ChrisKrycho',
            'Twitter': 'https://twitter.com/chriskrycho',}

DEFAULT_PAGINATION = 5

# Category settings
USE_FOLDER_AS_CATEGORY = True  # note: this is the default
DEFAULT_CATEGORY = 'blog'

# Output
OUTPUT_SOURCES = True
OUTPUT_SOURCES_EXTENSION = ".txt"

# Markdown and text handling
MD_EXTENSIONS = ['codehilite(css_class=highlight)', 'extra', 'toc', 'headerid', 'smartypants(smarten=old-school)']
TYPOGRIFY = True

# Uncomment following line if you want document-relative URLs when developing
RELATIVE_URLS = True

# URLs
ARTICLE_URL = '{date:%Y}/{slug}.html'
ARTICLE_SAVE_AS = '{date:%Y}/{slug}.html'
PAGE_URL = '{slug}.html'
PAGE_SAVE_AS = '{slug}.html'
CATEGORY_URL = '{slug}.html'
CATEGORY_SAVE_AS = '{slug}.html'
TAG_URL = '{slug}.html'
TAG_SAVE_AS = '{slug}.html'
# AUTHOR_URL = None
# AUTHOR_SAVE_AS = None

# Path configuration
STATIC_PATHS = ['extra/CNAME', 'extra/.htaccess']  # Include the CNAME file
EXTRA_PATH_METADATA = {'extra/CNAME': {'path': 'CNAME'},  # Copy CNAME file to /output
                       'extra/.htaccess': {'path': '.htaccess'},}  # Copy .htaccess file to /output
