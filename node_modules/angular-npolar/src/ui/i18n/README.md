# i18n

Internationalization (i18n) component

## Features
* Provides translations from an injectable code dictionary
* Easy-to use translation filter: {{ 'some.prefix.code' | t }}
* Auto-detection and persistence of application's language
* Always fallback to alternative language if requested language is missing a translation
* Supports any official [IANA language](http://www.iana.org/assignments/language-subtag-registry/language-subtag-registry) (subtag)
* Language switcher directive
* Dictionary may be loaded as array of translation documents (database and JSON schema friendly)
* [JSON-LD](http://www.w3.org/TR/json-ld/) style [multilingual translation objects](http://www.w3.org/TR/json-ld/#string-internationalization)
* Debug mode: reveals translation code inside app (triggered by query parameter debug=1)

## Use

### Translation filter
Pass code to translate to the `t` filter 
```
  {{ 'npdc.app.Title' | t }}
```

### Language switcher directive
```xml
   <npolar:language-switcher></npolar:language-switcher>
```
Limit available languages

```javascript
myAngularApp.run(NpolarLang => {
  
  // Fixed list of languages in the switcher
  NpolarLang.setLanguages(['en', 'nb', 'nn']);
  
  // Advanced alternatives
  
  // Require minimum 50% of texts translated, but provide some fixed languages no matter
  // NpolarLang.setLanguagesFromDictionaryUse({ min: 0.50, force: ['en', 'nb', 'nn'], dictionary });
  
  // Allow all languages in the dictionary
  // NpolarLang.setLanguagesFromDictionaryUse(dictionary);
  
  NpolarTranslate.appendToDictionary(response.data);
  NpolarLang.setLanguagesFromDictionaryUse({ min: 0.50, force: ['en', 'nb', 'nn'], dictionary });
  
});
```

Language counts

```javascript
console.debug(NpolarLang.getLanguageCounts(dictionary));
Object {no: 4, en: 47, nb: 7, nn: 3, ru: 1}

```


## Loading dictionary

### From Text API

```javascript
myAngularApp.run(($http, NpolarTranslate) => {
  $http.get('//api.npolar.no/text/?q=&filter-bundle=npolar|npdc|npdc-myapp&format=json&variant=array&limit=all').then(response => {
    NpolarTranslate.addToDictionary(response.data);
  });
});
```

Text API response format example
```json
[
  {
    "id": "c99fc195-792d-43b7-b67d-f1699a6bc9f5",
    "texts": [
      {
        "@value": "Norsk Polarinstitutt",
        "@language": "nb"
      },
      {
        "@value": "Norwegian Polar Institute",
        "@language": "en"
      }
    ],
    "_rev": "1-22694754c28e725da609b2032507a3c1",
    "bundle": "npolar",
    "code": "organization.npolar.no"
  }
]
```
JSON schema: http://api.npolar.no/schema/text-1

### From value object

Supports JSON-LD style multilingual translation object

```javascript

let ldd = { code: 'http://npolar.no', texts: [
  { "@value": "Norsk Polarinstitutt", "@language": "no" },
  { "@value": "Norwegian Polar Institute", "@language": "en" }
]
}
myAngularApp.value('myLinkedDataDictionary', ldd);

myAngularApp.run((NpolarTranslate, myLinkedDataDictionary) => {
    NpolarTranslate.setDictionary(myLinkedDataDictionary);
  });
});
```

### Default application language

Set html@lang in the app's index.html file
```xml
<html lang="en" ng-app="myApp" ng-cloak ng-strict-di>
```