import React from 'react';
import { Bell } from 'lucide-react';

const NotificationModal = ({ isOpen, onClose, onAllow }) => {
    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <div className="bell-icon-wrapper">
                    <Bell size={64} className="bell-icon-gradient" />
                    <div className="bell-dot"></div>
                </div>

                <h2 className="modal-title">Allow Notification?</h2>
                <p className="modal-text">
                    Occasionally we'd like to send you notifications for personalized recommendations and new meditations is that ok?
                </p>

                <button className="btn-modal-primary" onClick={onAllow}>
                    Turn on Notifications
                </button>

                <button className="btn-modal-skip" onClick={onClose}>
                    Skip
                </button>
            </div>
        </div>
    );
};

export default NotificationModal;
