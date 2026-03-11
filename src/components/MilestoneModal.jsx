import React from 'react';
import { X, TreePine, Sparkles } from 'lucide-react';
import '../App.css';

function MilestoneModal({ isOpen, onClose, milestone }) {
    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="milestone-modal-content">
                <button className="btn-close-modal" onClick={onClose}>
                    <X size={24} color="#6d28d9" />
                </button>
                
                <div className="milestone-icon-wrap">
                    <TreePine size={64} className="milestone-tree-icon" />
                    <Sparkles size={32} className="milestone-sparkle s1" />
                    <Sparkles size={24} className="milestone-sparkle s2" />
                </div>

                <h2 className="milestone-title">Streak Milestone!</h2>
                <p className="milestone-streak-num">{milestone} Days</p>
                
                <div className="milestone-message">
                    <h3>You've planted a tree! 🌿</h3>
                    <p>By staying consistent for 10 days, you've helped us contribute to global reforestation. Your inner peace is now creating real-world change.</p>
                </div>

                <button className="btn-meditate-now" onClick={onClose}>
                    Keep Growing
                </button>
            </div>
        </div>
    );
}

export default MilestoneModal;
