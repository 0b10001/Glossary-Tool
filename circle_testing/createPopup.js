// createPopup.js
function createPopup(url, width, height) {
  const left = (window.innerWidth - width) / 2;
  const top = (window.innerHeight - height) / 2;
  const features = `width=${width},height=${height},left=${left},top=${top}`;
  const popupWindow = window.open(url, '', features);
  return popupWindow;
}

module.exports = createPopup;

