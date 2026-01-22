import React, { useState } from 'react';
import { Menu, Play, Moon, Sun, Zap, Heart, Shield, Music, Layers, Hand, MoveRight, CornerDownRight, Flower, Wind, Sparkles, Smile, Focus, ChevronRight, X, Headphones, Activity } from 'lucide-react';
import BottomNavigation from '../components/BottomNavigation';
import Sidebar from '../components/Sidebar';
import '../App.css';

function ExplorePage() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    return (
        <div className="app explore-page">
            <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
            {/* Header */}
            <header className="home-header">
                <div className="header-left">
                    <button className="btn-icon" onClick={() => setIsSidebarOpen(true)}>
                        <Menu size={28} color="white" />
                    </button>
                </div>
                <div className="header-center" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <img src="/ritam_logo.jpg" alt="Ritam Logo" style={{ height: '32px', width: 'auto', borderRadius: '50%' }} />
                    <h1 className="logo-script" style={{ margin: 0, fontSize: '1.8rem' }}>Ritam</h1>
                </div>
                <div className="header-right"></div>
            </header>

            <main className="explore-content">
                {/* Journey Card */}
                <section className="section-container">
                    <div className="card-container journey-card">
                        <div className="journey-bg-overlay"></div>
                        <div className="journey-content">
                            <h4 className="script-subtitle">The Beginner's</h4>
                            <h3>Meditation Journey</h3>
                            <p className="journey-status">You're on Day 1</p>

                            <div className="journey-actions">
                                <div className="journey-progress-dots">
                                    <span className="dot big-active"></span>
                                    <span className="dot faded"></span>
                                    <span className="dot faded"></span>
                                    <span className="dot faded"></span>
                                    <span className="dot faded"></span>
                                </div>
                                <button className="btn-continue-white-sm">Continue</button>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Browse by Outcomes */}
                <section className="section-container">
                    <h3 className="section-title">Browse by Outcomes</h3>
                    <div className="grid-2-col">
                        <div className="tile-card">
                            <div className="tile-icon-wrap icon-orange">
                                <CornerDownRight size={24} />
                            </div>
                            <span>Reduce Stress</span>
                        </div>
                        <div className="tile-card">
                            <div className="tile-icon-wrap icon-purple">
                                <Moon size={24} />
                            </div>
                            <span>Improve Sleep Quality</span>
                        </div>
                        <div className="tile-card">
                            <div className="tile-icon-wrap icon-blue">
                                <Focus size={24} /> {/* Assuming Focus icon or similar */}
                            </div>
                            <span>Improved Focus</span>
                        </div>
                        <div className="tile-card">
                            <div className="tile-icon-wrap icon-yellow">
                                <Zap size={24} />
                            </div>
                            <span>Feel Energized</span>
                        </div>
                        <div className="tile-card">
                            <div className="tile-icon-wrap icon-pink">
                                <Smile size={24} />
                            </div>
                            <span>Feel Happy</span>
                        </div>
                        <div className="tile-card">
                            <div className="tile-icon-wrap icon-teal">
                                <Flower size={24} />
                            </div>
                            <span>Overall Wellbeing</span>
                        </div>
                        <div className="tile-card">
                            <div className="tile-icon-wrap icon-red">
                                <Wind size={24} />
                            </div>
                            <span>Relax</span>
                        </div>
                        <div className="tile-card">
                            <div className="tile-icon-wrap icon-orange">
                                <PeaceIcon />
                            </div>
                            <span>Inner Peace</span>
                        </div>
                    </div>
                </section>

                {/* Breathwork (Horizontal Scroll) */}
                <section className="section-container">
                    <h3 className="section-title">Breathwork</h3>
                    <div className="horizontal-scroll">
                        <div className="scroll-card">
                            <div className="card-image-box img-peacock">
                                {/* Placeholder gradient/image */}
                            </div>
                            <h4>Deep Belly Breathing</h4>
                            <p>2 Mins</p>
                        </div>
                        <div className="scroll-card">
                            <div className="card-image-box img-sun"></div>
                            <h4>Deep Relaxation Breath</h4>
                            <p>2 Mins</p>
                        </div>
                        <div className="scroll-card">
                            <div className="card-image-box img-lotus"></div>
                            <h4>Full Yog Breath</h4>
                            <p>11 Mins</p>
                        </div>
                    </div>
                </section>

                {/* Guided Meditations */}
                <section className="section-container">
                    <h3 className="section-title">Guided Meditations</h3>
                    <div className="horizontal-scroll">
                        <div className="scroll-card">
                            <div className="card-image-box img-galaxy">
                                <h4 className="card-inner-title">Yoga Nidra</h4>
                            </div>
                            <h4>Yoga Nidra</h4>
                            <p>20 Mins</p>
                        </div>
                        <div className="scroll-card">
                            <div className="card-image-box img-moon">
                                <h4 className="card-inner-title">Transforming Emotions</h4>
                            </div>
                            <h4>Transforming Emotions</h4>
                            <p>20 Mins</p>
                        </div>
                        <div className="scroll-card">
                            <div className="card-image-box img-abstract-green">
                                <h4 className="card-inner-title">Panchakosha</h4>
                            </div>
                            <h4>Panchakosha</h4>
                            <p>17 Mins</p>
                        </div>
                    </div>
                </section>

                {/* Binaural Beats */}
                <section className="section-container">
                    <div className="flex-title">
                        <h3 className="section-title">Binaural Beats</h3>
                        <span className="badge-new-solid">NEW</span>
                    </div>
                    <div className="horizontal-scroll">
                        <div className="scroll-card">
                            <div className="card-image-box img-green-geom">
                                <h4 className="card-inner-title">Acceptance</h4>
                            </div>
                            <h4>Acceptance Meditation</h4>
                            <p>10 Mins</p>
                        </div>
                        <div className="scroll-card">
                            <div className="card-image-box img-lime-shield">
                                <h4 className="card-inner-title">Calm</h4>
                            </div>
                            <h4>Calm</h4>
                            <p>10 Mins</p>
                        </div>
                        <div className="scroll-card">
                            <div className="card-image-box img-grey-rays">
                                <h4 className="card-inner-title">Connect</h4>
                            </div>
                            <h4>Connect Meditat...</h4>
                            <p>10 Mins</p>
                        </div>
                    </div>
                </section>

                {/* Sacred Sounds */}
                <section className="section-container">
                    <h3 className="section-title">Sacred Sounds</h3>
                    <div className="grid-2-col">
                        <div className="tile-card">
                            <div className="tile-icon-wrap icon-sparkle">
                                <Sparkles size={24} />
                            </div>
                            <span>Success</span>
                        </div>
                        <div className="tile-card">
                            <div className="tile-icon-wrap icon-dollar">
                                <span style={{ fontWeight: 'bold', fontSize: '1.2rem' }}>$</span>
                            </div>
                            <span>Prosperity</span>
                        </div>
                        <div className="tile-card">
                            <div className="tile-icon-wrap icon-hearts">
                                <Heart size={24} fill="white" />
                            </div>
                            <span>Relationship</span>
                        </div>
                        <div className="tile-card">
                            <div className="tile-icon-wrap icon-shield">
                                <Shield size={24} fill="currentColor" />
                            </div>
                            <span>Protection</span>
                        </div>
                        <div className="tile-card">
                            <div className="tile-icon-wrap icon-yellow">
                                <Zap size={24} fill="currentColor" />
                            </div>
                            <span>Strength</span>
                        </div>
                        <div className="tile-card">
                            <div className="tile-icon-wrap icon-teal">
                                <Flower size={24} />
                            </div>
                            <span>Wellbeing</span>
                        </div>
                        <div className="tile-card">
                            <div className="tile-icon-wrap icon-purple">
                                <CornerDownRight size={24} />
                            </div>
                            <span>Remove Obstacles</span>
                        </div>
                        <div className="tile-card">
                            <div className="tile-icon-wrap icon-orange">
                                <Activity size={24} />
                            </div>
                            <span>Health</span>
                        </div>
                    </div>
                </section>

                {/* Browse by Chakras */}
                <section className="section-container">
                    <h3 className="section-title">Browse by Chakras</h3>
                    <div className="horizontal-scroll">
                        <div className="scroll-card wide-card">
                            <div className="card-image-box img-chakra-orange">
                                <div className="card-overlay-text">
                                    <h4>LIFE FORCE ENERGY</h4>
                                    <p>(Muladhar Chakra)</p>
                                </div>
                            </div>
                            <h4>Life Force Energy (Muladhar...</h4>
                            <p>30 Mins</p>
                        </div>
                        <div className="scroll-card wide-card">
                            <div className="card-image-box img-chakra-blue">
                                <div className="card-overlay-text">
                                    <h4>CALMNESS & TRANQUILITY</h4>
                                    <p>(Svadhishthana Chakra)</p>
                                </div>
                            </div>
                            <h4>Calmness & Tranquility (Svadhis...</h4>
                            <p>32 Mins</p>
                        </div>
                        <div className="scroll-card wide-card">
                            <div className="card-image-box img-chakra-yellow">
                                <div className="card-overlay-text">
                                    <h4>POWER & TRANSFORMATION</h4>
                                    <p>(Manipura Chakra)</p>
                                </div>
                            </div>
                            <h4>Power & Transformation</h4>
                            <p>29 Mins</p>
                        </div>
                    </div>
                </section>

                {/* Discover */}
                <section className="section-container">
                    <h3 className="section-title">Discover</h3>
                    <div className="grid-2-col">
                        <div className="tile-card large-icon">
                            <div className="tile-icon-left icon-orange-grad">
                                <Layers size={24} />
                            </div>
                            <span>Playlist</span>
                        </div>
                        <div className="tile-card large-icon">
                            <div className="tile-icon-left icon-orange-grad">
                                <Layers size={24} />
                            </div>
                            <span>Collections</span>
                        </div>
                        <div className="tile-card large-icon">
                            <div className="tile-icon-left icon-purple-grad">
                                <Music size={24} />
                            </div>
                            <span>Music</span>
                        </div>
                        <div className="tile-card large-icon">
                            <div className="tile-icon-left icon-purple-grad">
                                <Hand size={24} />
                            </div>
                            <span>Mudras</span>
                        </div>
                        <div className="tile-card large-icon">
                            <div className="tile-icon-left icon-pink-grad">
                                <Sun size={24} />
                            </div>
                            <span>Meditations</span>
                        </div>
                    </div>
                </section>

                <div className="spacer-bottom"></div>
            </main>

            <BottomNavigation />
        </div>
    );
}

// Custom simple Peace icon since lucide might not have a perfect match easily accessible
const PeaceIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <path d="M12 2v20" />
        <path d="M12 12l8.5 8.5" />
        <path d="M12 12L3.5 20.5" />
    </svg>
);

export default ExplorePage;
