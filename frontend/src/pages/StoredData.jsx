import React from 'react';

const StoredData = ({ days, setDays }) => {
  // Delete handler: remove the day at idx
  const handleDelete = (idx) => {
    setDays(days.filter((_, i) => i !== idx));
  };

  return (
    <div style={{ margin: '2rem' }}>
      <h2>Stored Days</h2>
      {days.length === 0 && <p>No data stored yet.</p>}
      {days.map((day, idx) => (
        <div
          key={idx}
          style={{
            marginBottom: '1.5rem',
            padding: '1rem',
            background: '#f9f9f9',
            borderRadius: '8px',
          }}
        >
          <h4>Day {idx + 1}</h4>
          <p>Steps: {day.steps || 0}</p>
          <p>Stride Length: {day.stride || 0} cm</p>
          <p>Calories: {day.calories || 0}</p>
          <p>Water Intake: {day.water || 0} L</p>
          <p>Workout Time: {day.workout || 0} min</p>
          <p>Weight: {day.weight || 0} kg</p>
          <p>Height: {day.height || 0} cm</p>
          <p>BMI: {day.bmi || 0}</p>
          <p>Heart Rate: {day.heartRate || 0} bpm</p>
          <p>Sleep Hours: {day.sleep || 0}</p>
          <button onClick={() => handleDelete(idx)}>Delete</button>
        </div>
      ))}
    </div>
  );
};

export default StoredData;