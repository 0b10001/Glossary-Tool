function openPopup(url, name, width, height) {
  const left = window.screen.width / 2 - width / 2;
  const top = window.screen.height / 2 - height / 2;
  const features = `width=${width},height=${height},top=${top},left=${left}`;

  const popup = window.open(url, name, features);

  if (!popup) {
    throw new Error('Failed to open popup');
  }

  return popup;
}

module.exports = openPopup;

