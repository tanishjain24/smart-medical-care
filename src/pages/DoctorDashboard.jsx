import React, { useState, useEffect } from 'react';

function DoctorDashboard() {
  const [doctorData, setDoctorData] = useState(null);

  useEffect(() => {
    // Simulate fetching doctor data (replace with your API call)
    setTimeout(() => {
      setDoctorData({
        name: 'Dr. Smith',
        patients: [
          { name: 'Alice Johnson', appointment: '2024-03-15' },
          { name: 'Bob Williams', appointment: '2024-04-01' },
        ],
      });
    }, 1000); // Simulate 1 second delay
  }, []);

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif', backgroundColor: '#f0f8ff' }}>
      <h1>Doctor Dashboard</h1>
      {doctorData ? (
        <div>
          <h2>Welcome, {doctorData.name}!</h2>
          <h3>Today's Patients:</h3>
          {doctorData.patients.length > 0 ? (
            <ul>
              {doctorData.patients.map((patient, index) => (
                <li key={index}>
                  {patient.name} - {patient.appointment}
                </li>
              ))}
            </ul>
          ) : (
            <p>No patients scheduled for today.</p>
          )}
        </div>
      ) : (
        <p>Loading doctor data...</p>
      )}
    </div>
  );
}

export default DoctorDashboard;