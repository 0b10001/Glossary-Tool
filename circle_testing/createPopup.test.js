// createPopup.test.js
const createPopup = require('./createPopup');

describe('createPopup', () => {
  beforeEach(() => {
    window.open = jest.fn();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should open a popup window with the correct size and position', () => {
    const url = 'https://www.example.com';
    const width = 500;
    const height = 400;

    const popupWindow = createPopup(url, width, height);

    expect(window.open).toHaveBeenCalledWith(
      url,
      '',
      `width=${width},height=${height},left=${(window.innerWidth - width) / 2},top=${(window.innerHeight - height) / 2}`
    );
    expect(popupWindow).toBeDefined();
  });
});
