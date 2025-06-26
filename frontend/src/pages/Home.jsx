import React from 'react';
import Tracker from '../components/Tracker.jsx';
import './Home.css';

const Home = ({ days, setDays }) => (
  <div className="home">
    <h1>Fitness Tracker</h1>
    <p>Track your fitness journey and a stay motivated!</p>
    <Tracker days={days} setDays={setDays} />
  </div>
);

export default Home;