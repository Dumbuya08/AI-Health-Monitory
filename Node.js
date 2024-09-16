const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

// Use in-memory storage for patient data (replace with database later)
let patients = [];

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Serve static files (for HTML, CSS, JS)
app.use(express.static('public'));

// API route to handle patient data submission
app.post('/api/patients', (req, res) => {
    const patient = req.body;

    // Save patient data
    patients.push(patient);

    res.json({ success: true });
});

// API route to get patient data in spreadsheet format (JSON)
app.get('/api/patients', (req, res) => {
    res.json(patients);
});

// Start server on port 3000
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
const { google } = require('googleapis');

// Google Sheets Configuration
const sheets = google.sheets('v4');
const spreadsheetId = 'YOUR_GOOGLE_SHEET_ID';  // Replace with your Google Sheet ID

const { google } = require('googleapis');  // Ensure googleapis is required at the top

async function addPatientToGoogleSheet(patient) {
    const auth = new google.auth.GoogleAuth({
        keyFile: 'path-to-your-credentials.json',  // Ensure you have the correct path to your credentials file
        scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    const client = await auth.getClient();
    
    // Initialize the Sheets API
    const sheets = google.sheets({ version: 'v4', auth: client });

    const spreadsheetId = 'your-spreadsheet-id';  // Ensure this is your actual spreadsheet ID

    const request = {
        spreadsheetId: spreadsheetId,
        range: 'Sheet1!A1',  // Replace with the appropriate range in your sheet
        valueInputOption: 'USER_ENTERED',
        resource: {
            values: [
                [patient.codeNo, patient.name, patient.age, patient.gender, patient.date, patient.sickness, patient.temperature]
            ],
        },
    };

    try {
        // Append values to the Google Sheet
        await sheets.spreadsheets.values.append(request);
        console.log('Patient added to Google Sheet');
    } catch (error) {
        // Handle the error
        console.error('Error adding patient to Google Sheet:', error);
    }
}

