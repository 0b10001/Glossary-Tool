function highlightWord(str, word) {
  if (typeof str !== 'string' || typeof word !== 'string') {
    throw new TypeError('Expected two string arguments');
  }

  const regex = new RegExp(word, 'gi');
  return str.replace(regex, match => `<mark>${match}</mark>`);
}

module.exports = highlightWord;

