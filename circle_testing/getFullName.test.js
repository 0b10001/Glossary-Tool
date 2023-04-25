const getFullName = require('./getFullName');

test('returns full name with first and last name', () => {
  expect(getFullName('John', 'Doe')).toBe('John Doe');
});

test('throws an error when first name is missing', () => {
  expect(() => {
    getFullName(null, 'Doe');
  }).toThrowError('Both first name and last name are required');
});

test('throws an error when last name is missing', () => {
  expect(() => {
    getFullName('John', '');
  }).toThrowError('Both first name and last name are required');
});

