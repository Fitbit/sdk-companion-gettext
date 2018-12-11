import gettextFactory from './index';

const multipleLanguages = {
  'fr-FR': {
    msg1: 'This is a France French message',
  },
  es: {
    msg1: 'This is a Spanish message'
  }
};

const defaultLanguage = {
  'en-US': {
    msg1: 'This is an American English message',
  },
};

describe('gettext', () => {
  it('returns the message for the specified locale if it exists', () => {
    expect(gettextFactory(multipleLanguages, 'fr-FR')('msg1')).toBe('This is a France French message');
  });

  it('looks up the base language if the message cannot be found for the specific region', () => {
    expect(gettextFactory(multipleLanguages, 'es-ES')('msg1')).toBe('This is a Spanish message');
  });

  it('looks up the message in the fallback language if it cannot be found for the given language', () => {
    expect(gettextFactory(defaultLanguage, 'fr-FR', 'en-US')('msg1'))
      .toBe('This is an American English message');
  });

  it('returns msgid if the language table is empty', () => {
    expect(gettextFactory({}, 'en-US')('msg1')).toBe('msg1');
  });

  it('returns msgid if the msgid does not exist in the specified or default language', () => {
    expect(gettextFactory(multipleLanguages, 'de-DE')('msg1')).toBe('msg1');
  });

  it('uses stringified msgid for lookups', () => {
    expect(gettextFactory({ en: { '[object Object]': 'foo' } }, 'en-US')({})).toBe('foo');
  });

  it('returns stringified msgid as the fallback', () => {
    expect(gettextFactory({}, 'en-US')({})).toBe('[object Object]');
  });

  it('defaults to looking up strings in en-US', () => {
    expect(gettextFactory(defaultLanguage)('msg1')).toBe('This is an American English message');
  });
});
