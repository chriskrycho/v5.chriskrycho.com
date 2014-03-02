#!/usr/bin/env python
# -*- coding: utf-8 -*- #
from __future__ import unicode_literals

AUTHOR = 'Chris Krycho'
SITENAME = 'Chris Krycho'
SITEURL = ''
SITE_DESCRIPTION = 'Creativity, reflection, & passionate endeavors by a peculiar fellow'
SITE_DESCRIPTION_HTML = 'Creativity, reflection, & passionate endeavors<br class="optional"/> by a peculiar fellow'

TIMEZONE = 'America/New_York'
DEFAULT_DATE_FORMAT = "%B %d, %Y"
DEFAULT_LANG = 'en'

THEME = '2014_theme'
THEME_STATIC_DIR = 'assets'
CSS_FILE = 'style.css'

JS_DIR = SITEURL + '/' + THEME_STATIC_DIR + '/js'
IMAGE_DIR = SITEURL + '/' + THEME_STATIC_DIR + '/images'

LOGO = IMAGE_DIR + '/ck.png'

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
            'Twitter': 'https://twitter.com/chriskrycho',
            'GitHub': 'https://github.com/chriskrycho',
            'Bitbucket': 'https://bitbucket.org/chriskrycho',
            'Stack Overflow': 'http://stackoverflow.com/users/564181/chris-krycho',
            'Instagram': 'http://instagram.com/chriskrycho',
            'Soundcloud': 'https://soundcloud.com/chriskrycho',}

DEFAULT_SHARE_IMAGE = ''

# Category settings
USE_FOLDER_AS_CATEGORY = True  # note: this is the default
DEFAULT_CATEGORY = 'blog'

# Output
OUTPUT_SOURCES = True
OUTPUT_SOURCES_EXTENSION = ".txt"

DEFAULT_DATE_FORMAT = "%B %d, %Y"

# Markdown and text handling
MD_EXTENSIONS = ['extra', 'toc', 'headerid', 'smartypants(smarten=old-school)']
TYPOGRIFY = True

# Uncomment following line if you want document-relative URLs when developing
RELATIVE_URLS = True

# URLs
ARTICLE_URL = '{date:%Y}/{slug}.html'
ARTICLE_SAVE_AS = '{date:%Y}/{slug}.html'
PAGE_URL = '{slug}.html'
PAGE_SAVE_AS = '{slug}.html'
CATEGORY_URL = '{slug}/'
CATEGORY_SAVE_AS = '{slug}/index.html'
TAG_URL = '{slug}/'
TAG_SAVE_AS = '{slug}/index.html'
# AUTHOR_URL = False
AUTHOR_SAVE_AS = False
AUTHORS_SAVE_AS = False

# Index and archive pages
DEFAULT_PAGINATION = 10

PAGINATION_PATTERNS = (
    (1, '{base_name}/', '{base_name}/index.html'),
    (2, '{base_name}/page/{number}/', '{base_name}/page/{number}/index.html'),
)

DEFAULT_ORPHANS = 2

# Path configuration
STATIC_PATHS = ['extra/CNAME', 'extra/.htaccess', 'extra/favicon.png']  # Include the CNAME file
EXTRA_PATH_METADATA = {'extra/CNAME': {'path': 'CNAME'},  # Copy CNAME file to /output
                       'extra/favicon.png': {'path': 'favicon.png'},
                       'extra/favicon.ico': {'path': 'favicon.ico'},}  # Copy .htaccess file to /output
