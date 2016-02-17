# chronopic.js
Date/Time/Datetime JavaScript Widget ([demo](http://npolar.github.io/chronopic.js/demo/)).

## Usage:
Chronopic is added to HTML elements by creating a new instance of *Chronopic* using a CSS selector string as the first parameter, and optionally a map of settings as the second parameter:

```javascript
// Invoke Chronopic with specified settings on input fields of class datepicker
new Chronopic('input.datepicker', {
  locale: 'nb_NO',                        // Use nb_NO as the default locale
  format: '{D}. {MMMM} {YYYY}',           // Use D. MMMM YYYY as output format
  min: { year: 2000, month: 2 },          // Set lower boundary to February 2000
  max: { year: 2020, month: 5, day: 12 }, // Set upper boundary to May 12. 2020
  onChange: function(elem, date) {        // Function called when date is changed
    console.log(elem, date);
  }
});
```
```javascript
// Invoke Chronopic with locale settings if lang attribute is set
new Chronopic('input[type="date"][lang="en"]', { locale: 'en_US' });
new Chronopic('input[type="date"][lang="jp"]', { locale: 'ja_JP' });
new Chronopic('input[type="date"][lang="no"]', { locale: 'nb_NO' });
```
```javascript
// Invoke Chronopic on all datetime input fields using the material css extension
new Chronopic('input[type="datetime"]', {
  className: '.chronopic.chronopic-ext-md',
  format: '{datetime}'
});

```

#### Constructor options:
Key               | Value                                                               | Default
------------------|---------------------------------------------------------------------|--------------
**className**     | Dot-separated CSS class names added to container                    | **.chronopic**
**container**     | HTMLElement used as container when calculating auto popup direction | **null** *(parent element)*
**date**          | Pre-selected date object (or *null*)                                | **null** *(no date selected)*
**direction**     | Specify widget popup direction (**"down"**, **"up"** or **"auto"**) | **"down"**
**format**        | Output format as a string (see format values below)                 | **{date}**
**locale**        | Name of locale or *null* for browser locale                         | **null**
**max**           | Date or object describing the maximum date                          | **{ year: 2100 }**
**min**           | Date or object describing the minimum date                          | **{ year: 1900 }**
**monthYearOnly** | Disable day selection table (only show month and year)              | **false**
**onChange**      | *function(HTMLInputElement, Date)* called on value change           | **null**

#### Format values:
Code            | Replaced with
----------------|--------------
**{date}**      | Locale specific date format (date, month, year)
**{datetime}**  | Locale specific date/time format (date, month, year, time)
**{isodate}**   | ISO 8601 date format (yyyy-mm-dd)
**{yearmonth}** | Locale specific year/month format (month, year)
**{YYYY}**      | Year (four digits)
**{YY}**        | Year (two digits)
**{MMMM}**      | Month (full name)
**{MMM}**       | Month (short name)
**{MM}**        | Month (two digits)
**{M}**         | Month (one or two digits)
**{DDDD}**      | Day of week (full name)
**{DDD}**       | Day of week (short name)
**{DD}**        | Day of month (two digits)
**{D}**         | Day of month (one or two digits)
**{HH}**        | Hour (two digits, 24-hour format)
**{H}**         | Hour (one or two digits, 24-hour format)
**{hh}**        | Hour (two digits, 12-hour format)
**{h}**         | Hour (one or two digits, 12-hour format)
**{mm}**        | Minute (two digits)
**{m}**         | Minute (one or two digits)
**{ss}**        | Second (two digits)
**{s}**         | Second (one or two digits)
**{ap}**        | Day meridian (a.m. or p.m.)
**{ww}**        | Week number (two digits)
**{w}**         | Week number (one or two digits)

#### Locale settings:
By default, only the **en_GB** locale is included, but all available translations can be enabled by including the [chronopic-i18n.min.js](https://github.com/npolar/chronopic.js/tree/master/dist/js/chronopic-i18n.min.js) file. Unless otherwise specified, the browser locale will be used if the translation exists, otherwise **en_GB** is used as a fallback.

To manually enable individual locales, include the corresponding file located in [dist/js/chronopic-i18n/](https://github.com/npolar/chronopic.js/tree/master/dist/js/chronopic-i18n).

## Contribution:
Contributing to the project is encouraged, and any help is appreciated. Even if you are not familiar with JavaScript, you can still contribute to the project by adding translations, or stylesheet extensions for aesthetical improvements. If you experience any bugs or have any suggestions for improvements, feel free to file an [issue](https://github.com/npolar/chronopic.js/issues).

#### Prerequisites:
First, install [git](https://git-scm.com/) and [node](https://nodejs.org)/[npm](https://npmjs.com) so you can download the required source files and dependencies. Afterwards, run the following commands to clone the repository, and automatically install the required developer dependencies:

```sh
git clone https://github.com/npolar/chronopic.js.git
cd chronopic.js && npm install
```

#### Language contributions:
After cloning the project, you can add new translations to the [src/i18n](https://github.com/npolar/chronopic.js/tree/master/src/i18n) directory, using one of the existing files in the same directory as a template. Please keep the same file name format as used by other translations. The JavaScript object containing all translations should be named using the full **language**_**TERRITORY** format (e.g. en_US). Abbreviations, if existent and standardised, can be added to the bottom of the file, such as:

> Chronopic.i18n.**en** = Chronopic.i18n.**en_US**;

For languages representing time in *24-hour* format, just keep the **anteMeridiem** and **postMeridiem** properties as **empty strings**, whilst for languages using *12-hour* format, please add the appropriate values.

After adding translation source files to the **src/i18n** directory, do **not** try to manually generate the distributed versions (i.e. files located in the **dist/** directory). These files are generated automatically by running the following command:

```sh
gulp
```
