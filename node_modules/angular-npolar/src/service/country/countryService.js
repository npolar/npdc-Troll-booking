"use strict";

// jshint -W100
const COUNTRIES = {
  "AD": {
    "name": "Andorra",
    "native": "Andorra",
    "languages": "ca"
  },
  "AE": {
    "name": "United Arab Emirates",
    "native": "دولة الإمارات العربية المتحدة",
    "languages": "ar"
  },
  "AF": {
    "name": "Afghanistan",
    "native": "افغانستان",
    "languages": "ps,uz,tk"
  },
  "AG": {
    "name": "Antigua and Barbuda",
    "native": "Antigua and Barbuda",
    "languages": "en"
  },
  "AI": {
    "name": "Anguilla",
    "native": "Anguilla",
    "languages": "en"
  },
  "AL": {
    "name": "Albania",
    "native": "Shqipëria",
    "languages": "sq"
  },
  "AM": {
    "name": "Armenia",
    "native": "Հայաստան",
    "languages": "hy,ru"
  },
  "AO": {
    "name": "Angola",
    "native": "Angola",
    "languages": "pt"
  },
  "AQ": {
    "name": "Antarctica",
    "native": "",
    "languages": ""
  },
  "AR": {
    "name": "Argentina",
    "native": "Argentina",
    "languages": "es,gn"
  },
  "AS": {
    "name": "American Samoa",
    "native": "American Samoa",
    "languages": "en,sm"
  },
  "AT": {
    "name": "Austria",
    "native": "Österreich",
    "languages": "de"
  },
  "AU": {
    "name": "Australia",
    "native": "Australia",
    "languages": "en"
  },
  "AW": {
    "name": "Aruba",
    "native": "Aruba",
    "languages": "nl,pa"
  },
  "AX": {
    "name": "Åland",
    "native": "Åland",
    "languages": "sv"
  },
  "AZ": {
    "name": "Azerbaijan",
    "native": "Azərbaycan",
    "languages": "az,hy"
  },
  "BA": {
    "name": "Bosnia and Herzegovina",
    "native": "Bosna i Hercegovina",
    "languages": "bs,hr,sr"
  },
  "BB": {
    "name": "Barbados",
    "native": "Barbados",
    "languages": "en"
  },
  "BD": {
    "name": "Bangladesh",
    "native": "Bangladesh",
    "languages": "bn"
  },
  "BE": {
    "name": "Belgium",
    "native": "België",
    "languages": "nl,fr,de"
  },
  "BF": {
    "name": "Burkina Faso",
    "native": "Burkina Faso",
    "languages": "fr,ff"
  },
  "BG": {
    "name": "Bulgaria",
    "native": "България",
    "languages": "bg"
  },
  "BH": {
    "name": "Bahrain",
    "native": "‏البحرين",
    "languages": "ar"
  },
  "BI": {
    "name": "Burundi",
    "native": "Burundi",
    "languages": "fr,rn"
  },
  "BJ": {
    "name": "Benin",
    "native": "Bénin",
    "languages": "fr"
  },
  "BL": {
    "name": "Saint Barthélemy",
    "native": "Saint-Barthélemy",
    "languages": "fr"
  },
  "BM": {
    "name": "Bermuda",
    "native": "Bermuda",
    "languages": "en"
  },
  "BN": {
    "name": "Brunei",
    "native": "Negara Brunei Darussalam",
    "languages": "ms"
  },
  "BO": {
    "name": "Bolivia",
    "native": "Bolivia",
    "languages": "es,ay,qu"
  },
  "BQ": {
    "name": "Bonaire",
    "native": "Bonaire",
    "languages": "nl"
  },
  "BR": {
    "name": "Brazil",
    "native": "Brasil",
    "languages": "pt"
  },
  "BS": {
    "name": "Bahamas",
    "native": "Bahamas",
    "languages": "en"
  },
  "BT": {
    "name": "Bhutan",
    "native": "ʼbrug-yul",
    "languages": "dz"
  },
  "BV": {
    "name": "Bouvet Island",
    "native": "Bouvetøya",
    "languages": ""
  },
  "BW": {
    "name": "Botswana",
    "native": "Botswana",
    "languages": "en,tn"
  },
  "BY": {
    "name": "Belarus",
    "native": "Белару́сь",
    "languages": "be,ru"
  },
  "BZ": {
    "name": "Belize",
    "native": "Belize",
    "languages": "en,es"
  },
  "CA": {
    "name": "Canada",
    "native": "Canada",
    "languages": "en,fr"
  },
  "CC": {
    "name": "Cocos [Keeling] Islands",
    "native": "Cocos (Keeling) Islands",
    "languages": "en"
  },
  "CD": {
    "name": "Democratic Republic of the Congo",
    "native": "République démocratique du Congo",
    "languages": "fr,ln,kg,sw,lu"
  },
  "CF": {
    "name": "Central African Republic",
    "native": "Ködörösêse tî Bêafrîka",
    "languages": "fr,sg"
  },
  "CG": {
    "name": "Republic of the Congo",
    "native": "République du Congo",
    "languages": "fr,ln"
  },
  "CH": {
    "name": "Switzerland",
    "native": "Schweiz",
    "languages": "de,fr,it"
  },
  "CI": {
    "name": "Ivory Coast",
    "native": "Côte d'Ivoire",
    "languages": "fr"
  },
  "CK": {
    "name": "Cook Islands",
    "native": "Cook Islands",
    "languages": "en"
  },
  "CL": {
    "name": "Chile",
    "native": "Chile",
    "languages": "es"
  },
  "CM": {
    "name": "Cameroon",
    "native": "Cameroon",
    "languages": "en,fr"
  },
  "CN": {
    "name": "China",
    "native": "中国",
    "languages": "zh"
  },
  "CO": {
    "name": "Colombia",
    "native": "Colombia",
    "languages": "es"
  },
  "CR": {
    "name": "Costa Rica",
    "native": "Costa Rica",
    "languages": "es"
  },
  "CU": {
    "name": "Cuba",
    "native": "Cuba",
    "languages": "es"
  },
  "CV": {
    "name": "Cape Verde",
    "native": "Cabo Verde",
    "languages": "pt"
  },
  "CW": {
    "name": "Curacao",
    "native": "Curaçao",
    "languages": "nl,pa,en"
  },
  "CX": {
    "name": "Christmas Island",
    "native": "Christmas Island",
    "languages": "en"
  },
  "CY": {
    "name": "Cyprus",
    "native": "Κύπρος",
    "languages": "el,tr,hy"
  },
  "CZ": {
    "name": "Czech Republic",
    "native": "Česká republika",
    "languages": "cs,sk"
  },
  "DE": {
    "name": "Germany",
    "native": "Deutschland",
    "languages": "de"
  },
  "DJ": {
    "name": "Djibouti",
    "native": "Djibouti",
    "languages": "fr,ar"
  },
  "DK": {
    "name": "Denmark",
    "native": "Danmark",
    "languages": "da"
  },
  "DM": {
    "name": "Dominica",
    "native": "Dominica",
    "languages": "en"
  },
  "DO": {
    "name": "Dominican Republic",
    "native": "República Dominicana",
    "languages": "es"
  },
  "DZ": {
    "name": "Algeria",
    "native": "الجزائر",
    "languages": "ar"
  },
  "EC": {
    "name": "Ecuador",
    "native": "Ecuador",
    "languages": "es"
  },
  "EE": {
    "name": "Estonia",
    "native": "Eesti",
    "languages": "et"
  },
  "EG": {
    "name": "Egypt",
    "native": "مصر‎",
    "languages": "ar"
  },
  "EH": {
    "name": "Western Sahara",
    "native": "الصحراء الغربية",
    "languages": "es"
  },
  "ER": {
    "name": "Eritrea",
    "native": "ኤርትራ",
    "languages": "ti,ar,en"
  },
  "ES": {
    "name": "Spain",
    "native": "España",
    "languages": "es,eu,ca,gl,oc"
  },
  "ET": {
    "name": "Ethiopia",
    "native": "ኢትዮጵያ",
    "languages": "am"
  },
  "FI": {
    "name": "Finland",
    "native": "Suomi",
    "languages": "fi,sv"
  },
  "FJ": {
    "name": "Fiji",
    "native": "Fiji",
    "languages": "en,fj,hi,ur"
  },
  "FK": {
    "name": "Falkland Islands",
    "native": "Falkland Islands",
    "languages": "en"
  },
  "FM": {
    "name": "Micronesia",
    "native": "Micronesia",
    "languages": "en"
  },
  "FO": {
    "name": "Faroe Islands",
    "native": "Føroyar",
    "languages": "fo"
  },
  "FR": {
    "name": "France",
    "native": "France",
    "languages": "fr"
  },
  "GA": {
    "name": "Gabon",
    "native": "Gabon",
    "languages": "fr"
  },
  "GB": {
    "name": "United Kingdom",
    "native": "United Kingdom",
    "languages": "en"
  },
  "GD": {
    "name": "Grenada",
    "native": "Grenada",
    "languages": "en"
  },
  "GE": {
    "name": "Georgia",
    "native": "საქართველო",
    "languages": "ka"
  },
  "GF": {
    "name": "French Guiana",
    "native": "Guyane française",
    "languages": "fr"
  },
  "GG": {
    "name": "Guernsey",
    "native": "Guernsey",
    "languages": "en,fr"
  },
  "GH": {
    "name": "Ghana",
    "native": "Ghana",
    "languages": "en"
  },
  "GI": {
    "name": "Gibraltar",
    "native": "Gibraltar",
    "languages": "en"
  },
  "GL": {
    "name": "Greenland",
    "native": "Kalaallit Nunaat",
    "languages": "kl"
  },
  "GM": {
    "name": "Gambia",
    "native": "Gambia",
    "languages": "en"
  },
  "GN": {
    "name": "Guinea",
    "native": "Guinée",
    "languages": "fr,ff"
  },
  "GP": {
    "name": "Guadeloupe",
    "native": "Guadeloupe",
    "languages": "fr"
  },
  "GQ": {
    "name": "Equatorial Guinea",
    "native": "Guinea Ecuatorial",
    "languages": "es,fr"
  },
  "GR": {
    "name": "Greece",
    "native": "Ελλάδα",
    "languages": "el"
  },
  "GS": {
    "name": "South Georgia and the South Sandwich Islands",
    "native": "South Georgia",
    "languages": "en"
  },
  "GT": {
    "name": "Guatemala",
    "native": "Guatemala",
    "languages": "es"
  },
  "GU": {
    "name": "Guam",
    "native": "Guam",
    "languages": "en,ch,es"
  },
  "GW": {
    "name": "Guinea-Bissau",
    "native": "Guiné-Bissau",
    "languages": "pt"
  },
  "GY": {
    "name": "Guyana",
    "native": "Guyana",
    "languages": "en"
  },
  "HK": {
    "name": "Hong Kong",
    "native": "香港",
    "languages": "zh,en"
  },
  "HM": {
    "name": "Heard Island and McDonald Islands",
    "native": "Heard Island and McDonald Islands",
    "languages": "en"
  },
  "HN": {
    "name": "Honduras",
    "native": "Honduras",
    "languages": "es"
  },
  "HR": {
    "name": "Croatia",
    "native": "Hrvatska",
    "languages": "hr"
  },
  "HT": {
    "name": "Haiti",
    "native": "Haïti",
    "languages": "fr,ht"
  },
  "HU": {
    "name": "Hungary",
    "native": "Magyarország",
    "languages": "hu"
  },
  "ID": {
    "name": "Indonesia",
    "native": "Indonesia",
    "languages": "id"
  },
  "IE": {
    "name": "Ireland",
    "native": "Éire",
    "languages": "ga,en"
  },
  "IL": {
    "name": "Israel",
    "native": "יִשְׂרָאֵל",
    "languages": "he,ar"
  },
  "IM": {
    "name": "Isle of Man",
    "native": "Isle of Man",
    "languages": "en,gv"
  },
  "IN": {
    "name": "India",
    "native": "भारत",
    "languages": "hi,en"
  },
  "IO": {
    "name": "British Indian Ocean Territory",
    "native": "British Indian Ocean Territory",
    "languages": "en"
  },
  "IQ": {
    "name": "Iraq",
    "native": "العراق",
    "languages": "ar,ku"
  },
  "IR": {
    "name": "Iran",
    "native": "Irān",
    "languages": "fa"
  },
  "IS": {
    "name": "Iceland",
    "native": "Ísland",
    "languages": "is"
  },
  "IT": {
    "name": "Italy",
    "native": "Italia",
    "languages": "it"
  },
  "JE": {
    "name": "Jersey",
    "native": "Jersey",
    "languages": "en,fr"
  },
  "JM": {
    "name": "Jamaica",
    "native": "Jamaica",
    "languages": "en"
  },
  "JO": {
    "name": "Jordan",
    "native": "الأردن",
    "languages": "ar"
  },
  "JP": {
    "name": "Japan",
    "native": "日本",
    "languages": "ja"
  },
  "KE": {
    "name": "Kenya",
    "native": "Kenya",
    "languages": "en,sw"
  },
  "KG": {
    "name": "Kyrgyzstan",
    "native": "Кыргызстан",
    "languages": "ky,ru"
  },
  "KH": {
    "name": "Cambodia",
    "native": "Kâmpŭchéa",
    "languages": "km"
  },
  "KI": {
    "name": "Kiribati",
    "native": "Kiribati",
    "languages": "en"
  },
  "KM": {
    "name": "Comoros",
    "native": "Komori",
    "languages": "ar,fr"
  },
  "KN": {
    "name": "Saint Kitts and Nevis",
    "native": "Saint Kitts and Nevis",
    "languages": "en"
  },
  "KP": {
    "name": "North Korea",
    "native": "북한",
    "languages": "ko"
  },
  "KR": {
    "name": "South Korea",
    "native": "대한민국",
    "languages": "ko"
  },
  "KW": {
    "name": "Kuwait",
    "native": "الكويت",
    "languages": "ar"
  },
  "KY": {
    "name": "Cayman Islands",
    "native": "Cayman Islands",
    "languages": "en"
  },
  "KZ": {
    "name": "Kazakhstan",
    "native": "Қазақстан",
    "languages": "kk,ru"
  },
  "LA": {
    "name": "Laos",
    "native": "ສປປລາວ",
    "languages": "lo"
  },
  "LB": {
    "name": "Lebanon",
    "native": "لبنان",
    "languages": "ar,fr"
  },
  "LC": {
    "name": "Saint Lucia",
    "native": "Saint Lucia",
    "languages": "en"
  },
  "LI": {
    "name": "Liechtenstein",
    "native": "Liechtenstein",
    "languages": "de"
  },
  "LK": {
    "name": "Sri Lanka",
    "native": "śrī laṃkāva",
    "languages": "si,ta"
  },
  "LR": {
    "name": "Liberia",
    "native": "Liberia",
    "languages": "en"
  },
  "LS": {
    "name": "Lesotho",
    "native": "Lesotho",
    "languages": "en,st"
  },
  "LT": {
    "name": "Lithuania",
    "native": "Lietuva",
    "languages": "lt"
  },
  "LU": {
    "name": "Luxembourg",
    "native": "Luxembourg",
    "languages": "fr,de,lb"
  },
  "LV": {
    "name": "Latvia",
    "native": "Latvija",
    "languages": "lv"
  },
  "LY": {
    "name": "Libya",
    "native": "‏ليبيا",
    "languages": "ar"
  },
  "MA": {
    "name": "Morocco",
    "native": "المغرب",
    "languages": "ar"
  },
  "MC": {
    "name": "Monaco",
    "native": "Monaco",
    "languages": "fr"
  },
  "MD": {
    "name": "Moldova",
    "native": "Moldova",
    "languages": "ro"
  },
  "ME": {
    "name": "Montenegro",
    "native": "Црна Гора",
    "languages": "sr,bs,sq,hr"
  },
  "MF": {
    "name": "Saint Martin",
    "native": "Saint-Martin",
    "languages": "en,fr,nl"
  },
  "MG": {
    "name": "Madagascar",
    "native": "Madagasikara",
    "languages": "fr,mg"
  },
  "MH": {
    "name": "Marshall Islands",
    "native": "M̧ajeļ",
    "languages": "en,mh"
  },
  "MK": {
    "name": "Macedonia",
    "native": "Македонија",
    "languages": "mk"
  },
  "ML": {
    "name": "Mali",
    "native": "Mali",
    "languages": "fr"
  },
  "MM": {
    "name": "Myanmar [Burma]",
    "native": "Myanma",
    "languages": "my"
  },
  "MN": {
    "name": "Mongolia",
    "native": "Монгол улс",
    "languages": "mn"
  },
  "MO": {
    "name": "Macao",
    "native": "澳門",
    "languages": "zh,pt"
  },
  "MP": {
    "name": "Northern Mariana Islands",
    "native": "Northern Mariana Islands",
    "languages": "en,ch"
  },
  "MQ": {
    "name": "Martinique",
    "native": "Martinique",
    "languages": "fr"
  },
  "MR": {
    "name": "Mauritania",
    "native": "موريتانيا",
    "languages": "ar"
  },
  "MS": {
    "name": "Montserrat",
    "native": "Montserrat",
    "languages": "en"
  },
  "MT": {
    "name": "Malta",
    "native": "Malta",
    "languages": "mt,en"
  },
  "MU": {
    "name": "Mauritius",
    "native": "Maurice",
    "languages": "en"
  },
  "MV": {
    "name": "Maldives",
    "native": "Maldives",
    "languages": "dv"
  },
  "MW": {
    "name": "Malawi",
    "native": "Malawi",
    "languages": "en,ny"
  },
  "MX": {
    "name": "Mexico",
    "native": "México",
    "languages": "es"
  },
  "MY": {
    "name": "Malaysia",
    "native": "Malaysia",
    "languages": ""
  },
  "MZ": {
    "name": "Mozambique",
    "native": "Moçambique",
    "languages": "pt"
  },
  "NA": {
    "name": "Namibia",
    "native": "Namibia",
    "languages": "en,af"
  },
  "NC": {
    "name": "New Caledonia",
    "native": "Nouvelle-Calédonie",
    "languages": "fr"
  },
  "NE": {
    "name": "Niger",
    "native": "Niger",
    "languages": "fr"
  },
  "NF": {
    "name": "Norfolk Island",
    "native": "Norfolk Island",
    "languages": "en"
  },
  "NG": {
    "name": "Nigeria",
    "native": "Nigeria",
    "languages": "en"
  },
  "NI": {
    "name": "Nicaragua",
    "native": "Nicaragua",
    "languages": "es"
  },
  "NL": {
    "name": "Netherlands",
    "native": "Nederland",
    "languages": "nl"
  },
  "NO": {
    "name": "Norway",
    "native": "Norge",
    "languages": "no,nb,nn"
  },
  "NP": {
    "name": "Nepal",
    "native": "नपल",
    "languages": "ne"
  },
  "NR": {
    "name": "Nauru",
    "native": "Nauru",
    "languages": "en,na"
  },
  "NU": {
    "name": "Niue",
    "native": "Niuē",
    "languages": "en"
  },
  "NZ": {
    "name": "New Zealand",
    "native": "New Zealand",
    "languages": "en,mi"
  },
  "OM": {
    "name": "Oman",
    "native": "عمان",
    "languages": "ar"
  },
  "PA": {
    "name": "Panama",
    "native": "Panamá",
    "languages": "es"
  },
  "PE": {
    "name": "Peru",
    "native": "Perú",
    "languages": "es"
  },
  "PF": {
    "name": "French Polynesia",
    "native": "Polynésie française",
    "languages": "fr"
  },
  "PG": {
    "name": "Papua New Guinea",
    "native": "Papua Niugini",
    "languages": "en"
  },
  "PH": {
    "name": "Philippines",
    "native": "Pilipinas",
    "languages": "en"
  },
  "PK": {
    "name": "Pakistan",
    "native": "Pakistan",
    "languages": "en,ur"
  },
  "PL": {
    "name": "Poland",
    "native": "Polska",
    "languages": "pl"
  },
  "PM": {
    "name": "Saint Pierre and Miquelon",
    "native": "Saint-Pierre-et-Miquelon",
    "languages": "fr"
  },
  "PN": {
    "name": "Pitcairn Islands",
    "native": "Pitcairn Islands",
    "languages": "en"
  },
  "PR": {
    "name": "Puerto Rico",
    "native": "Puerto Rico",
    "languages": "es,en"
  },
  "PS": {
    "name": "Palestine",
    "native": "فلسطين",
    "languages": "ar"
  },
  "PT": {
    "name": "Portugal",
    "native": "Portugal",
    "languages": "pt"
  },
  "PW": {
    "name": "Palau",
    "native": "Palau",
    "languages": "en"
  },
  "PY": {
    "name": "Paraguay",
    "native": "Paraguay",
    "languages": "es,gn"
  },
  "QA": {
    "name": "Qatar",
    "native": "قطر",
    "languages": "ar"
  },
  "RE": {
    "name": "Réunion",
    "native": "La Réunion",
    "languages": "fr"
  },
  "RO": {
    "name": "Romania",
    "native": "România",
    "languages": "ro"
  },
  "RS": {
    "name": "Serbia",
    "native": "Србија",
    "languages": "sr"
  },
  "RU": {
    "name": "Russia",
    "native": "Россия",
    "languages": "ru"
  },
  "RW": {
    "name": "Rwanda",
    "native": "Rwanda",
    "languages": "rw,en,fr"
  },
  "SA": {
    "name": "Saudi Arabia",
    "native": "العربية السعودية",
    "languages": "ar"
  },
  "SB": {
    "name": "Solomon Islands",
    "native": "Solomon Islands",
    "languages": "en"
  },
  "SC": {
    "name": "Seychelles",
    "native": "Seychelles",
    "languages": "fr,en"
  },
  "SD": {
    "name": "Sudan",
    "native": "السودان",
    "languages": "ar,en"
  },
  "SE": {
    "name": "Sweden",
    "native": "Sverige",
    "languages": "sv"
  },
  "SG": {
    "name": "Singapore",
    "native": "Singapore",
    "languages": "en,ms,ta,zh"
  },
  "SH": {
    "name": "Saint Helena",
    "native": "Saint Helena",
    "languages": "en"
  },
  "SI": {
    "name": "Slovenia",
    "native": "Slovenija",
    "languages": "sl"
  },
  "SJ": {
    "name": "Svalbard and Jan Mayen",
    "native": "Svalbard og Jan Mayen",
    "languages": "no"
  },
  "SK": {
    "name": "Slovakia",
    "native": "Slovensko",
    "languages": "sk"
  },
  "SL": {
    "name": "Sierra Leone",
    "native": "Sierra Leone",
    "languages": "en"
  },
  "SM": {
    "name": "San Marino",
    "native": "San Marino",
    "languages": "it"
  },
  "SN": {
    "name": "Senegal",
    "native": "Sénégal",
    "languages": "fr"
  },
  "SO": {
    "name": "Somalia",
    "native": "Soomaaliya",
    "languages": "so,ar"
  },
  "SR": {
    "name": "Suriname",
    "native": "Suriname",
    "languages": "nl"
  },
  "SS": {
    "name": "South Sudan",
    "native": "South Sudan",
    "languages": "en"
  },
  "ST": {
    "name": "São Tomé and Príncipe",
    "native": "São Tomé e Príncipe",
    "languages": "pt"
  },
  "SV": {
    "name": "El Salvador",
    "native": "El Salvador",
    "languages": "es"
  },
  "SX": {
    "name": "Sint Maarten",
    "native": "Sint Maarten",
    "languages": "nl,en"
  },
  "SY": {
    "name": "Syria",
    "native": "سوريا",
    "languages": "ar"
  },
  "SZ": {
    "name": "Swaziland",
    "native": "Swaziland",
    "languages": "en,ss"
  },
  "TC": {
    "name": "Turks and Caicos Islands",
    "native": "Turks and Caicos Islands",
    "languages": "en"
  },
  "TD": {
    "name": "Chad",
    "native": "Tchad",
    "languages": "fr,ar"
  },
  "TF": {
    "name": "French Southern Territories",
    "native": "Territoire des Terres australes et antarctiques fr",
    "languages": "fr"
  },
  "TG": {
    "name": "Togo",
    "native": "Togo",
    "languages": "fr"
  },
  "TH": {
    "name": "Thailand",
    "native": "ประเทศไทย",
    "languages": "th"
  },
  "TJ": {
    "name": "Tajikistan",
    "native": "Тоҷикистон",
    "languages": "tg,ru"
  },
  "TK": {
    "name": "Tokelau",
    "native": "Tokelau",
    "languages": "en"
  },
  "TL": {
    "name": "East Timor",
    "native": "Timor-Leste",
    "languages": "pt"
  },
  "TM": {
    "name": "Turkmenistan",
    "native": "Türkmenistan",
    "languages": "tk,ru"
  },
  "TN": {
    "name": "Tunisia",
    "native": "تونس",
    "languages": "ar"
  },
  "TO": {
    "name": "Tonga",
    "native": "Tonga",
    "languages": "en,to"
  },
  "TR": {
    "name": "Turkey",
    "native": "Türkiye",
    "languages": "tr"
  },
  "TT": {
    "name": "Trinidad and Tobago",
    "native": "Trinidad and Tobago",
    "languages": "en"
  },
  "TV": {
    "name": "Tuvalu",
    "native": "Tuvalu",
    "languages": "en"
  },
  "TW": {
    "name": "Taiwan",
    "native": "臺灣",
    "languages": "zh"
  },
  "TZ": {
    "name": "Tanzania",
    "native": "Tanzania",
    "languages": "sw,en"
  },
  "UA": {
    "name": "Ukraine",
    "native": "Україна",
    "languages": "uk"
  },
  "UG": {
    "name": "Uganda",
    "native": "Uganda",
    "languages": "en,sw"
  },
  "UM": {
    "name": "U.S. Minor Outlying Islands",
    "native": "United States Minor Outlying Islands",
    "languages": "en"
  },
  "US": {
    "name": "United States",
    "native": "United States",
    "languages": "en"
  },
  "UY": {
    "name": "Uruguay",
    "native": "Uruguay",
    "languages": "es"
  },
  "UZ": {
    "name": "Uzbekistan",
    "native": "O‘zbekiston",
    "languages": "uz,ru"
  },
  "VA": {
    "name": "Vatican City",
    "native": "Vaticano",
    "languages": "it,la"
  },
  "VC": {
    "name": "Saint Vincent and the Grenadines",
    "native": "Saint Vincent and the Grenadines",
    "languages": "en"
  },
  "VE": {
    "name": "Venezuela",
    "native": "Venezuela",
    "languages": "es"
  },
  "VG": {
    "name": "British Virgin Islands",
    "native": "British Virgin Islands",
    "languages": "en"
  },
  "VI": {
    "name": "U.S. Virgin Islands",
    "native": "United States Virgin Islands",
    "languages": "en"
  },
  "VN": {
    "name": "Vietnam",
    "native": "Việt Nam",
    "languages": "vi"
  },
  "VU": {
    "name": "Vanuatu",
    "native": "Vanuatu",
    "languages": "bi,en,fr"
  },
  "WF": {
    "name": "Wallis and Futuna",
    "native": "Wallis et Futuna",
    "languages": "fr"
  },
  "WS": {
    "name": "Samoa",
    "native": "Samoa",
    "languages": "sm,en"
  },
  "XK": {
    "name": "Kosovo",
    "native": "Republika e Kosovës",
    "languages": "sq,sr"
  },
  "YE": {
    "name": "Yemen",
    "native": "اليَمَن",
    "languages": "ar"
  },
  "YT": {
    "name": "Mayotte",
    "native": "Mayotte",
    "languages": "fr"
  },
  "ZA": {
    "name": "South Africa",
    "native": "South Africa",
    "languages": "af,en,nr,st,ss,tn,ts,ve,xh,zu"
  },
  "ZM": {
    "name": "Zambia",
    "native": "Zambia",
    "languages": "en"
  },
  "ZW": {
    "name": "Zimbabwe",
    "native": "Zimbabwe",
    "languages": "en,sn,nd"
  }
};


module.exports = function() {
  'ngInject';

  return {
    countriesByQuery(query) {
      query = query || '';
      let codes = Object.keys(COUNTRIES).filter(code =>
        (COUNTRIES[code].name + ',' + COUNTRIES[code].native).toLowerCase().indexOf(query.toLowerCase()) !== -1);
      return codes.map(code => this.countryByCode(code));
    },
    countryByCode(code) {
      let country;
      if (code) {
        country = COUNTRIES[code.toUpperCase()];
        if (country) {
          country.code = code;
        }
      }
      return country;
    },
    countryByNativeName(name) {
      let code = Object.keys(COUNTRIES).find(code => COUNTRIES[code].native.toLowerCase() === name.toLowerCase());
      return this.countryByCode(code);
    },
    countryByName(name) {
      let code = Object.keys(COUNTRIES).find(code => COUNTRIES[code].name.toLowerCase() === name.toLowerCase());
      return this.countryByCode(code);
    }
  };
};
