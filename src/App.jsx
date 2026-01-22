import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { auth } from './firebase';
import { onAuthStateChanged } from 'firebase/auth';
import LandingPage from './pages/LandingPage';
import Onboarding from './pages/Onboarding';
import Signup from './pages/Signup';
import Login from './pages/Login';
import HomePage from './pages/HomePage';
import ExplorePage from './pages/ExplorePage';
import MeditationPage from './pages/MeditationPage';
import SacredSoundsPage from './pages/SacredSoundsPage';
import ProfilePage from './pages/ProfilePage';
import Loader from './components/Loader';
import './App.css';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Listen for auth state changes
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (isLoading) {
    return (
      <div className="app-loader-container">
        <Loader />
      </div>
    );
  }

  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/onboarding" element={<Onboarding />} />
        <Route path="/signup" element={user ? <Navigate to="/home" /> : <Signup />} />
        <Route path="/login" element={user ? <Navigate to="/home" /> : <Login />} />

        {/* Protected Routes */}
        <Route path="/home" element={user ? <HomePage /> : <Navigate to="/login" />} />
        <Route path="/explore" element={user ? <ExplorePage /> : <Navigate to="/login" />} />
        <Route path="/meditation" element={user ? <MeditationPage /> : <Navigate to="/login" />} />
        <Route path="/sacred-sounds" element={user ? <SacredSoundsPage /> : <Navigate to="/login" />} />
        <Route path="/profile" element={user ? <ProfilePage /> : <Navigate to="/login" />} />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
