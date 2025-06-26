import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home.jsx';
import StoredData from './pages/StoredData.jsx';
import Navbar from './components/Navbar.jsx';
import Login from './pages/Login.jsx';
import SignUp from './pages/SignUp.jsx';

const App = () => {
  const [days, setDays] = useState([]);
  const [signedUp, setSignedUp] = useState(() => !!localStorage.getItem('signedUp'));
  const [loggedIn, setLoggedIn] = useState(() => !!localStorage.getItem('loggedIn'));

  const handleSignUp = () => {
    localStorage.setItem('signedUp', 'true');
    setSignedUp(true);
  };

  const handleLogin = () => {
    localStorage.setItem('loggedIn', 'true');
    setLoggedIn(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('loggedIn');
    setLoggedIn(false);
  };

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/signup" element={<SignUp onSignUp={handleSignUp} />} />
        <Route path="/login" element={
          signedUp ? <Login onLogin={handleLogin} /> : <Navigate to="/signup" />
        } />
        <Route path="/" element={
          !signedUp ? <Navigate to="/signup" /> :
          !loggedIn ? <Navigate to="/login" /> :
          <Home days={days} setDays={setDays} />
        } />
        <Route path="/stored" element={
          !signedUp ? <Navigate to="/signup" /> :
          !loggedIn ? <Navigate to="/login" /> :
          <StoredData days={days} setDays={setDays} />
        } />
      </Routes>
      {loggedIn && <button onClick={handleLogout} style={{position:'fixed',top:10,right:10}}>Logout</button>}
    </Router>
  );
};

export default App;