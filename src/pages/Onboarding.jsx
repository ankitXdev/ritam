import React, { useState } from 'react';
import { Flower, Moon, Activity, Circle, Grid } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/ritam_logo.jpg';
import '../App.css';

function Onboarding() {
    const navigate = useNavigate();
    const [selectedGoals, setSelectedGoals] = useState([]);

    const toggleGoal = (goal) => {
        if (selectedGoals.includes(goal)) {
            setSelectedGoals(selectedGoals.filter(g => g !== goal));
        } else {
            setSelectedGoals([...selectedGoals, goal]);
        }
    };

    const goals = [
        {
            id: 'happiness',
            icon: <Flower size={48} color="#fbbf24" />,
            title: "Increase My Happiness",
            desc: "Find more joy in daily life"
        },
        {
            id: 'sleep',
            icon: <Moon size={48} color="#8b5cf6" />,
            title: "Improve My Sleep Quality",
            desc: "Sleep better and wake up refreshed"
        },
        {
            id: 'stress',
            icon: <Activity size={48} color="#3b82f6" />,
            title: "Reduce My Stress and Anxiety",
            desc: "Find calm in chaos"
        },
        {
            id: 'meditation',
            icon: <Circle size={48} color="#f97316" />,
            title: "Build and Deepen Practice",
            desc: "Start or improve your journey"
        },
        {
            id: 'other',
            icon: <Grid size={32} color="#ec4899" />,
            title: "Something else",
            desc: "Explore other benefits"
        }
    ];

    return (
        <div className="app onboarding-page">
            <nav className="navbar glass-panel">
                <div className="container nav-content">
                    <div className="logo">
                        <img src={logo} alt="Ritam Logo" className="logo-img" />
                    </div>
                    {/* Skip could logically go to the main dashboard (not built yet) or back home */}
                    <button className="btn-skip" onClick={() => navigate('/')}>Skip</button>
                </div>
            </nav>

            <main className="container onboarding-content">
                <h1 className="title">What brings you to<br />Ritam?</h1>

                <div className="goals-grid">
                    {goals.map((goal) => (
                        <div
                            key={goal.id}
                            className={`glass-panel goal-card ${selectedGoals.includes(goal.id) ? 'selected' : ''}`}
                            onClick={() => toggleGoal(goal.id)}
                        >
                            <div className="goal-icon-wrapper">
                                {goal.icon}
                            </div>
                            <h3>{goal.title}</h3>
                        </div>
                    ))}
                </div>

                <button className="btn-continue" onClick={() => navigate('/signup')}>
                    Continue
                </button>
            </main>
        </div>
    );
}

export default Onboarding;
