import * as dict from './translations.json';
import { CONFIG } from 'src/server/config';

// Simple localization
const label = (word: string, loc: string = CONFIG.language) => {
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
