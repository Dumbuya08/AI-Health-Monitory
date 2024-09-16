import { chromeai } from 'chrome-ai';

const model = chromeai();
import { chromeai as chrome } from 'chrome-ai';

const AI = chromeai('generic', {
  // additional settings
  temperature: 0.5,
  topK: 5,
});

import { generateText } from 'ai';
import { chromeai } from 'chrome-ai';

const { text } = await generateText({
  model: chromeai(),
  prompt: 'Who are you?',
});

console.log(text); //  I am a large language model, trained by Google.
import { chromeai } from 'chrome-ai';
import { streamText } from 'ai';
import { chromeai } from 'chrome-ai';

const { textStream } = await streamText({
  model: chromeai(),
  prompt: 'Who are you?',
});

let result = '';
for await (const textPart of textStream) {
  result = textPart;
}
import { generateObject } from 'ai';
import { chromeai } from 'chrome-ai';
import { z } from 'zod';

const { object } = await generateObject({
  model: chromeai('text'),
  schema: z.object({
    recipe: z.object({
      name: z.string(),
      ingredients: z.array(
        z.object({
          name: z.string(),
          amount: z.string(),
        }),
      ),
      steps: z.array(z.string()),
    }),
  }),
  prompt: 'Generate a lasagna recipe.',
});

console.log(object);
// { recipe: {...} }
import { vertex } from '@ai-sdk/google-vertex';
import { createVertex } from '@ai-sdk/google-vertex';

const vertex = createVertex({
  project: 'my-project', // optional
  location: 'us-central1', // optional
});

console.log(result);
//  I am a large language model, trained by Google.

const express = require('express');
const app= express();
const path = require('path');
const fs = require('fs');
const https = require('https');

// SSL Configuration (HTTPS)
const sslServer = https.createServer(
  {
    key: fs.readFileSync('cert/key.pem'),
    cert: fs.readFileSync('cert/cert.pem'),
  },
  app
);

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Route for the homepage
app.get('/', (req, res) => {
  req.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start the server on port 443 (HTTPS)
sslServer.listen(443, () => {
  console.log('Server is running securely on port 443');
});

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const json = express();
const PORT = 3000;

// Middleware

app.use(cors());
app.use(bodyParser.json());

// Route to handle patient data submission (from doctor)
app.post('/api/patient-data', (req, res) => {

    
}
// Route to retrieve patient data (from the system)
const:  get('/api/patient-data', (req, res) => {
    // Read the patient data from a JSON file
    const filePath = path.join(__dirname, 'patient-data.json');
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error reading patient data file');
        } else {
            const patientData = JSON.parse(data);
            res.json(patientData);
        }
    });
}),

const express = require('express');
const mysql = require('mysql2');
const app = express();
const port = 3000;

// MySQL Connection Setup
const db = mysql.createConnection({
  host: 'localhost', // Change to your MySQL host
  user: 'root',      // Change to your MySQL user
  password: 'password', // Change to your MySQL password
  database: 'health_monitoring_system'
});

db.connect(err => {
  if (err) throw err;
  console.log('Connected to MySQL database.');
});

// Get patient data
app.get('/api/patients', (req, res) => {
  const query = `SELECT * FROM patients`;
  db.query(query, (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

// Get health data for a specific patient
app.get('/api/patients/:id/health', (req, res) => {
  const { id } = req.params;
  const query = `SELECT * FROM health_data WHERE patient_id = ?`;
  db.query(query, [id], (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

// Start the server

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`Press Ctrl+C to stop the server`);
    // Simulate writing patient data to a JSON file every 5 seconds
    setInterval(() => {
        const patientData = [
            { name: "Patient A", status: "Stable", temperature: 36.8 },
            { name: "Patient B", status: "Critical", temperature: 39.2 },
            { name: "Patient C", status: "Recovering", temperature: 37.1 },
            { name: "Patient D", status: "Under Observation", temperature: 38.0 },
        ];
        const filePath = path.join(__dirname, 'patient-data.json');
        fs.writeFile(filePath, JSON.stringify(patientData, null, 2), (err) => {
            if (err) {
                console.error(err);
            }
        });
        console.log('Patient data updated');

        }, 5000);
        })
)