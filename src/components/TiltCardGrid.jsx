import React from 'react';
import { BookOpen, Activity, Trophy } from 'lucide-react';
import '../App.css';

const TiltCardGrid = () => {
    return (
        <div className="tilt-card-container">
            <div className="tilt-glass-card" style={{ '--r': -15 }} data-text="Wisdom">
                <BookOpen size={40} color="white" strokeWidth={1.5} />
            </div>
            <div className="tilt-glass-card" style={{ '--r': 5 }} data-text="Practice">
                <Activity size={40} color="white" strokeWidth={1.5} />
            </div>
            <div className="tilt-glass-card" style={{ '--r': 25 }} data-text="Rewards">
                <Trophy size={40} color="white" strokeWidth={1.5} />
            </div>
        </div>
    );
};

export default TiltCardGrid;
