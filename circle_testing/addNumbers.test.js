const backRUN = require('./addNumbers');

describe('addNumbers', () => {
  it('should add two numbers', () => {
    expect(addNumbers(2, 3)).toBe(5);
    expect(addNumbers(-1, 1)).toBe(0);
    expect(addNumbers(0.1, 0.2)).toBeCloseTo(0.3);
  });
});

