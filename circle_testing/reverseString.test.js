const reverseString = require('./reverseString');

test('reverses the string "hello"', () => {
  expect(reverseString('hello')).toBe('olleh');
});

test('reverses the string "racecar"', () => {
  expect(reverseString('racecar')).toBe('racecar');
});

test('reverses an empty string', () => {
  expect(reverseString('')).toBe('');
});

