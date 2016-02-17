'use strict';

let translateKeys = {
  value: '@value',        // Holds translation
  language: '@language',  // Language (2 or 3 letter IANA subtag)
  lookup: 'code',         // Lookup code for translation: some.prefix.my_code
  translations: 'texts',  // Name of multilingual array holding translations (as objects with language and value keys)
  bundle: 'bundle'        // Used by [Text API](http://api.npolar.no/text) to hold multiple instances of the same key, e.g. npdc.app.Title
};
module.exports = translateKeys;
