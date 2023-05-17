const { addNumbers } = require('./addition');

describe('addNumbers', () => {
  test('adds two numbers correctly', () => {
    expect(addNumbers(5, 3)).toBe(8);
    expect(addNumbers(-2, 10)).toBe(8);
    expect(addNumbers(0, 0)).toBe(0);
  });
});
