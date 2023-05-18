const { JSDOM } = require('jsdom');
require('jest-localstorage-mock');
const { signOut, playSound,doClose ,picture,searchWord,fetchTranslations,showImage  } = require('./GT_test');

describe('playSound', () => {
  let originalSpeechSynthesis;
  let originalSpeechSynthesisUtterance;
  let originalLoader;
  let originalConsoleLog;
  let finalWord = "hello world";
  beforeEach(() => {
    // Mock the necessary objects and methods
    originalSpeechSynthesis = global.speechSynthesis;
    originalSpeechSynthesisUtterance = global.SpeechSynthesisUtterance;
    originalLoader = global.loader;
    originalConsoleLog = global.console.log;

    global.loader = {
      style: {
        visibility: 'hidden'
      }
    };

    global.SpeechSynthesisUtterance = jest.fn();
    global.speechSynthesis = {
      speak: jest.fn()
    };
    global.console.log = jest.fn();
  });

  afterEach(() => {
    // Restore the original objects and methods
    global.speechSynthesis = originalSpeechSynthesis;
    global.SpeechSynthesisUtterance = originalSpeechSynthesisUtterance;
    global.loader = originalLoader;
    global.console.log = originalConsoleLog;
  });

  test('shows loader, speaks the utterance, and hides loader', () => {
    // Set the initial visibility to "visible"
    global.loader.style.visibility = 'visible';
  
    // Call the playSound function
    playSound(finalWord);
  
    // Check that the loader is set to visible
    expect(global.loader.style.visibility).toBe('hidden');
  
    // Check that the SpeechSynthesisUtterance is instantiated correctly
    expect(global.SpeechSynthesisUtterance).toHaveBeenCalledWith(finalWord);
  
    // Check that the speak method is called
    expect(global.speechSynthesis.speak).toHaveBeenCalled();
  
    // Check that the loader is set to hidden
    expect(global.loader.style.visibility).toBe('hidden');
  });
  
  // ... additional test cases ...
});

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
  
const dom = new JSDOM('<!doctype html><html><body><div id="output"></div></body></html>');
global.document = dom.window.document;
global.window = dom.window;
global.fetch = jest.fn(() => Promise.resolve({
  json: () => Promise.resolve({
    results: [
      {
        urls: {
          regular: 'https://example.com/image.jpg'
        },
        description: 'Example image'
      }
    ]
  })
}));

console.error = jest.fn();

describe('picture', () => {
  afterEach(() => {
    jest.restoreAllMocks();
    jest.clearAllMocks();
  });

  test('should fetch and display the image correctly', async () => {
    const word = 'example';

    await picture(word);

    // Wait for the promises to resolve
    await new Promise((resolve) => setTimeout(resolve, 0));

    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(global.fetch).toHaveBeenCalledWith(
      expect.stringContaining(`https://api.unsplash.com/search/photos?page=1&query=${word}`),
      expect.objectContaining({
        headers: {
          Authorization: 'Client-ID _MfV33cUzKWKBQxlbhoFlPrXvJNMRrhrBYkQGCk-tqI'
        }
      })
    );

    expect(document.getElementById('output').innerHTML).toBe('<br><br><img src="https://example.com/image.jpg" alt="Example image">');

  });

  test('should handle errors', async () => {
    const mockError = new Error('API Error');
    global.fetch.mockImplementationOnce(() => Promise.reject(mockError));

    const word = 'example';

    await picture(word);

    // Wait for the promises to resolve
    await new Promise((resolve) => setTimeout(resolve, 0));

    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(global.fetch).toHaveBeenCalledWith(
      expect.stringContaining(`https://api.unsplash.com/search/photos?page=1&query=${word}`),
      expect.objectContaining({
        headers: {
          Authorization: 'Client-ID _MfV33cUzKWKBQxlbhoFlPrXvJNMRrhrBYkQGCk-tqI'
        }
      })
    );

    expect(document.getElementById('output').innerHTML).toBe('<br><br><img src="https://example.com/image.jpg" alt="Example image">');
    expect(console.error).toHaveBeenCalledWith(mockError);
  });
});
describe('searchWord', () => {
    beforeEach(() => {
      global.fetch = jest.fn((url) => {
        if (url.includes('ithesaurus')) {
          return Promise.resolve({
            json: () =>
              Promise.resolve([
                {
                  meta: {
                    syns: [['synonym']],
                    ants: [['antonym']],
                  },
                  def: [
                    {
                      sseq: [
                        [
                          [
                            0,
                            {
                              dt: [
                                [
                                  'text',
                                  '{it}example{\/it}',
                                  'text',
                                  '{it}synonym example{\/it}',
                                ],
                                [
                                  'text',
                                  '{it}example translation{\/it}',
                                  'text',
                                  '{it}synonym example translation{\/it}',
                                ],
                              ],
                            },
                          ],
                        ],
                      ],
                    },
                  ],
                  shortdef: ['definition'],
                },
              ]),
          });
        } else if (url.includes('mymemory')) {
          return Promise.resolve({
            json: () =>
              Promise.resolve({
                responseData: {
                  translatedText: 'translation',
                },
              }),
          });
        }
      });
    });
  
    afterEach(() => {
      jest.restoreAllMocks();
    });
  
    describe('Thesaurus URL', () => {
      test('should call fetch with the correct thesaurus URL', () => {
        const word = 'word';
  
        searchWord(word);
  
        expect(global.fetch).toHaveBeenCalledWith(
          expect.stringContaining(
            `https://www.dictionaryapi.com/api/v3/references/ithesaurus/json/${word}?key=27f79564-22f5-40fb-b470-349be9fe5935`
          )
        );
      });
    });
  });
  describe("searchWord - Translator URLs", () => {
    it("should call fetch with the correct translator URLs", () => {
      const word = "test";
      const languagePairs = [
        { code: "af", name: "Afrikaans" },
        {code: 'af', name: 'Afrikaans'},
        {code: 'xh', name: 'Xhosa'},
        {code: 'zu', name: 'Zulu'},
        {code: 'st', name: 'Sotho'},
        {code: 'tn', name: 'Tswana'},
        {code: 'nso', name: 'Sepedi'},
        {code:'nr', name: 'Ndebele'},
        {code:'ts', name: 'Venda'},
        {code:'ve', name: 'Swati'},
        {code:'ts', name: 'Tsonga'}
      ];
  
      global.fetch = jest.fn().mockResolvedValue({ json: jest.fn().mockResolvedValue({ responseData: { translatedText: "" } }) });
  
      return fetchTranslations(word, languagePairs).then(() => {
        for (const pair of languagePairs) {
          const expectedUrl = `https://api.mymemory.translated.net/get?q=${word}&langpair=en|${pair.code}`;
          expect(global.fetch).toHaveBeenCalledWith(expect.stringContaining(expectedUrl));
        }
      });
    });
  });
  
  
describe('showImage', () => {
    let originalPictureWord;
    let originalLoader;
    let originalWordDetails;
  
    beforeEach(() => {
      // Mock the necessary objects and properties
      originalPictureWord = global.pictureWord;
      originalLoader = global.loader;
      originalWordDetails = global.wordDetails;
  
      global.pictureWord = {
        style: {
          visibility: ''
        },
        src: ''
      };
  
      global.loader = {
        style: {
          visibility: ''
        }
      };
  
      global.wordDetails = [
        {
          Graphic: 'example-image.jpg'
        }
      ];
    });
  
    afterEach(() => {
      // Restore the original objects and properties
      global.pictureWord = originalPictureWord;
      global.loader = originalLoader;
      global.wordDetails = originalWordDetails;
    });
  
    test('hides the image and clears the source when already visible', () => {
      // Set the initial visibility state
      global.pictureWord.style.visibility = 'visible';
  
      // Call the showImage function
      showImage();
  
      // Check that the image visibility is hidden
      expect(global.pictureWord.style.visibility).toBe('hidden');
  
      // Check that the image source is cleared
      expect(global.pictureWord.src).toBe('');
    });
  
    test('shows the image and sets the source when not visible', () => {
      // Set the initial visibility state
      global.pictureWord.style.visibility = 'hidden';
  
      // Call the showImage function
      showImage();
  
      // Check that the loader visibility is set to visible
      expect(global.loader.style.visibility).toBe('hidden');
  
      // Check that the image source is set correctly
      expect(global.pictureWord.src).toBe('example-image.jpg');
  
      // Check that the image visibility is set to visible
      expect(global.pictureWord.style.visibility).toBe('visible');
    });
  
  });
  


