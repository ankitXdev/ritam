import React, { useState } from 'react';
import { Menu, Search } from 'lucide-react';
import BottomNavigation from '../components/BottomNavigation';
import Sidebar from '../components/Sidebar';
import '../App.css';

function SacredSoundsPage() {
    const [activeFilter, setActiveFilter] = useState('All');
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const filters = ['All', 'Popular', 'Short', 'Medium', 'Long'];

    const chants = [
        {
            title: "DIVINE ARMOUR",
            subtitle: "Devi Kavacham",
            time: "15 Mins",
            colorClass: "bg-divine-blue"
        },
        {
            title: "The Most Powerful Chant",
            subtitle: "Rudram",
            time: "38 Mins",
            colorClass: "bg-rudram-purple"
        },
        {
            title: "Overall Wellbeing",
            subtitle: "Om Namah Shivaya",
            time: "13 Mins",
            colorClass: "bg-shiva-blue"
        },
        {
            title: "SHARPEN INTELLECT",
            subtitle: "Om Namo Bhagavate Vasudevaya",
            time: "6 Mins",
            colorClass: "bg-krishna-green"
        },
        {
            title: "Surrender & Guidance",
            subtitle: "Guru Paduka Stotram",
            time: "7 Mins",
            colorClass: "bg-guru-pink"
        },
        {
            title: "OVERALL WELLBEING",
            subtitle: "Om Namah Shivaya (Meditative)",
            time: "25 Mins",
            colorClass: "bg-meditative-purple"
        },
        {
            title: "Miraculous Power",
            subtitle: "Hanuman Chalisa",
            time: "9 Mins",
            colorClass: "bg-hanuman-orange"
        },
        {
            title: "Sri Vishnu Sahasranamam",
            subtitle: "Positive Vibrations",
            time: "34 Mins",
            colorClass: "bg-vishnu-purple"
        },
        {
            title: "Blessings of the Sun",
            subtitle: "Sri Aditya Hrudayam",
            time: "6 Mins",
            colorClass: "bg-sun-yellow"
        },
    ];

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
                    <input type="text" placeholder="Search" className="search-input" />
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

                    <div className="meditation-grid">
                        {chants.map((chant, index) => (
                            <div className="meditation-grid-card" key={index}>
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
                </section>

                <div className="spacer-bottom"></div>
            </main>

            <BottomNavigation />
        </div>
    );
}

export default SacredSoundsPage;
