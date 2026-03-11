import React, { useState } from 'react';
import { Play, Pause, X, ChevronUp, ChevronDown, Volume2, SkipBack, SkipForward } from 'lucide-react';
import { useAudio } from '../context/AudioContext';
import '../App.css';

function GlobalAudioPlayer() {
    const { currentTrack, isPlaying, togglePlay, progress, duration, seekTo, volume, setVolume } = useAudio();
    const [isMinimized, setIsMinimized] = useState(false);

    if (!currentTrack) return null;

    const formatTime = (time) => {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes}:${seconds.toString().padStart(2, '0')}`;
    };

    return (
        <div className={`global-player ${isMinimized ? 'minimized' : ''}`}>
            {/* Progress Bar (Always top of player) */}
            <div className="player-progress-container" onClick={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const clickedTime = (x / rect.width) * duration;
                seekTo(clickedTime);
            }}>
                <div 
                    className="player-progress-bar" 
                    style={{ width: `${(progress / duration) * 100}%` }}
                ></div>
            </div>

            <div className="player-main-content">
                <div className="player-info" onClick={() => setIsMinimized(!isMinimized)}>
                    <img 
                        src={currentTrack.imageUrl || '/ritam_logo.jpg'} 
                        alt={currentTrack.title} 
                        className="player-thumb"
                    />
                    <div className="player-titles">
                        <h4 className="player-title">{currentTrack.title}</h4>
                        <p className="player-subtitle">{currentTrack.subtitle || 'Meditation'}</p>
                    </div>
                </div>

                <div className="player-controls">
                    <button className="btn-player-icon secondary" onClick={() => seekTo(Math.max(progress - 10, 0))}>
                        <SkipBack size={20} />
                    </button>
                    
                    <button className="btn-player-play" onClick={togglePlay}>
                        {isPlaying ? <Pause size={24} fill="currentColor" /> : <Play size={24} fill="currentColor" />}
                    </button>

                    <button className="btn-player-icon secondary" onClick={() => seekTo(Math.min(progress + 10, duration))}>
                        <SkipForward size={20} />
                    </button>
                </div>

                <div className="player-actions">
                    <div className="volume-control">
                        <Volume2 size={18} />
                        <input 
                            type="range" 
                            min="0" 
                            max="1" 
                            step="0.01" 
                            value={volume} 
                            onChange={(e) => setVolume(parseFloat(e.target.value))}
                            className="volume-slider"
                        />
                    </div>
                    <button className="btn-player-icon" onClick={() => setIsMinimized(!isMinimized)}>
                        {isMinimized ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
                    </button>
                </div>
            </div>

            <div className="player-time-info">
                <span>{formatTime(progress)}</span>
                <span>{formatTime(duration)}</span>
            </div>
        </div>
    );
}

export default GlobalAudioPlayer;
