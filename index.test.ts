import gettextFactory from './index';

const multipleLanguages = {
  'en-US': {
    msg1: 'This is a American English message',
  },
  'fr-FR': {
    msg1: 'This is a France French message',
  },
  'es-ES': {
    msg1: 'This is a Spanish message',
  },
  'sv-SE': {
    msg1: 'This is a Swedish message',
  },
  'nl-NL': {
    msg1: 'This is a Dutch message',
  },
  'de-DE': {
    msg1: 'This is a German message',
  },
  'it-IT': {
    msg1: 'This is a Italian message',
  },
  'zh-CN': {
    msg1: 'This is a Simplified Chinese message',
  },
  'zh-TW': {
    msg1: 'This is a Traditional Chinese message',
  },
  'pt-BR': {
    msg1: 'This is a Portugese (Brazillian) message',
  },
  'id-ID': {
    msg1: 'This is a Indonesian (Bahasa) message',
  },
  'ro-RO': {
    msg1: 'This is a Romanian message',
  },
  'ru-RU': {
    msg1: 'This is a Russian message',
  },
  'pl-PL': {
    msg1: 'This is a Polish message',
  },
  'cs-CZ': {
    msg1: 'This is a Czech message',
  },
  'nb-NO': {
    msg1: 'This is a Norwegian (Bokmål) message',
  },
  'hi-IN': {
    msg1: 'This is a Indian (Hindi) message',
  },
  'da-DK': {
    msg1: 'This is a Danish message',
  },
};

const defaultLanguage = {
  'en-US': {
    msg1: 'This is a American English message',
  },
};

describe('gettext', () => {
  it('returns the message for the specified locale if it exists', () =>
    expect(gettextFactory(multipleLanguages, 'fr-FR')('msg1')).toBe(
      'This is a France French message',
    ));

  it('returns a message for a matching language even if the locale differs', () =>
    expect(gettextFactory(multipleLanguages, 'fr-CA')('msg1')).toBe(
      'This is a France French message',
    ));

  it('looks up the message in the fallback language if it cannot be found for the given language', () =>
    expect(gettextFactory(defaultLanguage, 'fr-FR', 'en-US')('msg1')).toBe(
      'This is a American English message',
    ));

  it('returns msgid if the language table is empty', () => {
    expect(gettextFactory({}, 'en-US')('msg1')).toBe('msg1');
  });

  it('returns msgid if the msgid does not exist in the specified or default language', () => {
    expect(gettextFactory(multipleLanguages, 'is-DA', 'is-DA')('msg1')).toBe(
      'msg1',
    );
  });

  it('uses stringified msgid for lookups', () => {
    expect(gettextFactory({ 'en-US': { '[object Object]': 'foo' } })({})).toBe(
      'foo',
    );
  });

  it('returns stringified msgid as the fallback', () => {
    expect(gettextFactory({}, 'en-US')({})).toBe('[object Object]');
  });

  it('defaults to looking up strings in en-US', () => {
    expect(gettextFactory(defaultLanguage)('msg1')).toBe(
      'This is a American English message',
    );
  });

  it.each([
    ['en-SE', 'sv-SE', 'Swedish'],
    ['en-NL', 'nl-NL', 'Dutch'],
    ['zh-Hant', 'zh-TW', 'Traditional Chinese'],
    ['zh-Hans', 'zh-CN', 'Simplified Chinese'],
    ['en-GB', 'en-US', 'American English'],
    ['fr-CA', 'fr-FR', 'France French'],
    ['es-PY', 'es-ES', 'Spanish'],
    ['de-GSW', 'de-DE', 'German'],
    ['it-SC', 'it-IT', 'Italian'],
    ['pt-PT', 'pt-BR', 'Portugese (Brazillian)'],
    ['pt-BR', 'pt-BR', 'Portugese (Brazillian)'],
    ['id-ID', 'id-ID', 'Indonesian (Bahasa)'],
    ['ro-RO', 'ro-RO', 'Romanian'],
    ['ru-BY', 'ru-RU', 'Russian'],
    ['ru-RU', 'ru-RU', 'Russian'],
    ['pl-PL', 'pl-PL', 'Polish'],
    ['cs-CZ', 'cs-CZ', 'Czech'],
    ['en-NO', 'nb-NO', 'Norwegian (Bokmål)'],
    ['en-IN', 'hi-IN', 'Indian (Hindi)'],
    ['da-DK', 'da-DK', 'Danish'],
  ])('maps %s to %s', (from, to, expectedMessage) =>
    expect(gettextFactory(multipleLanguages, from)('msg1')).toBe(
      `This is a ${expectedMessage} message`,
    ),
  );
});
