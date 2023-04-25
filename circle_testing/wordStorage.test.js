const wordStorage = require('./wordStorage');

test('sets and gets a word from word storage', () => {
  const expectedWord = 90 //'Hello, world!';
  wordStorage.setWord(expectedWord);
  const actualWord = wordStorage.getWord();
  expect(actualWord).toBe(expectedWord);
});

test('throws a TypeError when trying to set a non-string value', () => {
  expect(() => wordStorage.setWord(null)).toThrow(TypeError);
});

