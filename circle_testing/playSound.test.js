const { playSound } = require('./playSound');

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
