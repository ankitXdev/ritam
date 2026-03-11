import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { auth } from './firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { seedDatabase } from './seed';
import LandingPage from './pages/LandingPage';
import Onboarding from './pages/Onboarding';
import Signup from './pages/Signup';
import Login from './pages/Login';
import HomePage from './pages/HomePage';
import ExplorePage from './pages/ExplorePage';
import MeditationPage from './pages/MeditationPage';
import SacredSoundsPage from './pages/SacredSoundsPage';
import ProfilePage from './pages/ProfilePage';
import AdminDashboard from './pages/AdminDashboard';
import Loader from './components/Loader';
import GlobalAudioPlayer from './components/GlobalAudioPlayer';
import { AudioProvider } from './context/AudioContext';
import './App.css';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Seed DB once
    seedDatabase();

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
    <AudioProvider>
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/onboarding" element={<Onboarding />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />

          {/* Protected Routes */}
          <Route path="/home" element={user ? <HomePage /> : <Navigate to="/login" />} />
          <Route path="/explore" element={user ? <ExplorePage /> : <Navigate to="/login" />} />
          <Route path="/meditation" element={user ? <MeditationPage /> : <Navigate to="/login" />} />
          <Route path="/sacred-sounds" element={user ? <SacredSoundsPage /> : <Navigate to="/login" />} />
          <Route path="/profile" element={user ? <ProfilePage /> : <Navigate to="/login" />} />
          
          {/* Admin Route - Simple protection for now */}
          <Route path="/admin" element={user ? <AdminDashboard /> : <Navigate to="/login" />} />

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
        <GlobalAudioPlayer />
      </Router>
    </AudioProvider>
  );
}

export default App;
