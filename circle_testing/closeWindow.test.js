const { doClose } = require('./closeWindow');

describe('doClose', () => {
  test('closes the window', () => {
    // Mock the window.close method
    const closeMock = jest.fn();
    global.window = {
      close: closeMock
    };

    // Call the doClose function
    doClose();

    // Check that the window.close method is called
    expect(closeMock).toHaveBeenCalled();

    // Clean up the mock
    delete global.window;
  });
});
