#!/usr/bin/env python
# -*- coding: utf-8 -*- #
from __future__ import unicode_literals

AUTHOR = 'Chris Krycho'
SITENAME = 'Chris Krycho'
SITEURL = ''
SITE_DESCRIPTION = 'Creativity, reflection, & passionate endeavors by a peculiar fellow'
SITE_DESCRIPTION_HTML = 'Creativity, reflection, & passionate endeavors<br class="optional"/> by a peculiar fellow'
LOGO = ''

TIMEZONE = 'America/New_York'
DEFAULT_DATE_FORMAT = "%B %d, %Y"
DEFAULT_LANG = 'en'

THEME = 'pelican_theme'
THEME_STATIC_DIR = 'assets'
CSS_FILE = 'style.css'


# Feed generation is usually not desired when developing
FEED_ALL_ATOM = None
CATEGORY_FEED_ATOM = None
TRANSLATION_FEED_ATOM = None
FEED_ALL_RSS = None
CATEGORY_FEED_RSS = None
TRANSLATION_FEED_RSS = None

# Social networking/sharing settings
IDENTITY = {'App.net': 'https://app.net/chriskrycho',
            'Facebook': 'https://www.facebook.com/chriskrycho',
            'Google+': 'https://plus.google.com/+ChrisKrycho',
            'Twitter': 'https://twitter.com/chriskrycho',}

DEFAULT_SHARE_IMAGE = ''

# Category settings
USE_FOLDER_AS_CATEGORY = True  # note: this is the default
DEFAULT_CATEGORY = 'blog'

# Output
OUTPUT_SOURCES = True
OUTPUT_SOURCES_EXTENSION = ".txt"

DEFAULT_DATE_FORMAT = "%B %d, %Y"

# Markdown and text handling
MD_EXTENSIONS = ['codehilite(css_class=highlight)', 'extra', 'toc', 'headerid', 'smartypants(smarten=old-school)']
TYPOGRIFY = True

# Uncomment following line if you want document-relative URLs when developing
RELATIVE_URLS = True

# URLs
ARTICLE_URL = '{date:%Y}/{slug}/'
ARTICLE_SAVE_AS = '{date:%Y}/{slug}/index.html'
PAGE_URL = '{slug}/'
PAGE_SAVE_AS = '{slug}/index.html'
CATEGORY_URL = '{slug}/'
CATEGORY_SAVE_AS = '{slug}/index.html'
TAG_URL = '{slug}/'
TAG_SAVE_AS = '{slug}/index.html'
# AUTHOR_URL = False
# AUTHOR_SAVE_AS = False
# AUTHORS_SAVE_AS = False

# Index and archive pages
DEFAULT_PAGINATION = 10

PAGINATION_PATTERNS = (
    (1, '{base_name}/', '{base_name}/index.html'),
    (2, '{base_name}/page/{number}/', '{base_name}/page/{number}/index.html'),
)

DEFAULT_ORPHANS = 2

# Path configuration
STATIC_PATHS = ['extra/CNAME', 'extra/.htaccess']  # Include the CNAME file
EXTRA_PATH_METADATA = {'extra/CNAME': {'path': 'CNAME'},  # Copy CNAME file to /output
                       'extra/.htaccess': {'path': '.htaccess'},}  # Copy .htaccess file to /output
