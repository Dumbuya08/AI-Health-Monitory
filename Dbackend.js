document.addEventListener('DOMContentLoaded', function() {
  fetch('http://localhost:3000/getPatientData')
  .then(response => response.json())
  .then(data => {
      if (data.success) {
          const patientInfoDiv = document.getElementById('patientInfo');
          patientInfoDiv.innerHTML = '';
          
          data.data.forEach(patient => {
              const patientDiv = document.createElement('div');
              patientDiv.className = 'patient';
              
              patientDiv.innerHTML = `
                  <h3>${patient.name}</h3>
                  <p><strong>Age:</strong> ${patient.age}</p>
                  <p><strong>Gender:</strong> ${patient.gender}</p>
                  <p><strong>Medical History:</strong> ${patient.medicalHistory}</p>
                  <p><strong>Current Symptoms:</strong> ${patient.currentSymptoms}</p>
                  <p><strong>Disease:</strong> ${patient.disease}</p>
              `;
              
              patientInfoDiv.appendChild(patientDiv);
          });
      } else {
          alert('Error fetching data');
      }
  })
  .catch(error => {
      console.error('Error:', error);
  });
  
  document.getElementById('clearData').addEventListener('click', function() {
      fetch('http://localhost:3000/clearPatientData', {
          method: 'POST'
      })
      .then(response => response.json())
      .then(data => {
          if (data.success) {
              document.getElementById('patientInfo').innerHTML = '';
          } else {
              alert('Error clearing data');
          }
      })
      .catch(error => {
          console.error('Error:', error);
      });
  });
});
