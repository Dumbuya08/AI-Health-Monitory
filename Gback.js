async function fetchDiseaseData() {
  const response = await fetch('/api/disease-data');
  const data = await response.json();

  const ctx = document.getElementById('diseaseChart').getContext('2d');
  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: Object.keys(data),
      datasets: [{
        label: 'Number of Cases',
        data:
        const fs = require('fs'); // To save records locally
        const express = require('express');
        const bodyParser = require('body-parser');
        const path = require('path');
        
        const app = express();
        app.use(bodyParser.urlencoded({ extended: false }));
        app.use(bodyParser.json());
        
        let patients = []; // Store patients temporarily before saving to a file
        let doctorAllocations = []; // Store doctor allocation information
        let graphData = {}; // For storing data to generate graphs for the diseases
        
        // Serve static frontend files
        app.use(express.static(path.join(__dirname, 'public')));
        
        // Endpoint to save patient data
        app.post('/save-patient-data', (req, res) => {
          const patient = req.body;
          patients.push(patient);
          console.log('Patient data saved:', patient);
        
          // Save to file
          fs.writeFileSync('patients.json', JSON.stringify(patients, null, 2), 'utf8');
          res.json({ message: 'Patient data saved successfully!' });
        });
        
        // Endpoint to allocate a doctor
        app.post('/allocate-doctor', (req, res) => {
          const { patientId, doctorName, condition, priority } = req.body;
        
          // Allocate doctor
          const allocation = { patientId, doctorName, condition, priority };
          doctorAllocations.push(allocation);
          console.log('Doctor allocated:', allocation);
        
          // Save to file
          fs.writeFileSync('doctor_allocations.json', JSON.stringify(doctorAllocations, null, 2), 'utf8');
          res.json({ message: 'Doctor allocated successfully!' });
        });
        
        // Endpoint to generate disease graph data
        app.post('/add-graph-data', (req, res) => {
          const { disease, count } = req.body;
        
          if (!graphData[disease]) {
            graphData[disease] = 0;
          }
          graphData[disease] += parseInt(count, 10); // Update the count of cases for the disease
          console.log('Updated graph data:', graphData);
        
          // Save to file
          fs.writeFileSync('graph_data.json', JSON.stringify(graphData, null, 2), 'utf8');
          res.json({ message: 'Graph data updated successfully!' });
        });
        
        // Endpoint to fetch graph data
        app.get('/get-graph-data', (req, res) => {
          res.json(graphData); // Send back the graph data for frontend visualization
        });
        
        // Start the server
        const PORT = process.env.PORT || 3000;
        app.listen(PORT, () => {
          console.log(`Server is running on port ${PORT}`);
        });
        function fetchGraphData() {
          fetch('/get-graph-data')
            .then(response => response.json())
            .then(data => {
              renderGraph(data);
            })
            .catch(error => console.error('Error fetching graph data:', error));
        }
    
        function renderGraph(data) {
          const ctx = document.getElementById('diseaseGraph').getContext('2d');
    
          // Prepare labels (disease names) and data (counts)
          const labels = Object.keys(data);
          const counts = Object.values(data);
    
          new Chart(ctx,
             
          {

            


