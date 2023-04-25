const openPopup = require('./openPopup');

test('opens a popup window with the correct dimensions and URL', () => {
  const url = 'https://example.com';
  const name = 'example';
  const width = 600;
  const height = 400;

  const popup = openPopup(url, name, width, height);

  expect(popup).toBeDefined();
  expect(popup.closed).toBe(false);
  expect(popup.location.href).toBe(url);
  expect(popup.outerWidth).toBe(width);
  expect(popup.outerHeight).toBe(height);

  popup.close();
});

test('throws an error if failed to open popup', () => {
  const url = 'https://example.com';
  const name = 'example';
  const width = 600;
  const height = 400;

  // Disable popups by default
  const originalOpen = window.open;
  window.open = () => null;

  expect(() => openPopup(url, name, width, height)).toThrow(Error);

  // Restore window.open
  window.open = originalOpen;
});

