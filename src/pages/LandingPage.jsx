import React from 'react';
import { Play, Music, BarChart2, Calendar, Clock, Globe, Heart, Activity, Wind, Zap } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

import '../App.css';
import '../mobile.css';

function LandingPage() {
    const navigate = useNavigate();

    return (
        <div className="app">
            <nav className="navbar glass-panel">
                <div className="container nav-content">
                    <div className="logo" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <img src="/ritam_logo.svg" alt="Ritam Logo" style={{ height: '32px', width: 'auto', borderRadius: '50%' }} />
                        <h1 className="logo-script" style={{ margin: 0, fontSize: '1.5rem', color: 'white' }}>Ritam</h1>
                    </div>
                    <button className="btn-skip" onClick={() => navigate('/onboarding')}>Skip</button>
                </div>
            </nav>

            <main>
                {/* Section 1: Hero */}
                <section className="section hero">
                    <div className="container">
                        <h1 className="title">Discover a growing collection of guided meditations designed for calm, focus, and balance.</h1>
                        <p className="subtitle">Elevate your mind, transform your spirit, and awaken your inner serenity.</p>


                        <div className="center-guru" style={{
                            position: 'relative',
                            top: 'auto',
                            left: 'auto',
                            transform: 'none',
                            display: 'flex',
                            justifyContent: 'center',
                            marginTop: '40px',
                            marginBottom: '40px'
                        }}>
                            <div className="guru-circle" style={{
                                width: '320px',
                                height: '320px',
                                borderRadius: '50%',
                                overflow: 'hidden',
                                border: '4px solid rgba(255,255,255,0.2)',
                                boxShadow: '0 0 40px rgba(124, 58, 237, 0.6)'
                            }}>
                                <img src="/meditating_guru.jpg" alt="Meditating Guru" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                            </div>
                        </div>
                    </div>
                </section>

                {/* Section 2: Chants */}
                <section className="section chants">
                    <div className="container">
                        <h2 className="title">Sacred Sounds:<br />Ancient Chants and Mantras</h2>
                        <p className="subtitle">Calm the mind and uplift the soul with the profound power of timeless mantras.</p>

                        <div className="chant-circle-container">
                            <div className="chant-center">
                                <h3>Om Namah Shivaya</h3>
                                <p>108 times (Bhanumathi Narasimhan)</p>
                            </div>

                            <div className="chant-orb orb-1">
                                <Heart size={24} />
                                <span>Tap Into Your Soul</span>
                            </div>
                            <div className="chant-orb orb-2">
                                <Activity size={24} />
                                <span>Overall Wellbeing</span>
                            </div>
                            <div className="chant-orb orb-3">
                                <Zap size={24} />
                                <span>Endurance</span>
                            </div>
                            <div className="chant-orb orb-4">
                                <Wind size={24} />
                                <span>Remove Worries</span>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Section 3: Tools */}
                <section className="section tools">
                    <div className="container">
                        <h2 className="title">Go Deeper with<br />Powerful tools</h2>
                        <p className="subtitle">Track your progress, stay consistent, and advance your journey with our meditation timer and tracker.</p>

                        <div className="chakra-body">
                            <div className="meditating-figure">
                                <div className="chakra c1"></div>
                                <div className="chakra c2"></div>
                                <div className="chakra c3"></div>
                                <div className="chakra c4"></div>
                                <div className="chakra c5"></div>
                                <div className="chakra c6"></div>
                                <div className="chakra c7"></div>
                            </div>

                            <div className="tool-card t-stats">
                                <BarChart2 />
                                <span>Stats</span>
                            </div>
                            <div className="tool-card t-tracker">
                                <Calendar />
                                <span>Tracker</span>
                            </div>
                            <div className="tool-card t-streak">
                                <Activity />
                                <span>Streak</span>
                            </div>
                            <div className="tool-card t-timer">
                                <Clock />
                                <span>Timer</span>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Section 4: Community */}
                <section className="section community">
                    <div className="container center-text">
                        <h2 className="title">Mindfulness Without Borders</h2>
                        <p className="subtitle">
                            A calm, thoughtfully designed meditation space — open to everyone, everywhere.
                        </p>

                        <div className="community-hub">
                            <div className="globe-core">
                                <Globe size={320} strokeWidth={0.5} opacity={0.6} color="#A9DBB8" />
                            </div>

                            <div className="stat-orbit-card orbit-left">
                                <div className="stat-icon-box">🌍</div>
                                <div className="stat-info">
                                    <h4>Available For</h4>
                                    <strong>Worldwide</strong>
                                </div>
                            </div>

                            <div className="stat-orbit-card orbit-right">
                                <div className="stat-icon-box">🌱</div>
                                <div className="stat-info">
                                    <h4>Community</h4>
                                    <strong>Growing Community</strong>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
}

export default LandingPage;
