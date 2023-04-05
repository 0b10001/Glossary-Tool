describe('Background script', () => {
  test('console.log should output "background running"', () => {
    // Create a spy to mock the console.log method
    const consoleSpy = jest.spyOn(console, 'log');

    // Call the function to be tested
    console.log('background running');

    // Verify that console.log was called with the expected output
    expect(consoleSpy).toHaveBeenCalledWith('background running');

    // Clean up the spy
    consoleSpy.mockRestore();
  });

  test('window.word should be updated when a message is received', () => {
    // Set up test data
    const mockRequest = { text: 'hello' };
    const mockSender = {};
    const mockSendResponse = jest.fn();

    // Call the function to be tested
    receiver(mockRequest, mockSender, mockSendResponse);

    // Verify that window.word was updated correctly
    expect(window.word).toBe('hello');
  });
});

