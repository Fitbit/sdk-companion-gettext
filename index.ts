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

function mapToDeviceSupportedLocale(tag: string) {
  if (tag === 'en-SE') return 'sv-SE';
  if (tag === 'en-NL') return 'nl-NL';
  if (tag === 'en-NO') return 'nb-NO';
  if (tag === 'en-IN') return 'hi-IN';

  // For iOS
  if (tag === 'zh-Hant') return 'zh-TW';
  if (tag === 'zh-Hans') return 'zh-CN';

  const lang = getLangCode(tag);

  if (lang === 'en') return 'en-US';
  if (lang === 'de') return 'de-DE';
  if (lang === 'es') return 'es-ES';
  if (lang === 'fr') return 'fr-FR';
  if (lang === 'it') return 'it-IT';
  if (lang === 'ru') return 'ru-RU';
  if (lang === 'pt') return 'pt-BR';

  return tag;
}

export default function gettextFactory(
  langTable: LanguageTable,
  currentLocale = defaultLocale,
  fallbackLocale = defaultLocale,
) {
  const lookupLocale = mapToDeviceSupportedLocale(currentLocale);
  const msgTable = langTable[lookupLocale] || langTable[fallbackLocale] || {};

  // Return a named function so it shows up in stack traces.
  return function gettext(msgid: unknown): string {
    const msgidString = String(msgid);
    return msgTable[msgidString] || msgidString;
  };
}
