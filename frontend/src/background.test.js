describe('background.js', () => {
  beforeEach(() => {
    // Mock console.log
    console.log = jest.fn();
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('console.log', () => {
    it('should log "background running"', () => {
      require('../src/background.js');
      expect(console.log).toHaveBeenCalledWith('background running');
    });
  });

  describe('chrome.runtime.onMessage.addListener', () => {
    it('should add a listener for messages from content.js', () => {
      global.chrome = {
        runtime: {
          onMessage: {
            addListener: jest.fn(),
          },
        },
      };
      require('../src/background.js');
      expect(chrome.runtime.onMessage.addListener).toHaveBeenCalledWith(expect.any(Function));
    });

    // You can write more specific tests for the listener function here.
  });

  describe('window.word', () => {
    it('should set the initial value to "Glossary Tool"', () => {
      require('../src/background.js');
      expect(window.word).toBe('Glossary Tool');
    });

    it('should update the value when a message is received', () => {
      const message = { text: 'new word' };
      require('../src/background.js');
      const listener = chrome.runtime.onMessage.addListener.mock.calls[0][0];
      listener(message);
      expect(window.word).toBe('new word');
    });
  });
});

