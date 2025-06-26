import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

const sendData = async () => {
  const data = { name: 'Pushups', value: 20 };
  await fetch('http://localhost:5000/api/tests', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
};

const handleConfirm = async () => {
  const newDay = {
    steps,
    stride,
    calories,
    water,
    workout,
    height,
    weight,
    heartRate,
    sleep,
    bmi: bmi || '0',
    distance: distance || '0',
  };

  if (editIdx !== null) {
    // ...existing update logic...
  } else {
    setDays([...days, newDay]);
    // Send to backend
    try {
      await fetch('http://localhost:5000/add-day', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newDay),
      });
    } catch (err) {
      console.error('Failed to send data to backend', err);
    }
  }
  // ...reset fields...
};