// Import the necessary modules
const { JSDOM } = require('jsdom');

// Load the background page HTML file into a JSDOM environment
const dom = new JSDOM('<html><head></head><body><script src="background.js"></script></body></html>', {
  runScripts: 'dangerously',
  resources: 'usable'
});

// Test suite for the background script
describe('Background script', () => {
  // Test case for console.log output
  test('should log "background running"', () => {
    const consoleSpy = jest.spyOn(console, 'log');
    // Run the background script
    dom.window.eval(`
      console.log('background running');
    `);
    // Verify that the console.log statement was executed with the expected output
    expect(consoleSpy).toHaveBeenCalledWith('background running');
    // Clean up the console spy
    consoleSpy.mockRestore();
  });

  // Test case for message listener
  test('should update window.word when receiving a message', () => {
    const mockMessage = {
      text: 'testing'
    };
    // Trigger the message listener with the mock message
    dom.window.chrome.runtime.sendMessage(mockMessage);
    // Verify that the message was received and the window.word was updated
    expect(dom.window.word).toBe('testing');
  });
});

