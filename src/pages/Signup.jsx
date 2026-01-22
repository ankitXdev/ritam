import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Smartphone, Facebook, Chrome, ArrowLeft, Eye, EyeOff } from 'lucide-react';
import { auth } from '../firebase';
import {
    createUserWithEmailAndPassword,
    GoogleAuthProvider,
    signInWithPopup,
    RecaptchaVerifier,
    signInWithPhoneNumber
} from 'firebase/auth';
import '../App.css';

function Signup() {
    const navigate = useNavigate();
    const [method, setMethod] = useState('menu'); // 'menu', 'email', 'phone'
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');

    // Phone Auth State
    const [phoneNumber, setPhoneNumber] = useState('');
    const [otp, setOtp] = useState('');
    const [verificationResult, setVerificationResult] = useState(null);

    const handleEmailSignup = async (e) => {
        e.preventDefault();
        setError('');
        try {
            await createUserWithEmailAndPassword(auth, email, password);
            navigate('/home', { replace: true });
        } catch (err) {
            setError(err.message);
        }
    };

    const handleGoogleSignup = async () => {
        setError('');
        const provider = new GoogleAuthProvider();
        try {
            await signInWithPopup(auth, provider);
            navigate('/home', { replace: true });
        } catch (err) {
            setError(err.message);
        }
    };

    const setupRecaptcha = () => {
        if (!window.recaptchaVerifier) {
            window.recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container-signup', {
                'size': 'invisible',
                'callback': (response) => {
                    // reCAPTCHA solved
                }
            });
        }
    };

    const handlePhoneSignupSubmit = async (e) => {
        e.preventDefault();
        setError('');
        if (!verificationResult) {
            setupRecaptcha();
            const appVerifier = window.recaptchaVerifier;
            try {
                const confirmationResult = await signInWithPhoneNumber(auth, phoneNumber, appVerifier);
                setVerificationResult(confirmationResult);
            } catch (err) {
                setError(err.message);
            }
        } else {
            try {
                await verificationResult.confirm(otp);
                navigate('/home', { replace: true });
            } catch (err) {
                setError("Invalid OTP");
            }
        }
    };

    const handleBack = () => {
        if (method !== 'menu') {
            setMethod('menu');
            setError('');
        } else {
            navigate(-1);
        }
    };

    return (
        <div className="app auth-page">
            <div id="recaptcha-container-signup"></div>

            <div className="auth-header">
                <button className="btn-back" onClick={handleBack}>
                    <ArrowLeft size={24} />
                    <span>Back</span>
                </button>
            </div>

            <div className="auth-container">
                <h1 className="auth-title">Create an account</h1>

                {error && <p style={{ color: 'red', marginBottom: '10px' }}>{error}</p>}

                {method === 'menu' && (
                    <div className="auth-buttons">
                        <button className="btn-auth btn-white" onClick={() => setMethod('email')}>
                            <Mail className="auth-icon icon-purple" />
                            Continue with Email
                        </button>

                        <button className="btn-auth btn-white" onClick={() => setMethod('phone')}>
                            <Smartphone className="auth-icon icon-purple" />
                            Continue with Phone Number
                        </button>

                        <button className="btn-auth btn-blue" style={{ opacity: 0.5, cursor: 'not-allowed' }}>
                            <Facebook className="auth-icon" />
                            Continue with Facebook
                        </button>

                        <button className="btn-auth btn-white" onClick={handleGoogleSignup}>
                            <Chrome className="auth-icon icon-google" />
                            Continue with Google
                        </button>
                    </div>
                )}

                {method === 'email' && (
                    <form className="auth-form" onSubmit={handleEmailSignup}>
                        <div className="input-group">
                            <input
                                type="email"
                                placeholder="Email"
                                className="auth-input"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>

                        <div className="input-group">
                            <input
                                type={showPassword ? "text" : "password"}
                                placeholder="Password"
                                className="auth-input"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                            <button
                                type="button"
                                className="btn-show-password"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? "HIDE" : "SHOW"}
                            </button>
                        </div>

                        <button type="submit" className="btn-submit-login">Sign Up</button>
                    </form>
                )}

                {method === 'phone' && (
                    <form className="auth-form" onSubmit={handlePhoneSignupSubmit}>
                        {!verificationResult ? (
                            <div className="input-group">
                                <input
                                    type="tel"
                                    placeholder="Phone Number (e.g. +91...)"
                                    className="auth-input"
                                    value={phoneNumber}
                                    onChange={(e) => setPhoneNumber(e.target.value)}
                                    required
                                />
                            </div>
                        ) : (
                            <div className="input-group">
                                <input
                                    type="text"
                                    placeholder="Enter OTP"
                                    className="auth-input"
                                    value={otp}
                                    onChange={(e) => setOtp(e.target.value)}
                                    required
                                />
                            </div>
                        )}
                        <button type="submit" className="btn-submit-login">
                            {!verificationResult ? 'Send OTP' : 'Verify OTP'}
                        </button>
                    </form>
                )}

                <div className="auth-footer">
                    <p>Already have an account?</p>
                    <button className="btn-login-purple" onClick={() => navigate('/login')}>
                        Log in
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Signup;
