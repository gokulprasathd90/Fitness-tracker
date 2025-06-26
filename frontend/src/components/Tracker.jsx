import React, { useState, useEffect } from 'react';
import './Tracker.css'; 

// Tracker component
const Tracker = ({ days, setDays }) => {
  // State for each input field
  const [steps, setSteps] = useState('');
  const [calories, setCalories] = useState('');
  const [water, setWater] = useState('');
  const [workout, setWorkout] = useState('');
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [heartRate, setHeartRate] = useState('');
  const [sleep, setSleep] = useState('');
  const [stride, setStride] = useState('');
  const [editIdx, setEditIdx] = useState(null);

  // Calculate BMI
  const bmi =
    height && weight
      ? (parseFloat(weight) / ((parseFloat(height) / 100) ** 2)).toFixed(2)
      : '';

  // Calculate distance
  const distance =
    steps && stride
      ? ((parseFloat(steps) * parseFloat(stride)) / 100000).toFixed(2)
      : '';

  // Confirm handler (add or update day)
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
      const updatedDays = [...days];
      updatedDays[editIdx] = newDay;
      setDays(updatedDays);
      setEditIdx(null);
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
    // Reset fields
    setSteps('');
    setStride('');
    setCalories('');
    setWater('');
    setWorkout('');
    setHeight('');
    setWeight('');
    setHeartRate('');
    setSleep('');
  };

  // Edit handler: load selected day into form
  React.useEffect(() => {
    if (editIdx !== null && days[editIdx]) {
      const day = days[editIdx];
      setSteps(day.steps);
      setStride(day.stride);
      setCalories(day.calories);
      setWater(day.water);
      setWorkout(day.workout);
      setHeight(day.height);
      setWeight(day.weight);
      setHeartRate(day.heartRate);
      setSleep(day.sleep);
    }
  }, [editIdx, days]);

  // On mount, check if editIdx is set in localStorage
  useEffect(() => {
    const idxStr = localStorage.getItem('editIdx');
    if (idxStr !== null) {
      const idx = parseInt(idxStr, 10);
      if (!isNaN(idx) && days[idx]) {
        const day = days[idx];
        setSteps(day.steps);
        setStride(day.stride);
        setCalories(day.calories);
        setWater(day.water);
        setWorkout(day.workout);
        setHeight(day.height);
        setWeight(day.weight);
        setHeartRate(day.heartRate);
        setSleep(day.sleep);
        setEditIdx(idx);
      }
      localStorage.removeItem('editIdx');
    }
  }, [days]);

  // Render the form
  return (
    <div className="tracker">
      <h2>Fitness Tracker</h2>
      <label>
        Steps:
        <input
          type="number"
          value={steps}
          onChange={e => setSteps(e.target.value)}
          placeholder="Enter steps"
        />
      </label>
      <label>
        Stride Length (cm):
        <input
          type="number"
          value={stride}
          onChange={e => setStride(e.target.value)}
          placeholder="Enter stride length"
        />
      </label>
      <label>
        Calories:
        <input
          type="number"
          value={calories}
          onChange={e => setCalories(e.target.value)}
          placeholder="Enter calories"
        />
      </label>
      <label>
        Water Intake (L):
        <input
          type="number"
          value={water === '' ? undefined : water}
          onChange={e => setWater(e.target.value)}
          placeholder="Enter water intake"
        />
      </label>
      <label>
        Workout Time (min):
        <input
          type="number"
          value={workout === '' ? undefined : workout}
          onChange={e => setWorkout(e.target.value)}
          placeholder="Enter workout time"
        />
      </label>
      <label>
        Weight (kg):
        <input
          type="number"
          value={weight === '' ? undefined : weight}
          onChange={e => setWeight(e.target.value)}
          placeholder="Enter weight"
        />
      </label>
      <label>
        Height (cm):
        <input
          type="number"
          value={height === '' ? undefined : height}
          onChange={e => setHeight(e.target.value)}
          placeholder="Enter height"
        />
      </label>
      <label>
        Heart Rate (bpm):
        <input
          type="number"
          value={heartRate === '' ? undefined : heartRate}
          onChange={e => setHeartRate(e.target.value)}
          placeholder="Enter heart rate"
        />
      </label>
      <label>
        Sleep Hours:
        <input
          type="number"
          value={sleep === '' ? undefined : sleep}
          onChange={e => setSleep(e.target.value)}
          placeholder="Enter sleep hours"
        />
      </label>
      <button onClick={handleConfirm} style={{ marginTop: '1rem' }}>
        {editIdx !== null ? 'Update' : 'Confirm'}
      </button>
    </div>
  );
};

export default Tracker;