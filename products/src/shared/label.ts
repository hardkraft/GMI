import * as dict from './translations.json';

const label = (word: string, loc: string = 'en') => {
  let translated = word;
  try {
    const _dict: Record<string, string> = dict[loc] ?? {};
    translated = _dict[word] ?? word;
  } catch (e) {
    console.error(e);
  }
  return translated;
};

export default label;
