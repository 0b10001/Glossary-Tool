const backRUN = require('./backrun');

test('double the number', () => {
  expect(backrun(12)).toBe(24);
});

