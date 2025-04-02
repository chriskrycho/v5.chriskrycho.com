import { env } from 'process';
import { randomBytes } from 'node:crypto';

import { DateTime } from 'luxon';

import { Config, Item, UserConfig, Collection, Data } from '../types/eleventy';
import absoluteUrl from './absolute-url';
import archiveByYear, { byDate, byUpdated, Order } from './archive-by-year';
import copyright from './copyright';
import currentPage from './current-page';
import { resolvedImage } from './data';
import toDateTime, { canParseDate, fromDateOrString, TZ } from './date-time';
import isoDate from './iso-date';
import localeDate from './locale-date';
import markdown from './markdown';
import * as PageLinks from './page-links';
import spacewell from '../lib/spacewell';
import typeset, { Options } from 'typeset';
import siteTitle from './site-title';
import excludingCollection from './excluding-collection';
import {
   toCollection,
   collectionName,
   toCollectionName,
   toCollectionUrl,
   toRootCollection,
} from './collection';
import { roughWordCount } from './word-count';

import yaml from 'js-yaml';

import './feed'; // for extension of types -- TODO: move those types elsewhere!
import striptags from 'striptags';
import niceList from './nice-list';
import { callout, note, quote } from './shortcodes';
import { preparseYaml } from './preparse';

type Not = <A extends unknown[]>(fn: (...args: A) => boolean) => (...args: A) => boolean;
// prettier-ignore
const not: Not =
   (fn) =>
   (...args) =>
      !fn(...args);

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

const isDefined = <A>(a: A | null | undefined): a is A => a != null;

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
         .filter((item) => item.inputPath.includes(path))
         .filter(isLive)
         .filter(excludingStandalonePages)
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
      .filter(isLive)
      .filter(excludingStandalonePages)
      .filter(not(feedOnly))
      .sort(byDate(Order.NewFirst));

   return [
      all.find(inCollectionNamed('elsewhere')),
      all.find(inCollectionNamed('essays')),
      all.find(inCollectionNamed('journal')),
      all.find(inCollectionNamed('library')),
      all.find(inCollectionNamed('notes')),
      all.find(inCollectionNamed('photos')),
   ]
      .filter(isDefined)
      .sort(byDate(Order.NewFirst));
}

const hasUpdated = (item: Item) => canParseDate(item.data?.updated);

function mostRecentlyUpdated(collection: Collection): Item[] {
   const all = collection
      .getAll()
      .filter(isLive)
      .filter(excludingStandalonePages)
      .filter(not(feedOnly))
      .filter(hasUpdated)
      .sort(byUpdated(Order.NewFirst));

   return [
      all.find(inCollectionNamed('essays')),
      all.find(inCollectionNamed('journal')),
      all.find(inCollectionNamed('library')),
      all.find(inCollectionNamed('photos')),
      all.find(inCollectionNamed('elsewhere')),
   ]
      .filter(isDefined)
      .sort(byUpdated(Order.NewFirst));
}

const isFeatured = (item: Item): boolean => item.data?.featured ?? false;

const featured = (collection: Collection): Item[] =>
   collection
      .getAll()
      .filter(isLive)
      .filter(excludingStandalonePages)
      .filter(not(feedOnly))
      .filter(isFeatured)
      .sort(byDate(Order.NewFirst));

const drafts = (collection: Collection): Item[] =>
   collection
      .getAll()
      .filter((item) => item.data?.draft === true)
      .filter(excludingStandalonePages)
      .filter(not(feedOnly))
      .sort(byDate(Order.NewFirst));

const tags = (collection: Collection): string[] => {
   let uniqueTags = collection.getAll().reduce((tags, item) => {
      for (let tag of item.data?.tags ?? []) {
         tags.add(tag);
      }
      return tags;
   }, new Set<string>());

   return Array.from(uniqueTags).sort();
};

const typesetOptions: Options = {
   disable: ['smallCaps', 'hyphenate', 'ligatures', 'smallCaps'],
};
const wellSpaced = spacewell({ emDashes: true, enDashes: true });

const renderMarkdown = (content: string): string =>
   typeset(markdown.render(wellSpaced(content)), typesetOptions);

const renderInlineMarkdown = (content: string): string =>
   typeset(markdown.renderInline(wellSpaced(content)), typesetOptions);

function config(config: Config): UserConfig {
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
   addCollectionFromDir(config, 'journal/2022 in Review');
   addCollectionFromDir(config, 'journal/Next');
   addCollectionFromDir(config, 'journal/2023 in Review');
   addCollectionFromDir(config, 'journal/Read the Code');
   addCollectionFromDir(config, 'journal/Read the Manual');
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
   addCollectionFromDir(config, 'library/Thinking in Systems');
   addCollectionFromDir(config, 'library/Reading Papers in Public');
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

   return {
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
}

// Needs to be this way so that the import resolves as expected in `.eleventy`.
module.exports = config;
