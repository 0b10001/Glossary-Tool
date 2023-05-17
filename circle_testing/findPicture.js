function searchPicture(word) {
    const accessKey = "_MfV33cUzKWKBQxlbhoFlPrXvJNMRrhrBYkQGCk-tqI";
    const apiUrl = `https://api.unsplash.com/search/photos?page=1&query=${word}`;
    fetch(apiUrl, {
        headers: {
            Authorization: `Client-ID ${accessKey}`,
            },
    }).then(response => response.json())
        .then(data => {
            const photoUrl = data.results[0].urls.regular;
            
    }).catch(error => console.error(error));
}
module.exports = {searchPicture};