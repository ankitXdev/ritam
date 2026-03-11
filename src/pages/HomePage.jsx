import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Menu, Bell, Search, ChevronDown, Calendar, ArrowRight, X, Plus, Users, ChevronLeft, ChevronRight } from 'lucide-react';
import BottomNavigation from '../components/BottomNavigation';
import Sidebar from '../components/Sidebar';
import TiltCardGrid from '../components/TiltCardGrid';
import EventRegistrationModal from '../components/EventRegistrationModal';
import logo from '../assets/ritam_logo.jpg';
import { db, auth } from '../firebase';
import { doc, getDoc, collection, getDocs, setDoc } from 'firebase/firestore';
import { updatePlayerStreak } from '../utils/habitUtils';
import MilestoneModal from '../components/MilestoneModal';
import '../App.css';

function HomePage() {
    const navigate = useNavigate();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isStreakExpanded, setIsStreakExpanded] = useState(false);
    const [isEventModalOpen, setIsEventModalOpen] = useState(false);
    const [photoURL, setPhotoURL] = useState(null);
    const [currentStreak, setCurrentStreak] = useState(0); 
    const [isMilestoneModalOpen, setIsMilestoneModalOpen] = useState(false);
    const [recommendedTools, setRecommendedTools] = useState([]);
    const [firstName, setFirstName] = useState("Seeker");

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

    // Recommendation Engine & User Data
    useEffect(() => {
        const fetchUserDataAndRecommendations = async () => {
            if (!auth.currentUser) return;
            try {
                // Fetch User Profile
                const userDoc = await getDoc(doc(db, "users", auth.currentUser.uid));
                let userGoals = ['popular'];
                if (userDoc.exists()) {
                    const data = userDoc.data();
                    if (data.goals && data.goals.length > 0) {
                        userGoals = data.goals;
                    }
                    if (data.photoURL) {
                        setPhotoURL(data.photoURL);
                    }
                    
                    // Improved Name Logic
                    const rawEmail = data.email || auth.currentUser.email || "";
                    const nameFromEmail = rawEmail.split('@')[0] || "";
                    const rawName = data.firstName || nameFromEmail || "Seeker";
                    
                    // Clean up: ankit.sharma -> Ankit
                    const cleanName = rawName.split('.')[0].split('_')[0];
                    setFirstName(cleanName.charAt(0).toUpperCase() + cleanName.slice(1));
                } else if (auth.currentUser.email) {
                    const fallback = auth.currentUser.email.split('@')[0].split('.')[0];
                    setFirstName(fallback.charAt(0).toUpperCase() + fallback.slice(1));
                }

                // Map onboarding goal IDs to content categories
                const goalMap = {
                    'stress': 'Anxiety',
                    'sleep': 'Sleep',
                    'meditation': 'Beginners',
                    'happiness': 'Popular',
                    'popular': 'Popular'
                };
                
                const mappedCategories = userGoals.map(g => goalMap[g]).filter(Boolean);

                // Fetch Meditations
                const medSnapshot = await getDocs(collection(db, "meditations"));
                const allMeds = medSnapshot.docs.map(d => ({id: d.id, ...d.data()}));

                // Score matches
                const scoredMeds = allMeds.map(med => {
                    let score = 0;
                    if (med.categories) {
                        med.categories.forEach(cat => {
                            if (mappedCategories.includes(cat)) score += 2;
                            if (cat === 'Popular') score += 1;
                        });
                    }
                    return { ...med, score };
                });

                scoredMeds.sort((a, b) => b.score - a.score);
                setRecommendedTools(scoredMeds.slice(0, 3)); // Top 3 recommendations

                // Update Streak
                const streakData = await updatePlayerStreak(auth.currentUser.uid);
                if (streakData) {
                    setCurrentStreak(streakData.streak);
                    if (streakData.isNewMilestone) {
                        setIsMilestoneModalOpen(true);
                    }
                }

            } catch (err) {
                console.error("Error fetching data: ", err);
            }
        };

        // Small delay to ensure auth is loaded for this simple architecture
        setTimeout(fetchUserDataAndRecommendations, 1000);
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
                        <h2>{firstName}</h2>
                    </div>
                    <div className="user-status-ring" onClick={() => navigate('/profile')} style={{ cursor: 'pointer' }}>
                        <div className="ring-content">
                            {photoURL ? (
                                <img src={photoURL} alt="User" style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover' }} />
                            ) : (
                                <span>{firstName.charAt(0)}</span>
                            )}
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
                    <h3>{currentStreak} Days. {Math.floor(currentStreak / 10)} Trees.</h3>
                    <p>{currentStreak % 10 === 0 && currentStreak > 0 ? "You've earned a tree! Keep going to plant more." : `Meditate for ${10 - (currentStreak % 10)} more days to plant your next tree.`}</p>
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
                                <circle cx="0" cy="0" r="12" fill={currentStreak >= 1 ? "#fbbf24" : "#4c1d95"} stroke="white" strokeWidth="2" className={currentStreak >= 1 ? "node-active" : ""} />
                                <circle cx="0" cy="0" r="6" fill="white" />
                                <text x="0" y="35" textAnchor="middle" fill="white" fontSize="12" fontWeight="600">Start</text>
                            </g>

                            {/* Node 2 */}
                            <g transform="translate(220, 190)">
                                <circle cx="0" cy="0" r="10" fill={currentStreak >= 2 ? "#fbbf24" : "#5b21b6"} stroke={currentStreak >= 2 ? "white" : "rgba(255,255,255,0.5)"} strokeWidth="2" className={currentStreak >= 2 ? "node-active" : ""} />
                                <text x="0" y="0" dominantBaseline="central" textAnchor="middle" fill={currentStreak >= 2 ? "black" : "white"} fontSize="10" fontWeight="600">2</text>
                            </g>

                            {/* Node 3 */}
                            <g transform="translate(140, 190)">
                                <circle cx="0" cy="0" r="10" fill={currentStreak >= 3 ? "#fbbf24" : "#5b21b6"} stroke={currentStreak >= 3 ? "white" : "rgba(255,255,255,0.5)"} strokeWidth="2" className={currentStreak >= 3 ? "node-active" : ""} />
                                <text x="0" y="0" dominantBaseline="central" textAnchor="middle" fill={currentStreak >= 3 ? "black" : "white"} fontSize="10" fontWeight="600">3</text>
                            </g>

                            {/* Node 4 */}
                            <g transform="translate(60, 190)">
                                <circle cx="0" cy="0" r="10" fill={currentStreak >= 4 ? "#fbbf24" : "#5b21b6"} stroke={currentStreak >= 4 ? "white" : "rgba(255,255,255,0.5)"} strokeWidth="2" className={currentStreak >= 4 ? "node-active" : ""} />
                                <text x="0" y="0" dominantBaseline="central" textAnchor="middle" fill={currentStreak >= 4 ? "black" : "white"} fontSize="10" fontWeight="600">4</text>
                            </g>

                            {/* Middle Row (Left to Right) */}
                            {/* Node 5 */}
                            <g transform="translate(60, 135)">
                                <circle cx="0" cy="0" r="10" fill={currentStreak >= 5 ? "#fbbf24" : "#6d28d9"} stroke={currentStreak >= 5 ? "white" : "rgba(255,255,255,0.5)"} strokeWidth="2" className={currentStreak >= 5 ? "node-active" : ""} />
                                <text x="0" y="0" dominantBaseline="central" textAnchor="middle" fill={currentStreak >= 5 ? "black" : "white"} fontSize="10" fontWeight="600">5</text>
                            </g>

                            {/* Node 6 */}
                            <g transform="translate(140, 135)">
                                <circle cx="0" cy="0" r="10" fill={currentStreak >= 6 ? "#fbbf24" : "#6d28d9"} stroke={currentStreak >= 6 ? "white" : "rgba(255,255,255,0.5)"} strokeWidth="2" className={currentStreak >= 6 ? "node-active" : ""} />
                                <text x="0" y="0" dominantBaseline="central" textAnchor="middle" fill={currentStreak >= 6 ? "black" : "white"} fontSize="10" fontWeight="600">6</text>
                            </g>

                            {/* Node 7 */}
                            <g transform="translate(220, 135)">
                                <circle cx="0" cy="0" r="10" fill={currentStreak >= 7 ? "#fbbf24" : "#6d28d9"} stroke={currentStreak >= 7 ? "white" : "rgba(255,255,255,0.5)"} strokeWidth="2" className={currentStreak >= 7 ? "node-active" : ""} />
                                <text x="0" y="0" dominantBaseline="central" textAnchor="middle" fill={currentStreak >= 7 ? "black" : "white"} fontSize="10" fontWeight="600">7</text>
                            </g>

                            {/* Top Row (Right to Left) */}
                            {/* Node 8 */}
                            <g transform="translate(300, 80)">
                                <circle cx="0" cy="0" r="10" fill={currentStreak >= 8 ? "#fbbf24" : "#7c3aed"} stroke={currentStreak >= 8 ? "white" : "rgba(255,255,255,0.5)"} strokeWidth="2" className={currentStreak >= 8 ? "node-active" : ""} />
                                <text x="0" y="0" dominantBaseline="central" textAnchor="middle" fill={currentStreak >= 8 ? "black" : "white"} fontSize="10" fontWeight="600">8</text>
                            </g>

                            {/* Node 9 */}
                            <g transform="translate(220, 80)">
                                <circle cx="0" cy="0" r="10" fill={currentStreak >= 9 ? "#fbbf24" : "#7c3aed"} stroke={currentStreak >= 9 ? "white" : "rgba(255,255,255,0.5)"} strokeWidth="2" className={currentStreak >= 9 ? "node-active" : ""} />
                                <text x="0" y="0" dominantBaseline="central" textAnchor="middle" fill={currentStreak >= 9 ? "black" : "white"} fontSize="10" fontWeight="600">9</text>
                            </g>

                            {/* Node 10 */}
                            <g transform="translate(140, 80)">
                                <circle cx="0" cy="0" r="10" fill={currentStreak >= 10 ? "#fbbf24" : "#7c3aed"} stroke={currentStreak >= 10 ? "white" : "rgba(255,255,255,0.5)"} strokeWidth="2" className={currentStreak >= 10 ? "node-active" : ""} />
                                <text x="0" y="0" dominantBaseline="central" textAnchor="middle" fill={currentStreak >= 10 ? "black" : "white"} fontSize="10" fontWeight="600">10</text>
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

                        {/* Recommended Dynamic Cards */}
                        {recommendedTools.map((tool) => (
                            <div key={tool.id} className="card-container rec-card track-card">
                                <div className="track-info">
                                    <h3 className="track-title">{tool.title}</h3>
                                    <p className="track-sub">Meditation • {tool.time}</p>
                                    <div className="track-stats">
                                        <Users size={12} /> {(Math.random() * 2000 + 500).toFixed(0)} Meditators
                                    </div>
                                </div>
                                <div className={`track-thumb ${tool.colorClass?.includes('pink') ? 'pink-box' : 'blue-box'}`}>
                                    <div className="track-overlay-text">
                                        Personalized<br />For You
                                    </div>
                                </div>
                            </div>
                        ))}

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
            <MilestoneModal 
                isOpen={isMilestoneModalOpen} 
                onClose={() => setIsMilestoneModalOpen(false)} 
                milestone={currentStreak}
            />
        </div>
    );
}

export default HomePage;
