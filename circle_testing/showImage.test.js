const { showImage } = require('./showImage');

describe('showImage', () => {
  let originalPictureWord;
  let originalLoader;
  let originalWordDetails;

  beforeEach(() => {
    // Mock the necessary objects and properties
    originalPictureWord = global.pictureWord;
    originalLoader = global.loader;
    originalWordDetails = global.wordDetails;

    global.pictureWord = {
      style: {
        visibility: ''
      },
      src: ''
    };

    global.loader = {
      style: {
        visibility: ''
      }
    };

    global.wordDetails = [
      {
        Graphic: 'example-image.jpg'
      }
    ];
  });

  afterEach(() => {
    // Restore the original objects and properties
    global.pictureWord = originalPictureWord;
    global.loader = originalLoader;
    global.wordDetails = originalWordDetails;
  });

  test('hides the image and clears the source when already visible', () => {
    // Set the initial visibility state
    global.pictureWord.style.visibility = 'visible';

    // Call the showImage function
    showImage();

    // Check that the image visibility is hidden
    expect(global.pictureWord.style.visibility).toBe('hidden');

    // Check that the image source is cleared
    expect(global.pictureWord.src).toBe('');
  });

  test('shows the image and sets the source when not visible', () => {
    // Set the initial visibility state
    global.pictureWord.style.visibility = 'hidden';

    // Call the showImage function
    showImage();

    // Check that the loader visibility is set to visible
    expect(global.loader.style.visibility).toBe('hidden');

    // Check that the image source is set correctly
    expect(global.pictureWord.src).toBe('example-image.jpg');

    // Check that the image visibility is set to visible
    expect(global.pictureWord.style.visibility).toBe('visible');
  });

  // ... additional test cases ...
});
