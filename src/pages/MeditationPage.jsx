import React, { useState } from 'react';
import { Menu, Search } from 'lucide-react';
import BottomNavigation from '../components/BottomNavigation';
import Sidebar from '../components/Sidebar';
import '../App.css';

function MeditationPage() {
    const [activeFilter, setActiveFilter] = useState('All');
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const filters = ['All', 'Popular', 'Beginners', 'Advanced', 'Sleep', 'Anxiety'];

    const tools = [
        { title: "Yoga Nidra", time: "20 Mins", colorClass: "img-galaxy-blue" },
        { title: "Transforming Emotions", time: "20 Mins", colorClass: "img-moon-curve" },
        { title: "Panchakosha", time: "17 Mins", colorClass: "img-teal-spiral" },
        { title: "Back to the Source", time: "7 Mins", colorClass: "img-burst-purple" },
        { title: "Journey Within", time: "20 Mins", colorClass: "img-green-lotus" },
        { title: "Hari Om", time: "23 Mins", colorClass: "img-orange-om" },
        { title: "Sound to Silence", time: "21 Mins", colorClass: "img-light-purple-flower" },
        { title: "De-Stress", time: "7 Mins", colorClass: "img-blue-landscape" },
        { title: "Blossom in Your Smile", time: "16 Mins", colorClass: "img-pink-flower" },
        { title: "Aura", time: "27 Mins", colorClass: "img-blue-aura" },
        { title: "Gratitude", time: "15 Mins", colorClass: "img-pink-mandala" },
        { title: "Contentment", time: "20 Mins", colorClass: "img-sunset-orange" },
    ];

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
                    <input type="text" placeholder="Search" className="search-input" />
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
                    <div className="meditation-grid">
                        {tools.map((tool, index) => (
                            <div className="meditation-grid-card" key={index}>
                                <div className={`grid-card-bg ${tool.colorClass}`}></div>
                                <div className="grid-card-content">
                                    <span className="time-badge">{tool.time}</span>
                                    <h4 className="grid-card-title">{tool.title}</h4>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                <div className="spacer-bottom"></div>
            </main>

            <BottomNavigation />
        </div>
    );
}

export default MeditationPage;
