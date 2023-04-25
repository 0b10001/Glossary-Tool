function openPopup(url, name, width, height, type) {
  if (typeof type !== 'string') {
    throw new TypeError('Expected a string for the media type');
  }

  const mediaTypes = {
    image: ['jpg', 'jpeg', 'gif', 'png', 'bmp', 'svg'],
    video: ['mp4', 'webm', 'ogg'],
    audio: ['mp3', 'wav', 'ogg'],
  };

  const fileExt = url.split('.').pop().toLowerCase();

  if (!mediaTypes[type] || !mediaTypes[type].includes(fileExt)) {
    throw new Error(`Invalid media type or file extension: ${type}`);
  }

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

