'use strict';

/**
 * Angular translation service
 */

let NpolarTranslate = function($location, $log, NpolarLang, npolarTranslateKeys) {
  'ngInject';

  // Dictionary object
  this.dictionary = {};

  // Normalize array of translations to JSON-LD [string internationalization](http://www.w3.org/TR/json-ld/#string-internationalization):
  // @return [Array] Array of objects with @language and @value keys
  let normalizeTranslations = function(translations, tkey = npolarTranslateKeys) {
    // Any translations?
    if (translations && translations.length > 0) {

    // Make sure all the matching candidate texts contain the right keys
    return translations.filter(cand => cand[tkey.value] && cand[tkey.language]).map(
    text => {
      return { '@language': text[tkey.language],
        '@value': text[tkey.value],
        bundle: text[tkey.bundle] };
    });
    }
    return false;
  };

  // Normalize dictionary array to dictionary object
  // @return [Object]
  let normalizeDictionary = function(dictionary, tkey = npolarTranslateKeys) {
    let dict = {};

    dictionary.forEach(t => {
      let code = t[tkey.lookup];
      let value = normalizeTranslations(t[tkey.translations]);
      // @todo Warn on duplicate codes?
      dict[code] = value;
    });
    return dict;
  };

  let isDebug = function() {
    return ($location.search().debug === '1');
  };

  // Normalize/decorate value
  // @return [String]
  let normalizeValue = function(value,lang,code,orig) {
    if (isDebug()) {
      let l = lang;
      if (lang !== orig) {
        l = `${lang} for ${orig}`;
      }
      return `${code}[${l}]=${value}`;
    }
    return value;
  };

  // Get normalized dictionary (object with JSON-LD style translations)
  this.getDictionary = function() {
    return this.dictionary;
  };

  // Set dictionary (auto-detects type and normalizes Array to Object)
  // @param [Array|Object]
  this.setDictionary = function(dictionary) {
    if (dictionary instanceof Array) {
      this.dictionary = normalizeDictionary(dictionary);
    } else {
      this.dictionary = dictionary;
    }
  };

  // Append to dictionary
  // @param [Array|Object]
  this.appendToDictionary = function(dictionary) {
    if (dictionary instanceof Array) {
      dictionary = normalizeDictionary(dictionary);
    }
    this.dictionary = Object.assign(this.dictionary, dictionary);
  };

  // Find first translation document, by looking up code in dictionary
  // @param [String] code
  // @return [Array|false] Normalized translation array (all @language versions)
  this.find = function(code, dictionary = this.getDictionary()) {
    if (dictionary && dictionary instanceof Object && dictionary[code]) {
      return dictionary[code];
    }
    return false;
  };

  // Translates a string by selecting texts matching the lookup code and language tag,
  // Sibling languages (sharing the same macrolanguage) is used if the there is match for code but not the exact language.
  // This function *always* returns a string, even if the code is not found, see #missing
  // @param [String] code
  // @
  // @
  // @return [String] Translation of code into language identified by subtag lang (context)
  this.translate = function(code, lang = NpolarLang.getLang(), normalize = normalizeValue) {

    // Find texts by code
    // If found: get translation value for lang and normalize
    let texts = this.find(code);
    if (texts) {
      return this.value(texts, lang, code);
    } else {
      // No matches
      if (isDebug()) {
        $log.warn('NpolarTranslate', '0 translations:', code);
      }
      return code;
    }
  };

  // Reduce array of translation objects to a single value ie. the translated string
  // Messy signature, but only the 3 first are normlally used by external callers
  // @return [String] Translation
  // @recursive WARNING
  this.value = function(translations,
    lang,
    code, // Only used for debug output
    originalLang, // Only used for debug
    tkey=npolarTranslateKeys,
    normalize=normalizeValue,
    fallbackLang = NpolarLang.getFallback(lang, translations.map(t => t[tkey.language]))) {

    if (!translations) {
      return;
    }

    if (!originalLang) {
      originalLang = lang;
    }

    // First try the provided lang tag
    // (Notice this may be a fallback language if called in the else block below)
    let exactLangMatch = translations.find(cand => cand[tkey.language].split('-')[0] === lang.split('-')[0]);

    if (exactLangMatch) {
      let value = exactLangMatch[tkey.value];
      return normalize(value, lang, code, originalLang);

    } else {
      // No exact match, get fallback translations, ie. those NOT in the requested lang
      let fallbacks = translations.filter(cand => cand[tkey.language].split('-')[0] !== lang.split('-')[0]);
      if (fallbacks.length === 1) {
        // Just 1 match, deliver
        return fallbacks[0][tkey.value];
      } else {
        // Multiple callbacks, reduce to one by calling self requesting fallbackLang as new translation language
        // and providing the actual fallbacks as translation array (this blocks infinite recursion)
        return this.value(fallbacks, fallbackLang, code, originalLang, tkey, normalize);
      }
    }
  };
  return this;
};

module.exports = NpolarTranslate;
