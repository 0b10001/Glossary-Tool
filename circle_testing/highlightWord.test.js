const highlightWord = require('./highlightWord');

test('highlights the specified word in the input string', () => {
  const str = 'The quick brown fox jumps over the lazy dog';
  const word = 'brown';
  const expected = 'The quick <mark>brown</mark> fox jumps over the lazy dog';

  const actual = highlightWord(str, word);

  expect(actual).toBe(expected);
});

test('handles case-insensitive matches', () => {
  const str = 'The quick brown fox jumps over the lazy dog';
  const word = 'THE';
  const expected = '<mark>The</mark> quick brown fox jumps over <mark>the</mark> lazy dog';

  const actual = highlightWord(str, word);

  expect(actual).toBe(expected);
});

test('throws a TypeError if either argument is not a string', () => {
  expect(() => highlightWord(null, 'word')).toThrow(TypeError);
  expect(() => highlightWord('string', 42)).toThrow(TypeError);
});

