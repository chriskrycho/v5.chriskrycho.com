import { filterMap, install } from './eleventy/iterator-helpers.ts';
install();

import { env } from 'process';
import { randomBytes } from 'node:crypto';

import { DateTime } from 'luxon';
import Maybe from 'true-myth/maybe';

import type { Config, Item, UserConfig, Collection, Data } from './types/eleventy.d.ts';
import absoluteUrl from './eleventy/absolute-url.ts';
import archiveByYear, { byDate, byUpdated, Order } from './eleventy/archive-by-year.ts';
import copyright from './eleventy/copyright.ts';
import currentPage from './eleventy/current-page.ts';
import { resolvedImage } from './eleventy/data.ts';
import toDateTime, { canParseDate, fromDateOrString, TZ } from './eleventy/date-time.ts';
import isoDate from './eleventy/iso-date.ts';
import localeDate from './eleventy/locale-date.ts';
import markdown from './eleventy/markdown.ts';
import * as PageLinks from './eleventy/page-links.ts';
import spacewell from './lib/spacewell.ts';
import typeset, { type Options } from 'typeset';
import siteTitle from './eleventy/site-title.ts';
import excludingCollection from './eleventy/excluding-collection.ts';
import {
   toCollection,
   collectionName,
   toCollectionName,
   toCollectionUrl,
   toRootCollection,
} from './eleventy/collection.ts';
import { roughWordCount } from './eleventy/word-count.ts';

import yaml from 'js-yaml';

import './eleventy/feed.ts'; // for extension of types -- TODO: move those types elsewhere!
import striptags from 'striptags';
import niceList from './eleventy/nice-list.ts';
import { callout, note, quote } from './eleventy/shortcodes.ts';
import { preparseYaml } from './eleventy/preparse.ts';

type Not = <A extends unknown[]>(fn: (...args: A) => boolean) => (...args: A) => boolean;
const not: Not = (fn) => (...args) => !fn(...args); // oxfmt-ignore

type Filter = <T>(pred: (t: T) => boolean) => (values: T[]) => T[];
const filter: Filter = (pred) => (values) => values.filter(pred);

const BUILD_TIME = DateTime.fromJSDate(new Date(), TZ).toSeconds();

// Hack around the fact that in dev I want this to work on *every run*, but in prod builds
// I just want one time for the whole run.
const buildTime = () =>
   env.DEV ? DateTime.fromJSDate(new Date(), TZ).toSeconds() : BUILD_TIME;

const isLive = (item: Item) =>
   canParseDate(item.date) &&
   fromDateOrString(item.date).toSeconds() <= buildTime() &&
   !item.data?.draft;

const isStandalonePage = (item: Item) => item.data?.standalonePage ?? false;
const excludingStandalonePages = not(isStandalonePage);
const sendEmail = (item: Item) => item.data?.sendEmail ?? true;
const feedOnly = (item: Item) => item.data?.feedOnly ?? false;

/**
   Use a path to create a collection from all items contained within it.

   @param config The eleventy config
   @param path   The path to filter as a collection
 */
function addCollectionFromDir(config: Config, path: string): void {
   config.addCollection(collectionName({ from: path }), (collections) =>
      collections
         .getAll()
         .values()
         .filter((item) => item.inputPath.includes(path))
         .filter(isLive)
         .filter(excludingStandalonePages)
         .toArray()
         .sort(byDate(Order.NewFirst)),
   );
}

const inCollectionNamed =
   (name: string) =>
   (item: Item): boolean =>
      item.data?.collections[name]?.includes(item) ?? false;

function latest(collection: Collection): Item[] {
   const all = collection
      .getAll()
      .values()
      .filter(isLive)
      .filter(excludingStandalonePages)
      .filter(not(feedOnly))
      .toArray()
      .sort(byDate(Order.NewFirst));

   return [
      all.find(inCollectionNamed('elsewhere')),
      all.find(inCollectionNamed('essays')),
      all.find(inCollectionNamed('journal')),
      all.find(inCollectionNamed('library')),
      all.find(inCollectionNamed('notes')),
      all.find(inCollectionNamed('photos')),
   ]
      .values()
      [filterMap]((item) => Maybe.of(item))
      .toArray()
      .sort(byDate(Order.NewFirst));
}

const hasUpdated = (item: Item) => canParseDate(item.data?.updated);

function mostRecentlyUpdated(collection: Collection): Item[] {
   const all = collection
      .getAll()
      .values()
      .filter(isLive)
      .filter(excludingStandalonePages)
      .filter(not(feedOnly))
      .filter(hasUpdated)
      .toArray()
      .sort(byUpdated(Order.NewFirst));

   return [
      all.find(inCollectionNamed('essays')),
      all.find(inCollectionNamed('journal')),
      all.find(inCollectionNamed('library')),
      all.find(inCollectionNamed('photos')),
      all.find(inCollectionNamed('elsewhere')),
   ]
      .values()
      [filterMap]((item) => Maybe.of(item))
      .toArray()
      .sort(byUpdated(Order.NewFirst));
}

const isFeatured = (item: Item): boolean => item.data?.featured ?? false;

const featured = (collection: Collection): Item[] =>
   collection
      .getAll()
      .values()
      .filter(isLive)
      .filter(excludingStandalonePages)
      .filter(not(feedOnly))
      .filter(isFeatured)
      .toArray()
      .sort(byDate(Order.NewFirst));

const drafts = (collection: Collection): Item[] =>
   collection
      .getAll()
      .values()
      .filter((item) => item.data?.draft === true)
      .filter(excludingStandalonePages)
      .filter(not(feedOnly))
      .toArray()
      .sort(byDate(Order.NewFirst));

const tags = (collection: Collection): string[] => {
   let uniqueTags = new Set(
      collection
         .getAll()
         .values()
         [filterMap]((item) => Maybe.of(item.data?.tags))
         .flatMap((tags) => tags.values())
         .toArray(),
   );

   return Array.from(uniqueTags).sort();
};

const typesetOptions: Options = {
   disable: ['smallCaps', 'hyphenate', 'ligatures', 'smallCaps'],
};
const wellSpaced = spacewell({ emDashes: true, enDashes: true, initials: true });

const renderMarkdown = (content: string): string =>
   typeset(markdown.render(wellSpaced(content)), typesetOptions);

const renderInlineMarkdown = (content: string): string =>
   typeset(markdown.renderInline(wellSpaced(content)), typesetOptions);

const userConfig: UserConfig = {
   dir: {
      input: 'site',
      output: 'public',
      includes: '_includes',
      layouts: '_layouts',
   },
   templateFormats: ['html', 'njk', '11ty.js', 'md'],
   dataTemplateEngine: 'njk',
   htmlTemplateEngine: 'njk',
   markdownTemplateEngine: 'njk',
};

function configure(config: Config): UserConfig {
   config.addWatchTarget('scripts');
   config.addWatchTarget('site/_styles');

   config.addFilter('md', renderMarkdown);
   config.addFilter('inlineMd', renderInlineMarkdown);

   config.addFilter('toCollection', toCollection);
   config.addFilter('toCollectionUrl', toCollectionUrl);
   config.addFilter('toCollectionName', toCollectionName);
   config.addFilter('toRootCollection', toRootCollection);
   config.addFilter(
      'topLevel',
      (obj) =>
         '<ul>' +
         Object.entries(obj)
            .map(([k, v]) => `<li>${k}: ${v}</li>`)
            .join('\n') +
         '</ul>',
   );
   config.addFilter('stringify', (obj) => JSON.stringify(obj));
   config.addFilter('archiveByYears', archiveByYear);
   config.addFilter('absoluteUrl', absoluteUrl);
   config.addFilter('isoDate', isoDate);
   config.addFilter('toDateTime', toDateTime);
   config.addFilter('siteTitle', siteTitle);
   config.addFilter('withValidDate', (items: Item[]) =>
      items.filter((item) => canParseDate(item.date)),
   );
   config.addFilter('current', currentPage);
   config.addFilter('editLink', PageLinks.edit);
   config.addFilter('historyLink', PageLinks.history);
   config.addFilter('sourceLink', PageLinks.source);
   config.addFilter('excludingCollection', excludingCollection);
   config.addFilter('excludingStandalonePages', filter(excludingStandalonePages));
   config.addFilter('excludingFeedOnly', filter(not(feedOnly)));
   config.addFilter('shouldSendEmail', filter(sendEmail));
   config.addFilter('concat', (a: Item[] | undefined, b: Item[] | undefined) => {
      return (a ?? []).concat(b ?? []);
   });
   config.addFilter('localeDate', localeDate);
   config.addFilter('isLive', (items: Item[]) => items.filter(isLive));
   config.addFilter('take', (items: Item[], count: number) => items.slice(0, count));
   config.addFilter('niceList', (s: string[]) => niceList(s).unwrapOr(''));
   config.addFilter('roughWordCount', roughWordCount);

   config.addFilter('excerpt', (content: string) => {
      let safe = striptags(content);
      return safe.slice(0, safe.lastIndexOf(' ', 200)) + '…';
   });

   config.addFilter('resolvedImage', resolvedImage);

   config.addShortcode('randomHash', (env: string | undefined) =>
      env === 'serve' ? `?v=${randomBytes(8).toString('hex')}` : '',
   );

   config.addShortcode('localeDate', localeDate);
   config.addShortcode('copyright', copyright);

   config.addPairedShortcode('note', note);
   config.addPairedShortcode('callout', callout);
   config.addPairedShortcode('quote', quote);

   config.addPassthroughCopy('site/_redirects');
   config.addPassthroughCopy('site/robots.txt');
   config.addPassthroughCopy({
      'site/_assets': 'assets',
      'site/_styles': 'styles',
   });

   config.addCollection('live', (collection) =>
      collection.getAll().filter(isLive).sort(byDate(Order.NewFirst)),
   );
   config.addCollection('pages', (collection) =>
      collection.getAll().filter((item) => item.data?.standalonePage),
   );
   config.addCollection('tags', tags);

   addCollectionFromDir(config, 'journal');
   addCollectionFromDir(config, 'journal/Fanfare for a New Era of American Spaceflight');
   addCollectionFromDir(config, 'journal/Ember Template Imports');
   addCollectionFromDir(config, 'journal/Disney World 2022 Camera Gear');
   addCollectionFromDir(config, 'journal/2022/2022 in Review');
   addCollectionFromDir(config, 'journal/Next');
   addCollectionFromDir(config, 'journal/2023/2023 in Review');
   addCollectionFromDir(config, 'journal/Read the Code');
   addCollectionFromDir(config, 'journal/Read the Manual');
   addCollectionFromDir(config, 'journal/2025/2025 in Review');
   addCollectionFromDir(config, 'essays');
   addCollectionFromDir(config, 'library');
   addCollectionFromDir(config, 'library/Confronted by Grace');
   addCollectionFromDir(config, 'library/Eccentric Existence');
   addCollectionFromDir(config, 'library/Holiness');
   addCollectionFromDir(config, 'library/Holy Scripture');
   addCollectionFromDir(config, 'library/God Without Measure');
   addCollectionFromDir(config, 'library/God Without Measure/Volume I');
   addCollectionFromDir(config, 'library/God Without Measure/Volume II');
   addCollectionFromDir(config, 'library/Politics and the Order of Love');
   addCollectionFromDir(config, 'library/Science and the Good');
   addCollectionFromDir(config, 'library/Seeing Like a State');
   addCollectionFromDir(config, 'library/The Culture of Theology');
   addCollectionFromDir(config, 'library/The Book of the New Sun');
   addCollectionFromDir(config, 'library/The Book of the New Sun/Shadow and Claw');
   addCollectionFromDir(config, 'library/The Doctrine of Scripture');
   addCollectionFromDir(config, 'library/The Examined Run');
   addCollectionFromDir(config, 'library/Thinking in Systems');
   addCollectionFromDir(config, 'library/Reading Papers in Public');
   addCollectionFromDir(config, 'library/Time to Keep');
   addCollectionFromDir(config, 'library/What Can a Body Do');
   addCollectionFromDir(config, 'notes');
   addCollectionFromDir(config, 'elsewhere');
   addCollectionFromDir(config, 'photos');
   addCollectionFromDir(config, 'photos/New Mexico Vacation');
   addCollectionFromDir(config, 'photos/Dinosaur National Monument');

   config.addCollection('nonNotes', (collection) =>
      collection
         .getAll()
         .filter(isLive)
         .filter(not(inCollectionNamed('notes')))
         .sort(byDate(Order.NewFirst)),
   );

   config.addCollection('latest', latest);
   config.addCollection('updated', mostRecentlyUpdated);
   config.addCollection('featured', featured);
   config.addCollection('drafts', drafts);

   config.setLibrary('md', { render: renderMarkdown });

   config.setDataDeepMerge(true);

   // Note: this does not handle the *rest* of the data cascade, *only* front
   // matter, so things in `.11tydata.json` will *not* be handled.
   config.setFrontMatterParsingOptions({
      engines: {
         yaml: (s) => {
            let contents = yaml.load(s);
            if (typeof contents !== 'object') {
               throw new Error(`bad YAML data:\n${JSON.stringify(contents)}`);
            }
            // SAFETY: effectively all the keys are optional. 🤪
            return preparseYaml(contents as Data);
         },
      },
   });

   config.addGlobalData('ENV', process.env.ELEVENTY_RUN_MODE);

   return userConfig;
}

export default configure;
