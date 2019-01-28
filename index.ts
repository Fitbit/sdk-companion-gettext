export interface MessageTable {
  [message: string]: string;
}

export interface LanguageTable {
  [tag: string]: MessageTable;
}

const defaultLocale = 'en-US';

function getLangCode(tag: string) {
  return tag.substring(0, 2);
}

/**
 * FbOS 3.0 and backwards only supports the following locales:
  - de-DE
  - en-US
  - es-ES
  - fr-FR
  - it-IT
  - ja-JP
  - ko-KR
  - nl-NL
  - sv-SE
  - zh-CN
  - zh-TW

  In order to provide predictable behaviour across FW and mobile, we map
  site provided locales settings onto this subset of locales.
 * */

const FBOS3_SUPPORTED_LOCALES = [
  'de-DE',
  'en-US',
  'es-ES',
  'fr-FR',
  'it-IT',
  'ja-JP',
  'ko-KR',
  'nl-NL',
  'sv-SE',
  'zh-CN',
  'zh-TW',
];

function mapToDeviceSupportedLocale(tag: string) {
  if (FBOS3_SUPPORTED_LOCALES.indexOf(tag) !== -1) {
    return tag;
  }

  if (tag === 'en-SE') return 'sv-SE';
  if (tag === 'en-NL') return 'nl-NL';

  // For iOS
  if (tag === 'zh-Hant') return 'zh-TW';
  if (tag === 'zh-Hans') return 'zh-CN';

  const lang = getLangCode(tag);

  if (lang === 'en') return 'en-US';
  if (lang === 'de') return 'de-DE';
  if (lang === 'es') return 'es-ES';
  if (lang === 'fr') return 'fr-FR';
  if (lang === 'it') return 'it-IT';

  return tag;
}

export default function gettextFactory(
  langTable: LanguageTable,
  currentLocale = defaultLocale,
  fallbackLocale = defaultLocale,
) {
  const lookupLocale = mapToDeviceSupportedLocale(currentLocale);
  const msgTable = langTable[lookupLocale] ||
    langTable[fallbackLocale] ||
    {};

  // Return a named function so it shows up in stack traces.
  return function gettext(msgid: unknown): string {
    const msgidString = String(msgid);
    return msgTable[msgidString] || msgidString;
  };
}
