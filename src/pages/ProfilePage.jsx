import React, { useState } from 'react';
import { Menu, ChevronRight, BarChart2, Calendar, Award, Rss, FileText, PlusCircle, Clock, Gift, Users, Flag, Bell, Sticker, PlaySquare, Heart, Camera } from 'lucide-react';
import BottomNavigation from '../components/BottomNavigation';
import Sidebar from '../components/Sidebar';
import { db, auth, storage } from '../firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import '../App.css';

function ProfilePage() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [userData, setUserData] = useState({ name: 'Seeker', photoURL: null });
    const [uploading, setUploading] = useState(false);
    const fileInputRef = React.useRef(null);

    React.useEffect(() => {
        const fetchUser = async () => {
            if (auth.currentUser) {
                const userDoc = await getDoc(doc(db, "users", auth.currentUser.uid));
                if (userDoc.exists()) {
                    const data = userDoc.data();
                    setUserData({
                        name: data.email ? data.email.split('@')[0] : (auth.currentUser.email ? auth.currentUser.email.split('@')[0] : 'Seeker'),
                        photoURL: data.photoURL || auth.currentUser.photoURL || null
                    });
                } else {
                    setUserData({
                        name: auth.currentUser.email ? auth.currentUser.email.split('@')[0] : 'Seeker',
                        photoURL: auth.currentUser.photoURL || null
                    });
                }
            }
        };
        fetchUser();
    }, []);

    const handleImageUpload = async (e) => {
        const file = e.target.files[0];
        if (!file || !auth.currentUser) return;

        setUploading(true);
        try {
            const storageRef = ref(storage, `avatars/${auth.currentUser.uid}`);
            await uploadBytes(storageRef, file);
            const downloadURL = await getDownloadURL(storageRef);

            // Update state
            setUserData(prev => ({ ...prev, photoURL: downloadURL }));

            // Save to Firestore using setDoc with merge to create document if it doesn't exist
            await setDoc(doc(db, "users", auth.currentUser.uid), {
                photoURL: downloadURL,
                email: auth.currentUser.email || ''
            }, { merge: true });
        } catch (error) {
            console.error("Error uploading image: ", error);
        } finally {
            setUploading(false);
        }
    };

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
                {/* Profile Header Block */}
                <section className="profile-header-block section-container" style={{ textAlign: 'center', margin: '20px 0' }}>
                    <div 
                        className="avatar-container" 
                        style={{ position: 'relative', display: 'inline-block', width: '100px', height: '100px', marginBottom: '10px' }}
                        onClick={() => fileInputRef.current.click()}
                    >
                        {userData.photoURL ? (
                            <img 
                                src={userData.photoURL} 
                                alt="Profile" 
                                style={{ width: '100px', height: '100px', borderRadius: '50%', objectFit: 'cover', border: '3px solid #6366f1' }}
                            />
                        ) : (
                            <div style={{ width: '100px', height: '100px', borderRadius: '50%', backgroundColor: '#4f46e5', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '3px solid #6366f1' }}>
                                <span style={{ fontSize: '2rem', color: 'white', fontWeight: 'bold' }}>
                                    {userData.name.charAt(0).toUpperCase()}
                                </span>
                            </div>
                        )}
                        <div style={{ position: 'absolute', bottom: 0, right: 0, backgroundColor: '#fbbf24', borderRadius: '50%', padding: '6px', cursor: 'pointer', display: 'flex' }}>
                            <Camera size={16} color="black" />
                        </div>
                        <input 
                            type="file" 
                            ref={fileInputRef} 
                            onChange={handleImageUpload} 
                            accept="image/*" 
                            style={{ display: 'none' }} 
                        />
                    </div>
                    {uploading && <p style={{ color: '#fbbf24', fontSize: '0.8rem' }}>Uploading...</p>}
                    <h2 style={{ fontSize: '1.5rem', fontWeight: '600', margin: 0 }}>Good Evening, {userData.name}</h2>
                </section>

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
