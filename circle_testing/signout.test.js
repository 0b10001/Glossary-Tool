require('jest-localstorage-mock');
const { signOut } = require('./signout');

describe('signOut', () => {
  beforeEach(() => {
    // Set up the initial state of localStorage
    localStorage.setItem('signedIn', 'true');
    localStorage.setItem('email', 'test@example.com');
    localStorage.setItem('dateTime', '2023-05-14');

    // Mock the alert function
    global.alert = jest.fn();
  });

  afterEach(() => {
    // Clean up localStorage after each test
    localStorage.clear();

    // Clear the mock
    global.alert.mockClear();
    delete global.alert;
  });

  test('removes data from localStorage and displays alert', () => {
    // Call the signOut function
    signOut();

    // Check that the data is removed from localStorage
    expect(localStorage.removeItem).toHaveBeenCalledWith('signedIn');
    expect(localStorage.removeItem).toHaveBeenCalledWith('email');
    expect(localStorage.removeItem).toHaveBeenCalledWith('dateTime');

    // Check that the alert is displayed
    expect(global.alert).toHaveBeenCalledWith('You are signed out');
  });
});
