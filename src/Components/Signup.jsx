import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Header from './Header';
import '../../public/login.css';
import Footer from './Footer';

const Signup = () => {
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSignup = async () => {
        try {
            const response = await axios.post('/api/signup', { name, password });
            navigate('/login');
        } catch (error) {
            console.error('Error signing up', error);
            setError('Error signing up. Please try again.');
        }
    };

    return (
        <div>
            <Header />
            <div>
                <div className="username">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Nickname"
                        aria-label="Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <input
                        type="password"
                        className="form-control"
                        placeholder="Password"
                        aria-label="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    {error && <div className="error">{error}</div>}
                    <button
                        className="btn btn-primary d-inline-flex align-items-center btn-dark"
                        type="button"
                        onClick={handleSignup}
                    >
                        Sign Up
                        <svg className="bi ms-1" width="90" height="1">
                            <use xlinkHref="#arrow-right-short"></use>
                        </svg>
                    </button>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Signup;
