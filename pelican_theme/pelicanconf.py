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

# Social/authorship identity
IDENTITY = {'App.net': 'https://app.net/chriskrycho',
            'Twitter': 'https://twitter.com/chriskrycho',
            'Facebook': 'https://www.facebook.com/chriskrycho',
            'Google': 'https://plus.google.com/+ChrisKrycho',}

DEFAULT_PAGINATION = 5

# Category settings
USE_FOLDER_AS_CATEGORY = True  # note: this is the default
DEFAULT_CATEGORY = 'blog'

# Output
OUTPUT_SOURCES = True
OUTPUT_SOURCES_EXTENSION = ".txt"

# Markdown
MD_EXTENSIONS = ['codehilite(css_class=highlight)', 'extra', 'toc', 'headerid']

# Uncomment following line if you want document-relative URLs when developing
RELATIVE_URLS = True
