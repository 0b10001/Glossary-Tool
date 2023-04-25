//The unit test uses Jest to verify that the reverseString function behaves as expected for several different input values. In each test case, the expect function is used to specify the expected output of the reverseString function, and the toBe matcher is used to perform the actual comparison against the function's actual output. The tests verify that the function can handle non-empty strings, palindromes, and empty strings.//

function reverseString(str) {
  return str.split('').reverse().join('');
}

module.exports = reverseString;

