#!/usr/bin/env python
# -*- coding: utf-8 -*- #
from __future__ import unicode_literals

# This file is only used if you use `make publish` or
# explicitly specify it as your config file.

import os
import sys
sys.path.append(os.curdir)
from pelicanconf import *

SITEURL = 'http://www.chriskrycho.com'
RELATIVE_URLS = False

FEED_ALL_RSS = 'feed.xml'
CATEGORY_FEED_ATOM = 'feeds/%s.xml'
TAG_FEED_RSS = 'feeds/%s.xml'

DELETE_OUTPUT_DIRECTORY = True
