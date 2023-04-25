const openPopup = require('./openPopup');

test('opens a popup window with the correct dimensions and URL for image', () => {
  const url = 'https://example.com/image.jpg';
  const name = 'example';
  const width = 600;
  const height = 400;
  const type = 'image';

  const popup = openPopup(url, name, width, height, type);

  expect(popup).toBeDefined();
  expect(popup.closed).toBe(false);
  expect(popup.location.href).toBe(url);
  expect(popup.outerWidth).toBe(width);
  expect(popup.outerHeight).toBe(height);

  popup.close();
});

test('throws an error if invalid media type or file extension', () => {
  const url = 'https://example.com/document.pdf';
  const name = 'example';
  const width = 600;
  const height = 400;
  const type = 'image';

  expect(() => openPopup(url, name, width, height, type)).toThrow(Error);
});

test('throws a TypeError if invalid type argument', () => {
  const url = 'https://example.com/video.mp4';
  const name = 'example';
  const width = 600;
  const height = 400;
  const type = 123;

  expect(() => openPopup(url, name, width, height, type)).toThrow(TypeError);
});

