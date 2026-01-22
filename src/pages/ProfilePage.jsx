import React, { useState } from 'react';
import { Menu, ChevronRight, BarChart2, Calendar, Award, Rss, FileText, PlusCircle, Clock, Gift, Users, Flag, Bell, Sticker, PlaySquare, Heart } from 'lucide-react';
import BottomNavigation from '../components/BottomNavigation';
import Sidebar from '../components/Sidebar';
import '../App.css';

function ProfilePage() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    return (
        <div className="app profile-page">
            <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
            <header className="home-header">
                <div className="header-left">
                    <button className="btn-icon" onClick={() => setIsSidebarOpen(true)}>
                        <Menu size={28} color="white" />
                    </button>
                </div>
                <div className="header-center">
                    <h1 className="page-title">Profile</h1>
                </div>
                <div className="header-right" style={{ width: '28px' }}></div>
            </header>

            <main className="profile-content">
                {/* Invite Card */}
                <section className="section-container">
                    <div className="invite-card">
                        <div className="invite-content">
                            <h2 className="invite-title">Think<br />Someone<br />Would Love<br />This?</h2>
                            <p className="invite-desc">
                                Invite a friend to meditate and transform your lives together!
                            </p>
                            <div className="invite-footer">
                                <span className="joined-count">0 Joined</span>
                                <button className="btn-invite">Invite</button>
                            </div>
                        </div>
                        <div className="hearts-decoration">
                            <Heart fill="#fbbf24" stroke="none" size={40} className="heart-1" />
                            <Heart fill="#f59e0b" stroke="none" size={24} className="heart-2" />
                        </div>
                    </div>
                </section>

                {/* Statistics Card */}
                <section className="section-container">
                    <div className="stats-card">
                        <div className="stats-info">
                            <h3>Your Statistics <ChevronRight size={16} inline /></h3>
                            <p>Track your progress. Build a habit.</p>
                        </div>
                        <div className="stats-chart-icon">
                            <div className="chart-circle"></div>
                        </div>
                    </div>
                </section>

                {/* My Playlists */}
                <section className="section-container">
                    <h3 className="section-title">My Playlists</h3>
                    <div className="playlist-card">
                        <div className="playlist-text">
                            <p>Be your own Meditation DJ - choose the meditative tools that suit you and group together for quick and easy access.</p>
                            <button className="btn-create-playlist">+ Create Playlist</button>
                        </div>
                        <div className="playlist-icon-large">
                            <PlaySquare size={48} />
                        </div>
                    </div>
                </section>

                {/* My Journey Grid */}
                <section className="section-container">
                    <h3 className="section-title">My Journey</h3>
                    <div className="tools-grid">
                        <ToolCard icon={<BarChart2 size={28} />} title="Leaderboard" />
                        <ToolCard icon={<Calendar size={28} />} title="Calendar" />
                        <ToolCard icon={<Award size={28} />} title="Badges" />
                        <ToolCard icon={<Rss size={28} />} title="My Feed" />
                        <ToolCard icon={<FileText size={28} />} title="Notes" />
                        <ToolCard icon={<PlusCircle size={28} />} title="Add Sessions" />
                    </div>
                </section>

                {/* My Tools Grid */}
                <section className="section-container">
                    <h3 className="section-title">My Tools</h3>
                    <div className="tools-grid">
                        <ToolCard icon={<Clock size={28} />} title="Reminders" />
                        <ToolCard icon={<Gift size={28} />} title="Surprises" />
                        <ToolCard icon={<Users size={28} />} title="Friends" />
                        <ToolCard icon={<Flag size={28} />} title="Challenges" />
                        <ToolCard icon={<Bell size={28} />} title="Notifications" />
                        <ToolCard icon={<Sticker size={28} />} title="Stickers" />
                    </div>
                </section>

                <div className="spacer-bottom"></div>
            </main>

            <BottomNavigation />
        </div>
    );
}

// Reusable Tool Card Component
const ToolCard = ({ icon, title }) => (
    <div className="tool-grid-card">
        <div className="tool-icon-box gradient-icon">
            {icon}
        </div>
        <span className="tool-title">{title}</span>
    </div>
);

export default ProfilePage;
