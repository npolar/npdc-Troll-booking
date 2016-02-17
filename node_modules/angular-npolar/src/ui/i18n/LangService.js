'use strict';
let tags = require('language-tags');

/**
 * Angular language service
 *
 * For language tags, see
 *
 */
let NpolarLang = function($location, $log, $rootScope, npolarTranslateKeys) {
  'ngInject';

  this.langName = require('./lang-name.json');

  // Get default/fallback language from html@lang
  this.fallback = document.documentElement.getAttribute('lang') || 'en';

  // Available languages
  this.languages = [this.fallback];

  // http://www.iana.org/assignments/language-subtag-registry/language-subtag-registry
  // http://publications.europa.eu/mdr/authority/language/index.html
  // http://standard.difi.no/forvaltningsstandarder/referansekatalogen-html-versjon/#Publisering
  // http://standard.difi.no/filearchive/spraakkoder-presentasjon.pdf
  // Bokmål: nb (ISO 639-1)
  // Nynorsk: nn (ISO 639-1)
  // Nordsamisk: se (ISO 639-1)
  // Lulesamisk: smj (ISO 639-2)
  // Sørsamisk: sma (ISO 639-2)
  // Finsk: fi (ISO 639-1)
  // Kvensk: fkv (ISO 639-3)
  //
  // @return [Array] List of known* language subtags (* known by the application)
  this.getLanguages = function() {
    return this.languages;
  };

  // Counts number of texts in a given language in the current dictionary
  // @return [Object] Example: {"nb":7,"en":7,"ru":1,"eo":1,"nn":1}
  this.getLanguageCounts = function(dictionary, tkey=npolarTranslateKeys) {
    if (!dictionary) {
      throw new Error("No dictionary provided");
    }
    var l = {};

    dictionary.forEach(d => {
      let translations = d[tkey.translations];
      translations.forEach(d => {
        let language = d[tkey.language];
        if (!l[language]) {
          l[language] = 1;
        } else {
          l[language]++;
        }
      });
    });
    return l;
  };

  // @return [Array] List of language names
  this.getLanguageNames = function() {
    return this.langName;
  };

  // Set new language, this involves
  // * persisting "NpolarLang" key to local storage
  // * updating location search parameter (?lang={lang})
  // * updating HTML@lang
  // * broadcast "npolar-lang" to root scope
  this.setLang = function(lang, was = null) {
    if (lang !== this.getLang()) {
      if (tags.language(lang.split('-')[0])) {

        localStorage.setItem('NpolarLang', lang);
        $location.search(Object.assign($location.search(), {
          lang
        }), false /* prevent reload */);
        document.documentElement.setAttribute('lang', lang);
        $rootScope.$broadcast('npolar-lang', {
          lang, name: this.getNativeName(lang)
        });
      } else {
        $log.warn(`Invalid language: ${lang}`);
      }

    }
  };

  // Set available languages
  // Currently only used byu the language switcher
  this.setLanguages = function(arr) {
    this.languages = arr;
  };

  // setLanguagesFromDictionaryUse({ min: 0.25, force: ['en', 'nb', 'nn']);
  this.setLanguagesFromDictionaryUse = function(opt = {min: 0, dictionary: null, force: []}) {
    if (!opt.dictionary || !(opt.dictionary instanceof Array)) {
      // @todo support JSON-LD dictionary object
      throw new Error("No dictionary array provided");
    }
    let dictionary = opt.dictionary;
    let min = opt.min;
    let force = opt.force;

    let langCount = this.getLanguageCounts(dictionary);
    let languages = Object.keys(langCount).sort().filter(l => {
      if (force.includes(l)) {
        return false; // filter out forced to avoid duplicates (we add forced below)
      }
      return (langCount[l] / dictionary.length > min);
    });
    languages = force.concat(languages).sort();
    this.setLanguages(languages);

  };

  // Get current language
  this.getLang = function() {
    let lang = localStorage.getItem('NpolarLang');

    // 1. From local storage (meaning the user has actively picked this language)
    if (lang) {
      return lang;

      // 2. Or from URI, if present
    } else if ($location.search().lang) {
      return $location.search().lang;

      // 3. Fallback (default is html@lang)
    } else {
      return this.fallback;
    }
  };

  // @todo handle language hierarchy (macrolanguage) and fallback hierarchy based on that
  this.getFallback = function(lang, alternatives) {
    let fallback = this.fallback;

    if (!(alternatives instanceof Array)) {
      alternatives = [fallback];
    }
    // @todo normalise both lang and alterntives array
    // was: alternatives = alternatives.map(a => a.split('-')[0].toLowerCase());

    if (/^n(o|b|n)/i.test(lang)) {
      if (alternatives.includes('nn')) {
        return 'nn';
      } else if (alternatives.includes('nb')) {
        return 'nb';
      } else if (alternatives.includes('no')) {
        return 'no';
      }
    }
    return fallback;

  };

  // @return [String] Native name of lang tag
  this.getNativeName = function(lang, names = this.getLanguageNames()) {
    lang = lang.split('-')[0];
    if (names && names[lang]) {
      return names[lang].name;
    } else {
      return lang;
    }

  };

  return this;
};

module.exports = NpolarLang;
