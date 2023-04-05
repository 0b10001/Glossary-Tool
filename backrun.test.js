const backRUN = require('./backrun');

test('double the number', () => {
  expect(backRUN(12)).toBe(24);
});

