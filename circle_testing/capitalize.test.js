const capitalize = require('./capitalize');

test('capitalizes the first letter of a string', () => {
  expect(capitalize('hello')).toBe('Hello');
});

test('throws an error if input is not a string', () => {
  expect(() => {
    capitalize(42);
  }).toThrow(TypeError);
});

test('handles empty strings', () => {
  expect(capitalize('')).toBe('');
});

