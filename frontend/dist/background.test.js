describe('background.js', () => {
  beforeEach(() => {
    global.chrome = {
      runtime: {
        onMessage: {
          addListener: jest.fn(),
        },
      },
    };
  });

  afterEach(() => {
    delete global.chrome;
  });

  it('should load without errors', () => {
    expect(() => {
      require('../src/background.js');
    }).not.toThrow();
  });
});

