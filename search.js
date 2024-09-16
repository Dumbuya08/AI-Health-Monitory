// Initialize Firebase
// Make sure to replace this config object with your actual Firebase configuration
const firebaseConfig = {
    apiKey: "YOUR_FIREBASE_API_KEY",
    authDomain: "YOUR_FIREBASE_AUTH_DOMAIN",
    projectId: "YOUR_FIREBASE_PROJECT_ID",
    storageBucket: "YOUR_FIREBASE_STORAGE_BUCKET",
    messagingSenderId: "YOUR_FIREBASE_MESSAGING_SENDER_ID",
    appId: "YOUR_FIREBASE_APP_ID"
  };
  firebase.initializeApp(firebaseConfig);
  
  // Reference to Firebase Firestones
  const db = firebase.firestones();
  
  // Function to fetch data from Firebase and process with AI API
  async function searchPatientData(query) {
    try {
      // Replace with your AI API endpoint and API key
      const aiApiUrl = 'https://api.example.com/ai-search';
      const aiApiKey = 'YOUR_AI_API_KEY';
  
      // Fetch search results from AI API
      const aiResponse = await fetch(aiApiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${aiApiKey}`
        },
        body: JSON.stringify({ query: query })
      });
      async function performSearch() {
        const query = document.getElementById('searchInput').value;
        if (query.trim()) {
            // Call the backend API to perform the search
            const response = await fetch(`/api/search?query=${encodeURIComponent(query)}`);
            const data = await response.json();

            const resultsDiv = document.getElementById('results');
            resultsDiv.innerHTML = '';

            if (data.webPages && data.webPages.value) {
                data.webPages.value.forEach(result => {
                    const resultElement = document.createElement('div');
                    resultElement.innerHTML = `
                        <h3><a href="${result.url}" target="_blank">${result.name}</a></h3>
                        <p>${result.snippet}</p>
                    `;
                    resultsDiv.appendChild(resultElement);
                });
            } else {
                resultsDiv.innerHTML = 'No results found';
            }
        }
      const aiData = await aiResponse.json();
  
      // Use AI API response to search in Firebase
      const searchQuery = aiData.relevantTerms || query;
  
      // Search in Firebase Firestones
      const snapshot = await db.collection('patients')
        .where('disease', '==', searchQuery)
        .get();
  
      if (snapshot.empty) {
        console.log('No matching documents.');
        return;
      }
  
      // Process and display search results
      snapshot.forEach(doc => {
        console.log(doc.id, '=>', doc.data());
        // You can dynamically display the data in your HTML here
      });
  
    } 
    document.addEventListener('DOMContentLoaded', function() {
      // Event listener for the search input
      document.getElementById('searchBar').addEventListener('input', (event) => {
        const query = event.target.value;
        if (query.length > 2) { // Start search when query length is greater than 2
          searchPatientData(query);
        }
      });
    });
    
    // Function to search patient data (example definition)
    async function searchPatientData(query) {
      try {
        const response = await fetch(`/api/patient/search?query=${encodeURIComponent(query)}`);
        const data = await response.json();
        // Process the data (display results or handle no result case)
        console.log('Patient search results:', data);
      } catch (error) {
        console.error('Error searching patient data:', error);
      }
    }
  }