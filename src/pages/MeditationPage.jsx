import React, { useState, useEffect } from 'react';
import { Menu, Search, Loader2 } from 'lucide-react';
import BottomNavigation from '../components/BottomNavigation';
import Sidebar from '../components/Sidebar';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import { useAudio } from '../context/AudioContext';
import '../App.css';

function MeditationPage() {
    const { playTrack } = useAudio();
    const [activeFilter, setActiveFilter] = useState('All');
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [meditations, setMeditations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');

    const filters = ['All', 'Popular', 'Beginners', 'Advanced', 'Sleep', 'Anxiety'];

    useEffect(() => {
        const fetchMeditations = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, "meditations"));
                const toolsData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                setMeditations(toolsData);
            } catch (error) {
                console.error("Error fetching meditations:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchMeditations();
    }, []);

    const filteredTools = meditations.filter(tool => {
        const matchesFilter = activeFilter === 'All' || (tool.categories && tool.categories.includes(activeFilter));
        const matchesSearch = tool.title.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesFilter && matchesSearch;
    });

    return (
        <div className="app meditation-page">
            <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
            {/* Header */}
            <header className="meditation-header">
                <button className="btn-icon" onClick={() => setIsSidebarOpen(true)}>
                    <Menu size={28} color="white" />
                </button>
                <div className="search-bar">
                    <Search size={20} className="search-icon" />
                    <input 
                        type="text" 
                        placeholder="Search" 
                        className="search-input" 
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
            </header>

            <main className="meditation-content">
                {/* Recommended Section */}
                <section className="section-container">
                    <h3 className="section-title">Recommended</h3>
                    <div className="recommended-card">
                        <div className="recommended-text">
                            <h2>हिंदी ध्यान</h2>
                        </div>
                    </div>
                </section>

                {/* Collections Section */}
                <section className="section-container">
                    <h3 className="section-title">Collections</h3>
                    <div className="horizontal-scroll">
                        <div className="collection-card col-blue">
                            <div className="col-overlay">
                                <h3>De-Stress</h3>
                            </div>
                        </div>
                        <div className="collection-card col-teal">
                            <div className="col-overlay">
                                <h3>Quick<br /><span style={{ fontSize: '0.9em', letterSpacing: '2px' }}>FIX</span></h3>
                            </div>
                        </div>
                        <div className="collection-card col-purple">
                            <div className="col-overlay">
                                <h3>Deep<br />Sleep</h3>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Filters */}
                <section className="section-container">
                    <div className="filters-scroll">
                        {filters.map((filter) => (
                            <button
                                key={filter}
                                className={`filter-pill ${activeFilter === filter ? 'active' : ''}`}
                                onClick={() => setActiveFilter(filter)}
                            >
                                {filter}
                            </button>
                        ))}
                    </div>
                    <p className="meditation-instruction">
                        Tap play, close your eyes and let the instructions guide you into a deep, meditative, thoughtless state.
                    </p>
                </section>

                {/* Meditation Grid */}
                <section className="section-container">
                    {loading ? (
                        <div style={{ display: 'flex', justifyContent: 'center', padding: '40px' }}>
                            <Loader2 className="animate-spin" size={32} color="white" />
                        </div>
                    ) : filteredTools.length === 0 ? (
                        <div style={{ textAlign: 'center', padding: '40px', color: 'rgba(255,255,255,0.6)' }}>
                            <p>No meditations found.</p>
                        </div>
                    ) : (
                        <div className="meditation-grid">
                            {filteredTools.map((tool) => (
                                <div 
                                    className="meditation-grid-card" 
                                    key={tool.id}
                                    onClick={() => playTrack({
                                        id: tool.id,
                                        title: tool.title,
                                        subtitle: tool.subtitle || 'Guided Meditation',
                                        audioUrl: tool.audioUrl || 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3', // Fallback for testing
                                        imageUrl: tool.imageUrl
                                    })}
                                    style={{ cursor: 'pointer' }}
                                >
                                    <div className={`grid-card-bg ${tool.colorClass}`}></div>
                                    <div className="grid-card-content">
                                        <span className="time-badge">{tool.time}</span>
                                        <h4 className="grid-card-title">{tool.title}</h4>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </section>

                <div className="spacer-bottom"></div>
            </main>

            <BottomNavigation />
        </div>
    );
}

export default MeditationPage;

