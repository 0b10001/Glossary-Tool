describe('background.js', () => {
  it('should load without errors', () => {
    expect(() => {
      require('../src/background.js');
    }).not.toThrow();
  });
});

