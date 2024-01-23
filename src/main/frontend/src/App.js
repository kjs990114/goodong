import React, { useState } from 'react';
import './styles/App.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faBars, faCalendar,} from "@fortawesome/free-solid-svg-icons";
import '@fortawesome/fontawesome-free/js/all.js';
import {faFacebook, faGithub, faGoogle} from "@fortawesome/free-brands-svg-icons";
const App = () => {
    const [email, setEmail] = useState("");
    const [pwd, setPwd] = useState("");
    const [isSignUpActive, setIsSignUpActive] = useState(true);

    const handleSignUpClick = () => {
        setIsSignUpActive(true);
    };

    const handleSignInClick = () => {
        setIsSignUpActive(false);
    };

    return (
        <div className="App">
            <header className="App-header">
                <>
                    <div className={`container ${isSignUpActive ? 'right-panel-active' : ''}`}>
                        <div className="form-container sign-up-container">
                            <form action="#">
                                <h1>Create Account</h1>
                                <div className="social-container">
                                    <a href="#" className="social">
                                        <FontAwesomeIcon icon={faGoogle} />
                                    </a>
                                    <a href="#" className="social">
                                        <FontAwesomeIcon icon={faFacebook} />
                                    </a>
                                    <a href="#" className="social">
                                        <FontAwesomeIcon icon={faGithub} />
                                    </a>
                                </div>
                                <span>or use your email for registration</span>
                                <input type="text" placeholder="Name" />
                                <input type="email" placeholder="Email" />
                                <input type="password" placeholder="Password" />
                                <button>Sign Up</button>
                            </form>
                        </div>
                        <div className="form-container sign-in-container">
                            <form action="#">
                                <h1>Sign in</h1>
                                <div className="social-container">
                                    <a href="#" className="social">
                                        <FontAwesomeIcon icon={faGoogle} />
                                    </a>
                                    <a href="#" className="social">
                                        <FontAwesomeIcon icon={faFacebook} />
                                    </a>
                                    <a href="#" className="social">
                                        <FontAwesomeIcon icon={faGithub} />
                                    </a>
                                </div>
                                <span>or use your account</span>
                                <input type="email" placeholder="Email" />
                                <input type="password" placeholder="Password" />
                                <a href="#">Forgot your password?</a>
                                <button>Sign In</button>
                            </form>
                        </div>
                        <div className="overlay-container">
                            <div className="overlay">
                                <div className="overlay-panel overlay-left">
                                    <h1>Welcome Back!</h1>
                                    <p>To keep connected with us please login with your personal info</p>
                                    <button className="ghost" onClick={handleSignInClick}>
                                        Sign In
                                    </button>
                                </div>
                                <div className="overlay-panel overlay-right">
                                    <h1>Hello!</h1>
                                    <p>Join us for free 3D assets!</p>
                                    <button className="ghost" onClick={handleSignUpClick}>
                                        Sign Up
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            </header>
        </div>
    );
};

export default App;
