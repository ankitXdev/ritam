import React, { useState, useEffect } from 'react';
import { Menu, Search, Loader2 } from 'lucide-react';
import BottomNavigation from '../components/BottomNavigation';
import Sidebar from '../components/Sidebar';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import { useAudio } from '../context/AudioContext';
import '../App.css';

function SacredSoundsPage() {
    const { playTrack } = useAudio();
    const [activeFilter, setActiveFilter] = useState('All');
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [chants, setChants] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');

    const filters = ['All', 'Popular', 'Short', 'Medium', 'Long'];

    useEffect(() => {
        const fetchChants = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, "sacred_sounds"));
                const chantsData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                setChants(chantsData);
            } catch (error) {
                console.error("Error fetching sacred sounds:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchChants();
    }, []);

    const filteredChants = chants.filter(chant => {
        const matchesFilter = activeFilter === 'All' || (chant.categories && chant.categories.includes(activeFilter));
        const matchesSearch = chant.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                              (chant.subtitle && chant.subtitle.toLowerCase().includes(searchQuery.toLowerCase()));
        return matchesFilter && matchesSearch;
    });

    return (
        <div className="app sacred-page">
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
                {/* Top Sections from Screenshot 1 (Placeholders/Generic) */}
                <section className="section-container">
                    <h3 className="section-title">Recommended</h3>
                    <div className="horizontal-scroll">
                        <div className="placeholder-card"></div>
                        <div className="placeholder-card"></div>
                    </div>
                </section>

                <section className="section-container">
                    <h3 className="section-title">Collections</h3>
                    <div className="horizontal-scroll">
                        <div className="placeholder-card"></div>
                        <div className="placeholder-card"></div>
                    </div>
                </section>

                <section className="section-container">
                    <h3 className="section-title">Music</h3>
                    <div className="horizontal-scroll">
                        <div className="placeholder-card"></div>
                        <div className="placeholder-card"></div>
                    </div>
                </section>


                {/* Main Chants Section from Screenshot 2 */}
                <section className="section-container" style={{ marginTop: '30px' }}>
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

                    <p className="chant-description">
                        Vedic Mantras and Chants are powerful repetitive sound vibrations that allow your mind to dissolve and repose.
                    </p>

                    {loading ? (
                        <div style={{ display: 'flex', justifyContent: 'center', padding: '40px' }}>
                            <Loader2 className="animate-spin" size={32} color="white" />
                        </div>
                    ) : filteredChants.length === 0 ? (
                        <div style={{ textAlign: 'center', padding: '40px', color: 'rgba(255,255,255,0.6)' }}>
                            <p>No sacred sounds found.</p>
                        </div>
                    ) : (
                        <div className="meditation-grid">
                            {filteredChants.map((chant) => (
                                <div 
                                    className="meditation-grid-card" 
                                    key={chant.id}
                                    onClick={() => playTrack({
                                        id: chant.id,
                                        title: chant.title,
                                        subtitle: chant.subtitle || 'Sacred Chant',
                                        audioUrl: chant.audioUrl || 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3', // Fallback for testing
                                        imageUrl: chant.imageUrl
                                    })}
                                    style={{ cursor: 'pointer' }}
                                >
                                    <div className={`grid-card-bg ${chant.colorClass}`}>
                                        {/* Optional: Add decorative overlays here if consistent graphics needed */}
                                    </div>
                                    <div className="grid-card-content center-content">
                                        <span className="time-badge">{chant.time}</span>
                                        <div className="chant-titles">
                                            <h4 className="chant-main-title">{chant.title}</h4>
                                            <p className="chant-subtitle">{chant.subtitle}</p>
                                        </div>
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

export default SacredSoundsPage;

