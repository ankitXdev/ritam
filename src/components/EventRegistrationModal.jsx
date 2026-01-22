import React from 'react';
import { X, Calendar, Share, Video, ChevronLeft } from 'lucide-react';
import '../App.css'; // Ensure we have styles

const EventRegistrationModal = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="event-modal-content" onClick={e => e.stopPropagation()}>
                {/* Back/Close Button */}
                <button className="btn-modal-back" onClick={onClose}>
                    <ChevronLeft size={24} color="white" />
                </button>

                {/* Hero Image */}
                <div className="event-modal-hero">
                    {/* We could use an img tag here if we had the asset, for now CSS gradient matches the aesthetic */}
                </div>

                <div className="event-content-padding">
                    {/* Badge */}
                    <div className="event-modal-badge">
                        <Calendar size={14} className="mr-1" color="black" />
                        <span>Mon - Sun</span>
                    </div>

                    <h2 className="event-modal-title">Daily Meditation Drop In - Evening - Begins Today</h2>

                    <p className="event-modal-desc">
                        Step into stillness with our daily 30-minute drop-in meditation, open every day from Monday to Sunday.
                    </p>

                    <div className="event-modal-time">
                        <div className="event-time-row">
                            <span>6:30 PM PT</span>
                            <span className="time-sep">|</span>
                            <span>9:30 PM ET</span>
                            <span className="time-sep">|</span>
                        </div>
                        <div className="event-time-row">
                            <span>8:00 AM IST</span>
                            <span className="time-sep">•</span>
                            <span>30 mins</span>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="event-action-row">
                        <button className="btn-outline-purple flex-1">
                            Add to Calendar
                        </button>
                        <button className="btn-icon-purple">
                            <Share size={20} />
                        </button>
                    </div>

                    {/* Main CTA */}
                    <button className="btn-primary-purple-large">
                        <Video size={24} className="mr-2" style={{ display: 'inline' }} />
                        Join Now
                    </button>
                </div>
            </div>
        </div>
    );
};

export default EventRegistrationModal;
