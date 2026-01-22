import React, { useEffect } from 'react';
import { PlayCircle, Radio, Globe, SlidersHorizontal, Download, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import '../App.css';

const Sidebar = ({ isOpen, onClose }) => {
    const navigate = useNavigate();

    // Prevent scrolling when sidebar is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
    }, [isOpen]);

    const handleSignOut = () => {
        // Add sign out logic here (clear auth, etc.) if needed
        navigate('/login');
    };

    return (
        <>
            {/* Backdrop */}
            <div
                className={`sidebar-backdrop ${isOpen ? 'open' : ''}`}
                onClick={onClose}
            ></div>

            {/* Sidebar */}
            <div className={`sidebar-container ${isOpen ? 'open' : ''}`}>
                {/* Top spacer or header area if needed */}
                <div style={{ marginBottom: '60px' }}></div>

                <div className="sidebar-menu">
                    <div className="menu-item" onClick={() => { navigate('/wisdom-library'); onClose(); }}>
                        <PlayCircle size={24} />
                        <span>Wisdom Library</span>
                    </div>
                    <div className="menu-item" onClick={() => { navigate('/events'); onClose(); }}>
                        <Radio size={24} />
                        <span>Upcoming Events</span>
                    </div>
                    <div className="menu-item" onClick={() => { navigate('/tour'); onClose(); }}>
                        <Globe size={24} />
                        <span>Tour Schedule</span>
                    </div>
                    <div className="menu-item" onClick={() => { navigate('/settings'); onClose(); }}>
                        <SlidersHorizontal size={24} />
                        <span>Settings</span>
                    </div>
                    <div className="menu-item" onClick={() => { navigate('/downloads'); onClose(); }}>
                        <Download size={24} />
                        <span>Downloads</span>
                    </div>

                    <div className="menu-item mt-auto" onClick={handleSignOut}>
                        <LogOut size={24} />
                        <span className="sign-out-text">Sign Out</span>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Sidebar;
