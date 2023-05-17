
// Import the function to be tested
const { searchPicture } = require('./findPicture');

describe('searchPicture', () => {
  test('should fetch and retrieve photo URL for a valid word', async () => {
    // Mock the fetch function and provide a sample response
    const mockResponse = {
      json: jest.fn().mockResolvedValueOnce({
        results: [{ urls: { regular: 'https://example.com/photo.jpg' } }]
      })
    };
    global.fetch = jest.fn().mockResolvedValueOnce(mockResponse);

    // Spy on console.error
    const errorSpy = jest.spyOn(console, 'error');


    //set valid word
    let validWord = "white"
    // Call the function with a valid word
    await searchPicture(validWord);

    // Assertions
    expect(mockResponse.json).toHaveBeenCalled();
    expect(errorSpy).not.toHaveBeenCalled();
    
  });

  test('should handle error for an invalid word', async () => {
    // Spy on console.error
    const errorSpy = jest.spyOn(console, 'error');

    let invalidWord = "skoonplat";
    // Call the function with a invalid word
    await searchPicture(invalidWord);
     
    // Assertions
    expect(errorSpy).toHaveBeenCalled();
    
  });
});
