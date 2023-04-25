// background.test.js

describe('Background script', () => {
  beforeEach(() => {
    global.chrome = {
      runtime: {
        onMessage: {
          addListener: jest.fn(),
        },
      },
    };
    window.word = "Glossary Tool";
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('Background script logs "Background running" on start', () => {
    console.log = jest.fn();
    require('./background');

    expect(console.log).toHaveBeenCalledWith('Background running');
  });

  test('receiver function sets window.word to received text', () => {
    const request = { text: 'New Word' };
    const sender = {};
    const sendResponse = jest.fn();

    receiver(request, sender, sendResponse);

    expect(window.word).toBe('New Word');
  });

  test('Event listener is added to chrome.runtime.onMessage', () => {
    require('./background');

    expect(chrome.runtime.onMessage.addListener).toHaveBeenCalledWith(receiver);
  });
});

