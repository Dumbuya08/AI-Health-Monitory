// Firebase Authentication (Login Functionality)
function loginUser(email, password) {
  firebase.auth().signInWithEmailAndPassword(email, password)
  .then((userCredential) => {
      // Logged in successfully
      var user = userCredential.user;
      console.log("User logged in:", user.email);
  })
  .catch((error) => {
      console.error("Login error:", error.message);
  });
}


 //Step 3: Implementing the Logout Functionality
 function logoutUser() {
  firebase.auth().signOut()
  .then(() => {
      console.log("User logged out");
  })
  .catch((error) => {
      console.error("Logout error:", error.message);
  });
}

//Step 4: Implementing the Register Functionality
function registerUser(email, password) {
  firebase.auth().createUserWithEmailAndPassword(email, password)
  .then((userCredential) => {
    // User created successfully
    var user = userCredential.user;
    console.log("User created:", user.email);
    })
    .catch((error) => {
      console.error("Registration error:", error.message);
      });
      }
      

const functions = require("firebase-functions");
const admin = require("firebase-admin");
const axios = require("axios");  // Use for AI API calls like OpenAI

admin.initializeApp();
const db = admin.firestore();

// API to fetch patients data based on a query
exports.fetchPatientData = functions.https.onRequest(async (req, res) => {
    const query = req.query.q.toLowerCase();
    
    try {
        // Search patients in Firestore
        const patientsRef = db.collection("patients");
        const snapshot = await patientsRef.get();

        if (snapshot.empty) {
            return res.status(404).send({ message: "No matching patients found" });
        }

        const results = [];
        snapshot.forEach(doc => {
            const patient = doc.data();
            if (patient.name.toLowerCase().includes(query)) {
                results.push(patient);
            }
        });

        // Return results
        return res.status(200).send(results);
    } catch (error) {
        console.error("Error fetching patient data:", error);
        return res.status(500).send({ error: "Internal Server Error" });
    }
});

// API to call AI model and enhance the search query
exports.enhanceSearchWithAI = functions.https.onRequest(async (req, res) => {
    const query = req.query.q;
    
    // Example: Using OpenAI's GPT API for enhancing search queries
    const apiKey = "YOUR_OPENAI_API_KEY";
    const aiResponse = await axios.post('https://api.openai.com/v1/engines/davinci/completions', {
        prompt: `Enhance this search query for health-related issues: ${query}`,
        max_tokens: 50
    }, {
        headers: {
            'Authorization': `Bearer ${apiKey}`
        }
    });

    const aiEnhancedQuery = aiResponse.data.choices[0].text.trim();

    // Return AI-enhanced query
    res.status(200).send({ enhancedQuery: aiEnhancedQuery });
});


// Initialize Firebase or your cloud platform SDK here if needed
// Example for Firebase (You need to configure this properly):
// var firebaseConfig = { /* Your Firebase config here */ };
// firebase.initializeApp(firebaseConfig);

// AI-Powered Search Function
async function searchPatients() {
  const query = document.getElementById('searchBar').value.trim().toLowerCase();
  
  if (query.length === 0) {
      document.getElementById('searchResults').innerHTML = "";
      return;
  }

  try {
      // Call an AI model (like OpenAI) to enhance search query with predictions
      const aiEnhancedQuery = await enhanceWithAI(query);

      // Fetch patient data from the cloud
      const patientData = await fetchPatientData(aiEnhancedQuery);

      // Display the fetched data
      displayResults(patientData);
      
  } catch (error) {
      console.error("Error fetching patient data:", error);
  }
}

// AI Enhancement for Search Query (this is optional, but provides AI-powered features)
async function enhanceWithAI(query) {
  const apiKey = 'YOUR_OPENAI_API_KEY';  // Use any AI service
  const apiUrl = 'https://api.openai.com/v1/engines/davinci/completions';

  const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
          prompt: `Enhance this search query for health-related issues or patient information: ${query}`,
          max_tokens: 50
      })
  });

  const data = await response.json();
  return data.choices[0].text.trim();
}

// Fetch Patient Data from Cloud (Assume you have a REST API or Firebase Database)
async function fetchPatientData(query) {
  // Example with Firebase Firestore
  const db = firebase.firestore();
  const patientsRef = db.collection('patients');

  // Query the database with AI-enhanced search term
  const snapshot = await patientsRef.where('name', '>=', query).limit(10).get();

  if (snapshot.empty) {
      return [];
  }

  const results = [];
  snapshot.forEach(doc => {
      results.push(doc.data());
  });

  return results;
}

// Function to display search results
function displayResults(results) {
  const searchResultsContainer = document.getElementById('searchResults');
  searchResultsContainer.innerHTML = "";  // Clear previous results

  if (results.length === 0) {
      searchResultsContainer.innerHTML = "<p>No matching patients found</p>";
      return;
  }

  results.forEach(patient => {
      const patientCard = document.createElement('div');
      patientCard.classList.add('patient-card');
      patientCard.innerHTML = `
          <h3>${patient.name}</h3>
          <p>Age: ${patient.age}</p>
          <p>Health Condition: ${patient.healthCondition}</p>
          <p>Last Visit: ${patient.lastVisit}</p>
      `;
      searchResultsContainer.appendChild(patientCard);
  });
}


document.getElementById("chatbot-send").addEventListener("click", function() {
  const query = document.getElementById("chatbot-input").value;
  if (query) {
      fetchAIResponse(query).then(response => {
          document.getElementById("chatbot-response").innerText = response;
      });
  }
});
async function fetchAIResponse(query) {
  const response = await fetch('https://api.openai.com/v1/engines/davinci/completions', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer YOUR_API_KEY'
      },
      body: JSON.stringify({
          prompt: query,
          max_tokens: 150
      })
  });
  const data = await response.json();
  return data.choices[0].text;
}

// Simulate patient data
const patientData = [
    { name: "Patient A", status: "Stable", temperature: 36.8 },
    { name: "Patient B", status: "Critical", temperature: 39.2 },
    { name: "Patient C", status: "Recovering", temperature: 37.1 },
    { name: "Patient D", status: "Under Observation", temperature: 38.0 },
];
  
  // Function to render patient data in the UI
  const renderData = () => {
    const dataList = document.getElementById("dataList");
    dataList.innerHTML = ''; // Clear the existing list
  
    patientData.forEach((data) => {
      const dataItem = document.createElement('div');
      dataItem.classList.add('data-item');
      
      dataItem.innerHTML = `
        <h3>${data.name}</h3>
        <span class="status">${data.status}</span>
      `;
      
      dataList.appendChild(dataItem);
    });
  };
  
  // Function to filter and search patient data
  const searchBar = document.getElementById('searchBar');
  searchBar.addEventListener('input', (e) => {
    const searchValue = e.target.value.toLowerCase();
    
    const filteredData = patientData.filter(patient => 
      patient.name.toLowerCase().includes(searchValue)
    );
    
    // Render filtered data
    const dataList = document.getElementById("dataList");
    dataList.innerHTML = ''; // Clear the list
    
    filteredData.forEach((data) => {
      const dataItem = document.createElement('div');
      dataItem.classList.add('data-item');
      
      dataItem.innerHTML = `
        <h3>${data.name}</h3>
        <span class="status">${data.status}</span>
      `;
      
      dataList.appendChild(dataItem);
    });
  });
  
  // Initial render of data
  renderData();
  
  // Initialize the Chart.js Graph
  const ctx = document.getElementById('patientChart').getContext('2d');
  const chart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: patientData.map(patient => patient.name), // X-axis: patient names
      datasets: [{
        label: 'Patient Temperatures',
        data: patientData.map(patient => patient.temperature), // Y-axis: temperature values
        borderColor: '#075e54',
        fill: false,
        tension: 0.1
      }]
    },
    options: {
      responsive: true,
      scales: {
        y: {
          beginAtZero: false
        }
      }
    }
  });
  
  // Show/Hide Dropdown Menu
  const menuBtn = document.getElementById('menuBtn');
  const dropdownMenu = document.getElementById('dropdownMenu');
  menuBtn.addEventListener('click', () => {
    dropdownMenu.style.display = dropdownMenu.style.display === 'block' ? 'none' : 'block';
  });
  import React, { createContext, useEffect, useState } from 'react';

export const BlockchainContext = createContext();

export const BlockchainContextProvider = ({ children }) => {
  const [blockchainData, setBlockchainData] = useState(null);

  useEffect(() => {
    // Blockchain data fetching logic can go here
    // For instance, fetching from a blockchain API
    const fetchBlockchainData = async () => {
      // Simulated blockchain fetch
      setBlockchainData({
        account: '0x123456789abcdef',
        balance: '100 SOL',
      });
    };
    fetchBlockchainData();
  }, []);

  return (
    <BlockchainContext.Provider value={blockchainData}>
      {children}
    </BlockchainContext.Provider>
  );
};
