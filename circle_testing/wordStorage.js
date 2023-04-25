const wordStorage = {
  word: '',
  setWord(newWord) {
    if (typeof newWord !== 'string') {
      throw new TypeError('Expected a string');
    }
    this.word = newWord;
  },
  getWord() {
    return this.word;
  },
  deleteWord() {
    this.word = '';
  }
};

module.exports = wordStorage;

