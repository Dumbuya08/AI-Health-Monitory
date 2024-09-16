const express = require('express');
const app = express();

let patientData = []; // Array to store patient data

app.use(express.json()); // Middleware to parse JSON body

// Endpoint to receive patient data
app.post('/submitPatientData', (req, res) => {
    const data = req.body;
    patientData.push(data); // Store patient data in memory (can be replaced with a database)

    // Send success response
    res.json({ success: true });
});

// Endpoint to retrieve all patient data
app.get('/getPatientData', (req, res) => {
    res.json({ success: true, data: patientData });
});

// Endpoint to clear patient data
app.post('/clearPatientData', (req, res) => {
    patientData = []; // Clear patient data
    res.json({ success: true });
});

// Start the server
app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
