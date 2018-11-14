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

export default function gettextFactory(langTable: LanguageTable, currentLocale = defaultLocale) {
  function getMessages(locale: string): MessageTable {
    return langTable[locale] || {};
  }

  // Return a named function so it shows up in stack traces.
  return function gettext(msgid: unknown): string {
    const msgidString = String(msgid);

    return (
      getMessages(currentLocale)[msgidString] ||
      getMessages(getLangCode(currentLocale))[msgidString] ||
      getMessages(defaultLocale)[msgidString] ||
      getMessages(getLangCode(defaultLocale))[msgidString] ||
      msgidString
    );
  };
}
