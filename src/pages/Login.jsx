import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Smartphone, Facebook, Chrome, ArrowLeft, Eye, EyeOff } from 'lucide-react';
import { auth } from '../firebase';
import {
    signInWithEmailAndPassword,
    GoogleAuthProvider,
    signInWithPopup,
    RecaptchaVerifier,
    signInWithPhoneNumber
} from 'firebase/auth';
import '../App.css';

function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');

    // Phone Auth State
    const [isPhoneLogin, setIsPhoneLogin] = useState(false);
    const [phoneNumber, setPhoneNumber] = useState('');
    const [otp, setOtp] = useState('');
    const [verificationResult, setVerificationResult] = useState(null);

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');
        try {
            await signInWithEmailAndPassword(auth, email, password);
            console.log("Login successful");
            // On success show modal
            navigate('/home', { replace: true });
        } catch (err) {
            console.error("Login error:", err);
            setError(err.message);
        }
    };

    const handleGoogleLogin = async () => {
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
            window.recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
                'size': 'invisible',
                'callback': (response) => {
                    // reCAPTCHA solved, allow signInWithPhoneNumber.
                }
            });
        }
    };

    const handlePhoneLoginSubmit = async (e) => {
        e.preventDefault();
        setError('');
        if (!verificationResult) {
            // Send OTP
            setupRecaptcha();
            const appVerifier = window.recaptchaVerifier;
            try {
                const confirmationResult = await signInWithPhoneNumber(auth, phoneNumber, appVerifier);
                setVerificationResult(confirmationResult);
            } catch (err) {
                setError(err.message);
            } // Removed duplicate catch block
        } else {
            // Verify OTP
            try {
                await verificationResult.confirm(otp);
                navigate('/home', { replace: true });
            } catch (err) {
                setError("Invalid OTP");
            }
        }
    };

    return (
        <div className="app auth-page">
            <div id="recaptcha-container"></div>

            <div className="auth-header">
                <button className="btn-back" onClick={() => navigate(-1)}>
                    <ArrowLeft size={24} />
                    <span>Back</span>
                </button>
            </div>

            <div className="auth-container">
                <h1 className="auth-title">{isPhoneLogin ? 'Phone Login' : 'Welcome Back'}</h1>

                {error && <p style={{ color: 'red', marginBottom: '10px' }}>{error}</p>}

                {!isPhoneLogin ? (
                    <form className="auth-form" onSubmit={handleLogin}>
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

                        <button type="submit" className="btn-submit-login">Log in</button>

                        <button type="button" className="btn-forgot-pass">Forgot Password?</button>
                    </form>
                ) : (
                    <form className="auth-form" onSubmit={handlePhoneLoginSubmit}>
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
                        <button type="button" className="btn-forgot-pass" onClick={() => setIsPhoneLogin(false)}>
                            Use Email instead
                        </button>
                    </form>
                )}

                <div className="auth-buttons">
                    {!isPhoneLogin && (
                        <button className="btn-auth btn-white" onClick={() => setIsPhoneLogin(true)}>
                            <Smartphone className="auth-icon icon-purple" />
                            Continue with Phone Number
                        </button>
                    )}

                    <button className="btn-auth btn-blue" style={{ opacity: 0.5, cursor: 'not-allowed' }}>
                        <Facebook className="auth-icon" />
                        Continue with Facebook
                    </button>

                    <button className="btn-auth btn-white" onClick={handleGoogleLogin}>
                        <Chrome className="auth-icon icon-google" />
                        Continue with Google
                    </button>
                </div>

                <div className="auth-footer-text">
                    <span>Not yet a member? </span>
                    <button className="link-create-account" onClick={() => navigate('/signup')}>
                        Create an account
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Login;
