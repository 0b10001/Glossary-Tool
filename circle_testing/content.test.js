// Import the module to be tested
const content = require('./content');

// Mock the window object
const mockWindow = {
  getSelection: jest.fn(),
};
global.window = mockWindow;

// Mock the chrome.runtime.sendMessage method
const mockSendMessage = jest.fn();
global.chrome = {
  runtime: {
    sendMessage: mockSendMessage,
  },
};

describe('content.js', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should log "Chrome extension go?" on initialization', () => {
    console.log = jest.fn();
    require('../src/content');
    expect(console.log).toHaveBeenCalledWith('Chrome extension go?');
  });

  it('should add a listener for the "mouseup" event on the window object', () => {
    mockWindow.addEventListener = jest.fn();
    require('../src/content');
    expect(mockWindow.addEventListener).toHaveBeenCalledWith('mouseup', expect.any(Function));
  });

  it('should get the selected text from the window object when the "mouseup" event is triggered', () => {
    mockWindow.getSelection.mockReturnValueOnce({ toString: jest.fn(() => 'selected text') });
    const listener = jest.fn();
    mockWindow.addEventListener.mockImplementationOnce((event, callback) => {
      if (event === 'mouseup') {
        listener();
        callback();
      }
    });
    wordSelected();
    expect(mockWindow.getSelection).toHaveBeenCalled();
    expect(listener).toHaveBeenCalled();
    expect(console.log).toHaveBeenCalledWith('selected text');
  });

  it('should send a message with the selected text to the background when the "mouseup" event is triggered and the selected text is not empty', () => {
    mockWindow.getSelection.mockReturnValueOnce({ toString: jest.fn(() => 'selected text') });
    const listener = jest.fn();
    mockWindow.addEventListener.mockImplementationOnce((event, callback) => {
      if (event === 'mouseup') {
        listener();
        callback();
      }
    });
    wordSelected();
    expect(mockSendMessage).toHaveBeenCalledWith({ text: 'selected text' });
  });

  it('should not send a message with the selected text to the background when the "mouseup" event is triggered and the selected text is empty', () => {
    mockWindow.getSelection.mockReturnValueOnce({ toString: jest.fn(() => '') });
    const listener = jest.fn();
    mockWindow.addEventListener.mockImplementationOnce((event, callback) => {
      if (event === 'mouseup') {
        listener();
        callback();
      }
    });
    wordSelected();
    expect(mockSendMessage).not.toHaveBeenCalled();
  });
});

