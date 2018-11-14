import gettextFactory from './index';

const frenchMessages = {
  'fr-FR': {
    msg1: 'This is a France French message',
  },
  fr: {
    msg1: 'This is a French message',
    msg2: 'This is a French message 2',
  },
};

const defaultLanguage = {
  'en-US': {
    msg1: 'This is an American English message',
  },
};

const multiLanguage = {
  'fr-FR': {
    msg1: 'This is a France French message',
    localizedMessage: 'This is the localized France French message',
  },
  fr: {
    msg2: 'This is a French message',
    localizedMessage: 'This is the localized French message',
  },
  'en-US': {
    msg3: 'This is an American English message',
    localizedMessage: 'This is the localized American English message',
  },
  en: {
    msg4: 'This is an English message',
    localizedMessage: 'This is the localized English message',
  },
};

describe('gettext', () => {
  it('returns the message for the specified locale if it exists', () => {
    expect(gettextFactory(frenchMessages, 'fr-FR')('msg1')).toBe('This is a France French message');
  });

  it('looks up the base language if the message cannot be found for the specific region', () => {
    expect(gettextFactory(frenchMessages, 'fr-FR')('msg2')).toBe('This is a French message 2');
  });

  it('looks up the message in "en-US" if it cannot be found for the given language', () => {
    expect(gettextFactory(defaultLanguage, 'fr-FR')('msg1'))
      .toBe('This is an American English message');
  });

  it('looks up the message in "en" if it cannot be found otherwise', () => {
    expect(gettextFactory(multiLanguage, 'fr-FR')('msg4')).toBe('This is an English message');
  });

  it('returns msgid if the language table is empty', () => {
    expect(gettextFactory({}, 'en-US')('msg1')).toBe('msg1');
  });

  it('returns msgid if the msgid does not exist in any locale', () => {
    expect(gettextFactory(defaultLanguage, 'fr-FR')('badMessage')).toBe('badMessage');
  });

  it('returns msgid if the msgid does not exist in the specified or default language', () => {
    expect(gettextFactory(frenchMessages, 'de-DE')('msg1')).toBe('msg1');
  });

  it('uses stringified msgid for lookups', () => {
    expect(gettextFactory({ en: { '[object Object]': 'foo' } }, 'en-US')({})).toBe('foo');
  });

  it('returns stringified msgid as the fallback', () => {
    expect(gettextFactory({}, 'en-US')({})).toBe('[object Object]');
  });
});
