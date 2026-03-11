import React, { createContext, useContext, useState, useRef, useEffect } from 'react';
import { auth } from '../firebase';
import { updatePlayerStreak } from '../utils/habitUtils';

const AudioContext = createContext();

export const useAudio = () => {
    const context = useContext(AudioContext);
    if (!context) {
        throw new Error('useAudio must be used within an AudioProvider');
    }
    return context;
};

export const AudioProvider = ({ children }) => {
    const [currentTrack, setCurrentTrack] = useState(null); // { id, title, subtitle, audioUrl, imageUrl }
    const [isPlaying, setIsPlaying] = useState(false);
    const [progress, setProgress] = useState(0);
    const [duration, setDuration] = useState(0);
    const [volume, setVolume] = useState(0.8);
    const audioRef = useRef(new Audio());

    const playTrack = (track) => {
        if (currentTrack?.id === track.id) {
            togglePlay();
            return;
        }

        setCurrentTrack(track);
        audioRef.current.src = track.audioUrl;
        audioRef.current.play().catch(err => console.error("Playback failed:", err));
        setIsPlaying(true);

        // MediaSession API implementation
        if ('mediaSession' in navigator) {
            navigator.mediaSession.metadata = new window.MediaMetadata({
                title: track.title,
                artist: track.subtitle || 'Ritam',
                album: 'Wellness Journey',
                artwork: [
                    { src: track.imageUrl || '/ritam_logo.jpg', sizes: '512x512', type: 'image/jpeg' }
                ]
            });

            navigator.mediaSession.setActionHandler('play', () => {
                audioRef.current.play();
                setIsPlaying(true);
            });
            navigator.mediaSession.setActionHandler('pause', () => {
                audioRef.current.pause();
                setIsPlaying(false);
            });
            navigator.mediaSession.setActionHandler('seekbackward', () => {
                audioRef.current.currentTime = Math.max(audioRef.current.currentTime - 10, 0);
            });
            navigator.mediaSession.setActionHandler('seekforward', () => {
                audioRef.current.currentTime = Math.min(audioRef.current.currentTime + 10, audioRef.current.duration);
            });
        }
    };

    const togglePlay = () => {
        if (!currentTrack) return;
        if (isPlaying) {
            audioRef.current.pause();
        } else {
            audioRef.current.play().catch(err => console.error("Playback failed:", err));
        }
        setIsPlaying(!isPlaying);
    };

    const seekTo = (time) => {
        audioRef.current.currentTime = time;
        setProgress(time);
    };

    useEffect(() => {
        const audio = audioRef.current;

        const updateProgress = () => {
            setProgress(audio.currentTime);
        };

        const handleLoadedMetadata = () => {
            setDuration(audio.duration);
        };

        const handleEnded = () => {
            setIsPlaying(false);
            setProgress(0);
            // Track activity on completion
            if (auth.currentUser) {
                updatePlayerStreak(auth.currentUser.uid);
            }
        };

        audio.addEventListener('timeupdate', updateProgress);
        audio.addEventListener('loadedmetadata', handleLoadedMetadata);
        audio.addEventListener('ended', handleEnded);

        return () => {
            audio.removeEventListener('timeupdate', updateProgress);
            audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
            audio.removeEventListener('ended', handleEnded);
        };
    }, []);

    useEffect(() => {
        audioRef.current.volume = volume;
    }, [volume]);

    const value = {
        currentTrack,
        isPlaying,
        progress,
        duration,
        volume,
        setVolume,
        playTrack,
        togglePlay,
        seekTo
    };

    return (
        <AudioContext.Provider value={value}>
            {children}
        </AudioContext.Provider>
    );
};
