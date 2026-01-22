import React, { useState, useRef, useEffect } from 'react';
import { Menu, Bell, Search, ChevronDown, Calendar, ArrowRight, X, Plus, Users, ChevronLeft, ChevronRight } from 'lucide-react';
import BottomNavigation from '../components/BottomNavigation';
import Sidebar from '../components/Sidebar';
import TiltCardGrid from '../components/TiltCardGrid';
import EventRegistrationModal from '../components/EventRegistrationModal';
import logo from '../assets/ritam_logo.jpg';
import '../App.css';

function HomePage() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isStreakExpanded, setIsStreakExpanded] = useState(false);
    const [isEventModalOpen, setIsEventModalOpen] = useState(false);
    const [currentStreak, setCurrentStreak] = useState(9); // Simulating 10 day streak

    const scrollContainerRef = useRef(null);
    const scrollIntervalRef = useRef(null);

    const startAutoScroll = () => {
        // Clear any existing interval first
        if (scrollIntervalRef.current) clearInterval(scrollIntervalRef.current);

        scrollIntervalRef.current = setInterval(() => {
            if (scrollContainerRef.current) {
                const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
                // If we are at the end, scroll back to start
                if (scrollLeft + clientWidth >= scrollWidth - 10) {
                    scrollContainerRef.current.scrollTo({ left: 0, behavior: 'smooth' });
                } else {
                    // Scroll right by card width (approx 85% of screen width or 300px)
                    scrollContainerRef.current.scrollBy({ left: 300, behavior: 'smooth' });
                }
            }
        }, 5000); // 5 seconds
    };

    const resetAutoScroll = () => {
        if (scrollIntervalRef.current) clearInterval(scrollIntervalRef.current);
        startAutoScroll();
    };

    // Auto-scroll logic initialization
    useEffect(() => {
        startAutoScroll();
        return () => {
            if (scrollIntervalRef.current) clearInterval(scrollIntervalRef.current);
        };
    }, []);

    const scrollLeft = () => {
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollBy({ left: -300, behavior: 'smooth' });
        }
        resetAutoScroll(); // Reset timer on manual interaction
    };

    const scrollRight = () => {
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollBy({ left: 300, behavior: 'smooth' });
        }
        resetAutoScroll(); // Reset timer on manual interaction
    };

    return (
        <div className="app home-page">
            <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
            {/* Header */}
            <header className="home-header">
                <div className="header-left">
                    <button className="btn-icon" onClick={() => setIsSidebarOpen(true)}>
                        <Menu size={28} color="white" />
                    </button>
                </div>
                <div className="header-center" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <img src={logo} alt="Ritam Logo" style={{ height: '32px', width: 'auto', borderRadius: '50%' }} />
                    <h1 className="logo-script" style={{ margin: 0, fontSize: '1.8rem' }}>Ritam</h1>
                </div>
                <div className="header-right">
                    <Bell size={24} color="white" className="header-icon" />
                    <Search size={24} color="white" className="header-icon" />
                </div>
            </header>

            <main className="home-content">
                {/* Greeting Section */}
                <section className="greeting-section">
                    <div className="greeting-text">
                        <h2>Good Evening</h2>
                        <h2>Ankit</h2>
                    </div>
                    <div className="user-status-ring">
                        <div className="ring-content">
                            <span>A</span>
                            <span className="badge-new">New</span>
                        </div>
                        {/* SVG Ring simplified representation */}
                        <svg className="progress-ring" width="60" height="60">
                            <circle stroke="rgba(255,255,255,0.2)" strokeWidth="4" fill="transparent" r="26" cx="30" cy="30" />
                            <circle stroke="#fbbf24" strokeWidth="4" strokeDasharray="100 100" strokeDashoffset="40" fill="transparent" r="26" cx="30" cy="30" />
                        </svg>
                    </div>
                </section>

                {/* Streak Card */}
                {/* Streak Card */}
                <div className="card-container streak-card">
                    <div
                        className="streak-header"
                        onClick={() => setIsStreakExpanded(!isStreakExpanded)}
                        style={{ cursor: 'pointer' }}
                    >
                        <span className="badge-streak">STREAK</span>
                        <ChevronDown
                            size={20}
                            color="rgba(255,255,255,0.7)"
                            style={{
                                transition: 'transform 0.3s ease',
                                transform: isStreakExpanded ? 'rotate(180deg)' : 'rotate(0deg)'
                            }}
                        />
                    </div>
                    <h3>10 Days. One Tree.</h3>
                    <p>Meditate for 10 consecutive days, and we'll plant a tree on your behalf.</p>
                    <p className="streak-subtext">Your inner journey now creates real-world impact.</p>

                    {/* SVG Path Visualization */}
                    {/* SVG Path Visualization */}
                    <div className={`streak-path-container ${isStreakExpanded ? 'expanded' : ''}`}>
                        <svg viewBox="0 -60 360 300" className="streak-svg" preserveAspectRatio="xMidYMid meet">
                            <defs>
                                <linearGradient id="streakPathGradient" x1="0%" y1="100%" x2="0%" y2="0%">
                                    <stop offset="0%" stopColor="#f59e0b" />
                                    <stop offset="50%" stopColor="#c084fc" />
                                    <stop offset="100%" stopColor="#60a5fa" />
                                </linearGradient>
                                <linearGradient id="streakTreeGradient" x1="0%" y1="100%" x2="0%" y2="0%">
                                    <stop offset="0%" stopColor="#fbbf24" />
                                    <stop offset="100%" stopColor="#f472b6" />
                                </linearGradient>
                            </defs>

                            {/* Winding Path */}
                            <path
                                d="M 300 190 L 60 190 C 20 190, 20 135, 60 135 L 300 135 C 340 135, 340 80, 300 80 L 60 80"
                                fill="none"
                                stroke="url(#streakPathGradient)"
                                strokeWidth="10"
                                strokeLinecap="round"
                            />

                            {/* Steps - Bottom Row (Right to Left) */}
                            {/* Start Node */}
                            <g transform="translate(300, 190)">
                                <circle cx="0" cy="0" r="12" fill="#4c1d95" stroke="white" strokeWidth="2" />
                                <circle cx="0" cy="0" r="6" fill="white" />
                                <text x="0" y="30" textAnchor="middle" fill="white" fontSize="12" fontWeight="600">Start</text>
                            </g>

                            {/* Node 2 */}
                            <g transform="translate(220, 190)">
                                <circle cx="0" cy="0" r="10" fill="#5b21b6" stroke="rgba(255,255,255,0.5)" strokeWidth="2" />
                                <text x="0" y="0" dominantBaseline="central" textAnchor="middle" fill="white" fontSize="10" fontWeight="600">2</text>
                            </g>

                            {/* Node 3 */}
                            <g transform="translate(140, 190)">
                                <circle cx="0" cy="0" r="10" fill="#5b21b6" stroke="rgba(255,255,255,0.5)" strokeWidth="2" />
                                <text x="0" y="0" dominantBaseline="central" textAnchor="middle" fill="white" fontSize="10" fontWeight="600">3</text>
                            </g>

                            {/* Node 4 */}
                            <g transform="translate(60, 190)">
                                <circle cx="0" cy="0" r="10" fill="#5b21b6" stroke="rgba(255,255,255,0.5)" strokeWidth="2" />
                                <text x="0" y="0" dominantBaseline="central" textAnchor="middle" fill="white" fontSize="10" fontWeight="600">4</text>
                            </g>

                            {/* Middle Row (Left to Right) */}
                            {/* Node 5 */}
                            <g transform="translate(60, 135)">
                                <circle cx="0" cy="0" r="10" fill="#6d28d9" stroke="rgba(255,255,255,0.5)" strokeWidth="2" />
                                <text x="0" y="0" dominantBaseline="central" textAnchor="middle" fill="white" fontSize="10" fontWeight="600">5</text>
                            </g>

                            {/* Node 6 */}
                            <g transform="translate(140, 135)">
                                <circle cx="0" cy="0" r="10" fill="#6d28d9" stroke="rgba(255,255,255,0.5)" strokeWidth="2" />
                                <text x="0" y="0" dominantBaseline="central" textAnchor="middle" fill="white" fontSize="10" fontWeight="600">6</text>
                            </g>

                            {/* Node 7 */}
                            <g transform="translate(220, 135)">
                                <circle cx="0" cy="0" r="10" fill="#6d28d9" stroke="rgba(255,255,255,0.5)" strokeWidth="2" />
                                <text x="0" y="0" dominantBaseline="central" textAnchor="middle" fill="white" fontSize="10" fontWeight="600">7</text>
                            </g>

                            {/* Top Row (Right to Left) */}
                            {/* Node 8 */}
                            <g transform="translate(300, 80)">
                                <circle cx="0" cy="0" r="10" fill="#7c3aed" stroke="rgba(255,255,255,0.5)" strokeWidth="2" />
                                <text x="0" y="0" dominantBaseline="central" textAnchor="middle" fill="white" fontSize="10" fontWeight="600">8</text>
                            </g>

                            {/* Node 9 */}
                            <g transform="translate(220, 80)">
                                <circle cx="0" cy="0" r="10" fill="#7c3aed" stroke="rgba(255,255,255,0.5)" strokeWidth="2" />
                                <text x="0" y="0" dominantBaseline="central" textAnchor="middle" fill="white" fontSize="10" fontWeight="600">9</text>
                            </g>

                            {/* Node 10 */}
                            <g transform="translate(140, 80)">
                                <circle cx="0" cy="0" r="10" fill="#7c3aed" stroke="rgba(255,255,255,0.5)" strokeWidth="2" />
                                <text x="0" y="0" dominantBaseline="central" textAnchor="middle" fill="white" fontSize="10" fontWeight="600">10</text>
                            </g>

                            {/* Tree Icon Area */}
                            <g transform="translate(60, 80)">
                                {/* Tree Image */}
                                <image
                                    href="/tree_icon_transparent.png"
                                    x="-65"
                                    y="-130"
                                    width="130"
                                    height="130"
                                    preserveAspectRatio="xMidYMid meet"
                                    className={currentStreak >= 10 ? "tree-glow-animate" : ""}
                                />
                            </g>
                        </svg>
                    </div>
                </div>

                {/* Animated Feature Cards */}
                <TiltCardGrid />

                {/* Upcoming Events */}
                <section className="section-container">
                    <h3 className="section-title">Upcoming Events</h3>

                    <div className="card-container event-card white-card">
                        <div className="event-badge">
                            <Calendar size={14} />
                            <span>Mon - Sun</span>
                        </div>
                        <h3>Daily Meditation Drop In - Evening - Begins 22nd Jan</h3>
                        <p className="event-desc">Step into stillness with our daily 30-minute drop-in meditation, open every day from Monday to Sunday.</p>

                        <div className="event-details">
                            <div className="time-info">
                                <p>6:30 PM PT | 9:30 PM ET | 8:00 AM IST • 30 mins</p>
                            </div>
                            <div className="event-image-circle">
                                {/* Placeholder for event illustration */}
                                <div className="circle-placeholder sunset-gradient"></div>
                            </div>
                        </div>

                        <button className="btn-register" onClick={() => setIsEventModalOpen(true)}>Register Now</button>
                    </div>


                </section>

                {/* Today's Recommendation */}
                <section className="section-container">
                    <div className="section-header-row" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                        <h3 className="section-title" style={{ marginBottom: 0 }}>Today's Recommendation</h3>
                        <div className="scroll-controls" style={{ display: 'flex', gap: '8px' }}>
                            <button onClick={scrollLeft} className="btn-icon-small" style={{ background: 'rgba(255,255,255,0.1)', border: 'none', borderRadius: '50%', width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: 'white' }}>
                                <ChevronLeft size={20} />
                            </button>
                            <button onClick={scrollRight} className="btn-icon-small" style={{ background: 'rgba(255,255,255,0.1)', border: 'none', borderRadius: '50%', width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: 'white' }}>
                                <ChevronRight size={20} />
                            </button>
                        </div>
                    </div>
                    <div className="recommendation-scroll-container" ref={scrollContainerRef}>
                        {/* Original Card: Beginnner's Journey */}
                        <div className="card-container rec-card purple-gradient-img">
                            <button className="btn-close-card">
                                <X size={16} />
                            </button>
                            <div className="rec-content">
                                <h4 className="script-subtitle">The Beginner's</h4>
                                <h3>Meditation Journey</h3>
                                <p className="rec-status">You're on Day 1</p>
                                <div className="progress-dots">
                                    <span className="dot active"></span>
                                    <span className="dot"></span>
                                    <span className="dot"></span>
                                    <span className="dot"></span>
                                </div>
                            </div>
                            <button className="btn-continue-white">Continue</button>
                        </div>

                        {/* Card 2: Better Sleep */}
                        <div className="card-container rec-card sleep-card">
                            <button className="btn-close-card">
                                <X size={16} />
                            </button>
                            {/* Decorative Moon */}
                            <div className="moon-glow"></div>
                            <div className="moon-crescent-mask"></div>

                            <div className="rec-content">
                                <h4 className="script-subtitle">Better Sleep</h4>
                                <h3>in 5 Days</h3>
                                <p className="rec-status">Relax, unwind, and sleep better in just 5 days.</p>
                            </div>
                            <button className="btn-continue-white">Join</button>
                        </div>

                        {/* Card 3: Stress Relief */}
                        <div className="card-container rec-card stress-card">
                            <button className="btn-close-card">
                                <X size={16} />
                            </button>
                            {/* Decorative Lotus Glow */}
                            <div className="lotus-bg"></div>

                            <div className="rec-content">
                                <h4 className="script-subtitle">Stress & Anxiety</h4>
                                <h3>Relief Journey</h3>
                                <p className="rec-status">Release stress and anxiety in just 5 days start today.</p>
                            </div>
                            <button className="btn-continue-white">Join</button>
                        </div>

                        {/* Card 4: Surrender & Guidance (Track) */}
                        <div className="card-container rec-card track-card">
                            <div className="track-info">
                                <h3 className="track-title">Surrender & Guidance</h3>
                                <p className="track-sub">Sacred Sound • Guru Paduka Stotram</p>
                                <div className="track-stats">
                                    <Users size={12} /> 1069 Meditators
                                </div>
                            </div>
                            <div className="track-thumb pink-box">
                                <div className="track-overlay-text">
                                    Surrender &<br />Guidance
                                </div>
                            </div>
                        </div>

                        {/* Card 5: Relax and Let Go (Track) */}
                        <div className="card-container rec-card track-card">
                            <div className="track-info">
                                <h3 className="track-title">Relax and Let Go</h3>
                                <p className="track-sub">Meditation • 1069 Meditators</p>
                            </div>
                            <div className="track-thumb blue-box">
                                <div className="track-overlay-text">
                                    Relax &<br />Let Go
                                </div>
                            </div>
                        </div>

                    </div>
                </section>



                {/* Shortcuts */}
                <section className="section-container">
                    <h3 className="section-title">My Shortcuts</h3>
                    <div className="card-container shortcut-card">
                        <div className="add-circle">
                            <Plus size={32} color="#f59e0b" />
                        </div>
                        <div className="shortcut-text">
                            <h4>Add to Shortcut</h4>
                            <p>Choose the playlist or individual tracks that you want to see on your dashboard.</p>
                        </div>
                    </div>
                </section>

                {/* Routine */}
                <section className="section-container">
                    <h3 className="section-title">Routine</h3>
                    <div className="card-container routine-card">
                        <h3>Customize Your Routine</h3>
                        <p>Mix meditation, sound bath, chimes, and silence to build your own flow.</p>

                        <div className="routine-circles">
                            <div className="r-circle r1"></div>
                            <div className="r-circle r2"></div>
                            <div className="r-circle r3"></div>
                            <div className="r-circle r4"><Plus size={20} /></div>
                        </div>

                        <button className="btn-create-routine">+ Create</button>
                    </div>
                </section>

                {/* Bottom padding for fixed nav */}
                <div className="spacer-bottom"></div>
            </main>

            <BottomNavigation />
            <EventRegistrationModal isOpen={isEventModalOpen} onClose={() => setIsEventModalOpen(false)} />
        </div>
    );
}

export default HomePage;
