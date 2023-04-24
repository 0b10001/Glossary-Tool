describe('background.js', () => {
  beforeEach(() => {
    // Mock console.log and chrome.runtime.onMessage.addListener
    console.log = jest.fn();
    global.chrome = {
      runtime: {
        onMessage: {
          addListener: jest.fn(),
        },
      },
    };
    // Mock window.word
    global.window = {
      word: '',
    };
  });

  afterEach(() => {
    jest.resetAllMocks();
    delete global.chrome;
    delete global.window;
  });

  it('should log "background running" on initialization', () => {
    require('../src/background.js');
    expect(console.log).toHaveBeenCalledWith('background running');
  });

  it('should add a listener for messages from content.js on initialization', () => {
    require('../src/background.js');
    expect(chrome.runtime.onMessage.addListener).toHaveBeenCalledWith(expect.any(Function));
  });

  it('should set the initial value of window.word to "Glossary Tool"', () => {
    require('../src/background.js');
    expect(window.word).toBe('Glossary Tool');
  });

  it('should update the value of window.word when a message is received', () => {
    require('../src/background.js');
    const listener = chrome.runtime.onMessage.addListener.mock.calls[0][0];
    listener({ text: 'new word' });
    expect(window.word).toBe('new word');
  });
});

