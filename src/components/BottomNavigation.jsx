import React from 'react';
import { Home, Search, Flower, Music, User } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import '../App.css';

const BottomNavigation = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const isActive = (path) => location.pathname === path;

    return (
        <div className="bottom-nav">
            <div
                className={`nav-item ${isActive('/home') ? 'active' : ''}`}
                onClick={() => navigate('/home')}
            >
                <Home size={24} />
                <span>Home</span>
            </div>

            <div
                className={`nav-item ${isActive('/explore') ? 'active' : ''}`}
                onClick={() => navigate('/explore')}
            >
                <Search size={24} />
                <span>Explore</span>
            </div>

            <div
                className={`nav-item center-item ${isActive('/meditation') ? 'active' : ''}`}
                onClick={() => navigate('/meditation')}
            >
                <div className="lotus-icon-wrapper">
                    <Flower size={28} />
                </div>
                <span>Meditation</span>
            </div>

            <div
                className={`nav-item ${isActive('/sacred-sounds') ? 'active' : ''}`}
                onClick={() => navigate('/sacred-sounds')}
            >
                <div className="om-icon-wrapper" style={{ background: isActive('/sacred-sounds') ? '#f3e8ff' : 'transparent', borderRadius: '50%', width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <span className="om-icon" style={{ fontSize: '20px', color: isActive('/sacred-sounds') ? '#4c1d95' : 'white' }}>ॐ</span>
                </div>
                <span>Sacred Sounds</span>
            </div>

            <div
                className={`nav-item ${isActive('/profile') ? 'active' : ''}`}
                onClick={() => navigate('/profile')}
            >
                <User size={24} />
                <span>Profile</span>
            </div>
        </div>
    );
};

export default BottomNavigation;
