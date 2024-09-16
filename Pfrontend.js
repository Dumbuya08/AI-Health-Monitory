// scripts.js

function submitPatientForm(event) {
  event.preventDefault(); // Prevent default form submission

  // Collect form data
  const formData = {
      name: document.getElementById('name').value,
      age: document.getElementById('age').value,
      gender: document.getElementById('gender').value,
      symptoms: document.getElementById('symptoms').value,
      medicalHistory: document.getElementById('medicalHistory').value,
      currentSymptoms: document.getElementById('currentSymptoms').value,
      disease: document.getElementById('disease').value,
      triageCategory: document.getElementById('triageCategory').value,
      vitals: document.getElementById('vitals').value
  };

  // Send form data to backend
  fetch('http://localhost:3000/submitPatientData', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
  })
  .then(response => response.json())
  .then(data => {
      if (data.success) {
          // Show success message
          document.getElementById('successMessage').style.display = 'block';

          // Redirect to Doctor Allocation page
          setTimeout(() => {
              window.location.href = 'DoctorAllocation.html';
          }, 2000);
      } else {
          alert('Error submitting patient data');
      }
  })
  .catch(error => {
      console.error('Error:', error);
  });
}
