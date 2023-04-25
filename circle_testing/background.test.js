const { backgroundRunning, receiver } = require('./src');

// Unit test for backgroundRunning function
describe('backgroundRunning', () => {
  it('should log "background running" to the console', () => {
    const consoleSpy = jest.spyOn(console, 'log');
    backgroundRunning();
    expect(consoleSpy).toHaveBeenCalledWith('background running');
  });
});

// Unit test for receiver function
describe('receiver', () => {
  it('should set the window word to the received text', () => {
    const mockRequest = { text: 'new word' };
    receiver(mockRequest, null, null);
    expect(window.word).toEqual('new word');
  });

  it('should log the received request to the console', () => {
    const mockRequest = { text: 'new word' };
    const consoleSpy = jest.spyOn(console, 'log');
    receiver(mockRequest, null, null);
    expect(consoleSpy).toHaveBeenCalledWith(mockRequest);
  });
});

