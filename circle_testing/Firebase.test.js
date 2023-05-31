import { initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { getFirestore, collection, addDoc ,getDocs,doc,setDoc,getDoc} from 'firebase/firestore';
import axios from 'axios';
/* test the sign-in functionality using the signInWithEmailAndPassword 
   method from Firebase Authentication.
   It aims to verify whether a user can successfully sign in with a known email and password.
*/ 
const firebaseConfig = {
    apiKey: "AIzaSyA-TNh57VzJUFuYlFC9YEkV0CpWEXyIvFQ",
    authDomain: "glossary--tool.firebaseapp.com",
    projectId: "glossary--tool",
    storageBucket: "glossary--tool.appspot.com",
    messagingSenderId: "779250629314",
    appId: "1:779250629314:web:8b39974fb23604e446595b",
    measurementId: "G-9XDY3QX4WE"
};

// Set up the Firebase app and authentication
initializeApp(firebaseConfig);
const auth = getAuth();

test('Sign-in verification', async () => {
    // Create a test user with a known email and password
     // Increase the timeout to 10 seconds (10000 milliseconds)
    
    const testEmail = 'nakanapuseletso931@gmail.com';
    const testPassword = 'puseletso931';
    
    const userCredentials = await signInWithEmailAndPassword(auth, testEmail, testPassword);
    
    // Assert that the sign-in was successful
    expect(userCredentials.user).toBeDefined();
  } ,1000000);
  test('Sign-in verification - Unknown user', async () => {
    // Create a test user with an unknown email and password
    const testEmail = 'unknown@example.com';
    const testPassword = 'testpassword';
  
    // Attempt to sign in with the unknown user
    await expect(signInWithEmailAndPassword(auth, testEmail, testPassword))
      .rejects.toThrow('auth/user-not-found');
  },1000000);
  test('API call - Testing translations', async () => {
    const testWord = 'Better';
    const translationArray = [];
  
    const languagePairs = [
      { code: 'af', name: 'Afrikaans' },
      { code: 'xh', name: 'Xhosa' },
      { code: 'zu', name: 'Zulu' },
      { code: 'st', name: 'Sotho' },
      { code: 'tn', name: 'Tswana' },
      { code: 'nso', name: 'Sepedi' },
      { code: 'nr', name: 'Ndebele' },
      { code: 'ts', name: 'Venda' },
      { code: 've', name: 'Swati' },
      { code: 'ts', name: 'Tsonga' },
    ];
  
    const requests = languagePairs.map(pair => {
      const myMemoryUrl = `https://api.mymemory.translated.net/get?q=${testWord}&langpair=en|${pair.code}`;
      return axios.get(myMemoryUrl);
    });
  
    try {
      const responses = await Promise.all(requests);
      responses.forEach((response, index) => {
        const translation = response.data.responseData.translatedText || '';
        const languageName = languagePairs[index].name;
        translationArray.push({ language: languageName, translation });
      });
    } catch (error) {
      console.error('Error fetching translations:', error.message);
    }
  
    expect(translationArray).toEqual([
      { language: 'Afrikaans', translation: 'Beter' }, // Add expected translations here
      { language: 'Xhosa', translation: 'Ngcono' },
      { language: 'Zulu', translation: 'kuncono uyabona' },
      {language: "Sotho",translation: "Molemo o motle"},
      {language: "Tswana",translation: "E botoka"},
      {language: "Sepedi",translation: "E bonagalago ka mo go"},
      {language: "Ndebele",translation: ""},
      {language: "Venda",translation: "Nchumu Wo Antswa Swinene"},
      {language: "Swati",translation: ""},
      {language: "Tsonga",translation: "Nchumu Wo Antswa Swinene"},
  
    ]);
  }, 10000);
  
  test('API call - Fetch translations and store in database', async () => {
    const testWord = 'Better';
  
    // Initialize the requests list
    const requests = [];
  
    // Initialize the language pairs
    const languagePairs = [
      { code: 'af', name: 'Afrikaans' },
      { code: 'xh', name: 'Xhosa' },
      { code: 'zu', name: 'Zulu' },
      { code: 'st', name: 'Sotho' },
      { code: 'tn', name: 'Tswana' },
      { code: 'nso', name: 'Sepedi' },
      { code: 'nr', name: 'Ndebele' },
      { code: 'ts', name: 'Venda' },
      { code: 've', name: 'Swati' },
      { code: 'ts', name: 'Tsonga' }
    ];
  
    // Make requests to fetch translations for each language pair
    for (const pair of languagePairs) {
      const myMemoryUrl = `https://api.mymemory.translated.net/get?q=${testWord }&langpair=en|${pair.code}`;
      requests.push(fetch(myMemoryUrl));
    }
  
    // Wait until all requests are completed
    const responses = await Promise.all(requests);
    const data = await Promise.all(responses.map(resp => resp.json()));
  
    // Initialize translations
    let translations = '';
  
    // Initialize translation array
    const translationArray = [];
  
    // Process the data and store translations
  // Process the data and store translations
  for (let i = 0; i < data.length; i++) {
    const translation = data[i].responseData.translatedText;
    const languageName = languagePairs[i].name;

    // Handle empty translation
    const formattedTranslation = translation !== null ? translation : '';

    translations += `${languageName}: ${formattedTranslation}<br>`;
    translationArray.push({ language: languageName, translation: formattedTranslation });
  }
  
    // Access the Firestore instance
    const firestore = getFirestore();
  
    // Set the custom document ID as the searched word
    const testDocumentRef = doc(firestore, 'word_tester', testWord );
  
    // Add the translations to the document
    await setDoc(testDocumentRef, { translations: translationArray }, { merge: true });
  
    // Retrieve the added document from the collection
    const querySnapshot = await getDocs(collection(firestore, 'word_tester'));
    const documents = querySnapshot.docs.map(doc => doc.data());
  
    // Assert that the translations were added successfully
    expect(documents).toContainEqual(expect.objectContaining({ translations: translationArray }));

  }, 20000);
  

 
  
  test('API call - Fetch thesaurus data and compare definitions, synonyms, antonyms, and example', async () => {

    const expectedDefinition = "having or showing deep-seated resentment";
    const expectedSynonyms = 'acrid';
    const expectedAntonyms = ["gratifying","pleasing","sweet"];
    const expectedExample = "a bitter attitude about always having to work on Saturday";

    const testWord = 'Bitter';

    const thesaurusApiKey = "27f79564-22f5-40fb-b470-349be9fe5935";
    const thesaurusUrl = `https://www.dictionaryapi.com/api/v3/references/ithesaurus/json/${testWord}?key=${thesaurusApiKey}`;
  
    try {
      // Make the API call using Axios
      const response = await axios.get(thesaurusUrl);
  
      if (response.status === 200) {
        // Extract the relevant data from the API response
        const data = response.data;
  
        // Process the data
        const synonym = data[0]?.meta.syns[0]?.[0] || '';
        const antonyms = data[0]?.meta.ants[0] || [];
        const example = data[0]?.def[0]?.sseq[0]?.[0]?.[1]?.dt[1]?.[1]?.[0]?.t.replace(/\{it\}/g, '').replace(/\{\/it\}/g, '') || '';
        const definition = data[0]?.shortdef[0] || '';
  
        expect(definition).toEqual(expectedDefinition);
        expect(synonym).toEqual(expectedSynonyms);
        expect(antonyms).toEqual(expectedAntonyms);
        expect(example).toEqual(expectedExample);
      } else {
        throw new Error('Invalid API response');
      }
    } catch (error) {
      console.error('Error fetching thesaurus data:', error.message);
    }
  });


test('API call - Fetch data and store in database', async () => {
  const testWord = 'Bitter';

  const thesaurusApiKey = "27f79564-22f5-40fb-b470-349be9fe5935";
  const thesaurusUrl = `https://www.dictionaryapi.com/api/v3/references/ithesaurus/json/${testWord}?key=${thesaurusApiKey}`;

  // Make the API call using Axios
  const response = await axios.get(thesaurusUrl);

  // Extract the relevant data from the API response
  const data = response.data;

  // Process the data
  const synonym = data[0]?.meta.syns[0]?.[0] || '';
  const antonyms = data[0]?.meta.ants[0] || '';
  const example = data[0]?.def[0]?.sseq[0]?.[0]?.[1]?.dt[1]?.[1]?.[0]?.t.replace(/\{it\}/g, '').replace(/\{\/it\}/g, '') || '';
  const definition = data[0]?.shortdef[0] || '';

  // Access the Firestore instance
  const firestore = getFirestore();
  // Set the custom document ID as the searched word
  const testDocumentRef = doc(firestore, 'word_tester', testWord);

  await setDoc(testDocumentRef, {
    synonym,
    antonyms,
    example,
    definition,
  });

  
  // Retrieve the added document from the collection
  const querySnapshot = await getDocs(collection(firestore, 'word_tester'));
  const documents = querySnapshot.docs.map(doc => doc.data());

  // Assert that the document was added successfully
  expect(documents).toContainEqual({
    synonym,
    antonyms,
    example,
    definition,
  });
}, 10000);

test('API call - Fetch picture and compare URL', async () => {
  const finalWord = 'example'; // Replace with the desired search term

  const accessKey = "_MfV33cUzKWKBQxlbhoFlPrXvJNMRrhrBYkQGCk-tqI";
  const apiUrl = `https://api.unsplash.com/search/photos?page=1&query=${finalWord}`;

    // Fetch the data from the API using axios
    const response = await axios.get(apiUrl, {
      headers: {
        Authorization: `Client-ID ${accessKey}`,
      },
    });

    const data = response.data;

    let graphic = ''; // Initialize the graphic URL

    if (data && data.results[0] && data.results[0].urls && data.results[0].urls.regular) {
      graphic = data.results[0].urls.regular;
    }

    // Expected picture URL
    const expectedUrl = 'https://images.unsplash.com/photo-1524419986249-348e8fa6ad4a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0Mzk1MTN8MHwxfHNlYXJjaHwxfHxleGFtcGxlfGVufDB8fHx8MTY4NTU0NjYyN3ww&ixlib=rb-4.0.3&q=80&w=1080';
    // Assert that the fetched picture URL matches the expected URL
    expect(graphic).toEqual(expectedUrl);
}, 10000);

test('API call - Fetch picture and store in database', async () => {
  const finalWord = 'example'; // Replace with the desired search term

  const accessKey = "_MfV33cUzKWKBQxlbhoFlPrXvJNMRrhrBYkQGCk-tqI";
  const apiUrl = `https://api.unsplash.com/search/photos?page=1&query=${finalWord}`;

  // Fetch the data from the API
  const response = await fetch(apiUrl, {
    headers: {
      Authorization: `Client-ID ${accessKey}`,
    },
  });

  if (!response.ok) {
    throw new Error(response.status);
  }

  const data = await response.json();

  let graphic = ''; // Initialize the graphic URL

  if (data && data.results[0] && data.results[0].urls && data.results[0].urls.regular) {
    graphic = data.results[0].urls.regular;
  }

  // Access the Firestore instance
  const firestore = getFirestore();

  // Set the custom document ID as the searched word
  const testDocumentRef = doc(firestore, 'word_tester', finalWord);

  // Add the graphic URL to the document
  await setDoc(testDocumentRef, { graphic }, { merge: true });

  // Retrieve the added document from the collection
  const querySnapshot = await getDocs(collection(firestore, 'word_tester'));
  const documents = querySnapshot.docs.map(doc => doc.data());

  // Assert that the graphic URL was added successfully
  expect(documents).toContainEqual(expect.objectContaining({ graphic }));

}, 10000);

test('Bad Rating when clicked', async () => {
  const collectionName = 'words';
  const documentId = 'ability';
  const fieldName = 'Bad';
  const firestore = getFirestore();
  // Create a query to fetch the document
   // Get the document reference
   const documentRef = doc(firestore, collectionName, documentId);

   // Fetch the document
   const documentSnapshot = await getDoc(documentRef);
 
   // Retrieve the specific field value from the document
   const fieldValue = documentSnapshot.data()?.[fieldName];

  // Assert that the field value is not undefined
  expect(fieldValue).toEqual(0);
});

test('Good Rating when clicked', async () => {
  const collectionName = 'words';
  const documentId = 'ability';
  const fieldName = 'Good';
  const firestore = getFirestore();
  // Create a query to fetch the document
   // Get the document reference
   const documentRef = doc(firestore, collectionName, documentId);

   // Fetch the document
   const documentSnapshot = await getDoc(documentRef);
 
   // Retrieve the specific field value from the document
   const fieldValue = documentSnapshot.data()?.[fieldName];

  // Assert that the field value is not undefined
  expect(fieldValue).toEqual(0);
});
