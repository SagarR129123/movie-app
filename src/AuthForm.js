import React, { useState } from "react";
import FacebookLogin from "react-facebook-login";
import "./AuthForm.css"; // Create a corresponding CSS file for styles.

const AuthForm = () => {
    const [isRegister, setIsRegister] = useState(true);
    const [user, setUser] = useState(null); // Store Facebook user data

    const toggleForm = (e) => {
        e.preventDefault();
        setIsRegister(!isRegister);
    };

    const handleFacebookResponse = (response) => {
        console.log("Facebook Login Response:", response);
        if (response.accessToken) {
            setUser(response); // Save user data
        } else {
            console.error("Facebook Login failed");
        }
    };

    return (
        <div className="form-container">
            {user ? (
                <div className="welcome-message">
                    <h2>Welcome, {user.name}</h2>
                    <img src={user.picture?.data?.url} alt={user.name} />
                    <p>Email: {user.email}</p>
                </div>
            ) : (
                <form id="authForm" className="auth-form">
                    <h2>{isRegister ? "Register" : "Login"}</h2>
                    <div className="form-group">
                        <label htmlFor="username">Username</label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            placeholder="Enter your username"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            placeholder="Enter your email"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            placeholder="Enter your password"
                            required
                        />
                    </div>
                    {isRegister && (
                        <div className="form-group">
                            <label htmlFor="confirmPassword">Confirm Password</label>
                            <input
                                type="password"
                                id="confirmPassword"
                                name="confirmPassword"
                                placeholder="Confirm your password"
                                required
                            />
                        </div>
                    )}
                    <button type="submit" className="auth-button">
                        {isRegister ? "Register" : "Login"}
                    </button>
                    <p className="toggle-text">
                        {isRegister
                            ? "Already have an account?"
                            : "Don't have an account?"}{" "}
                        <a href="#" onClick={toggleForm}>
                            {isRegister ? "Login here" : "Register here"}
                        </a>
                    </p>
                    <div className="social-login">
                        <FacebookLogin
                            appId="1337259867161723" // Replace with your Facebook App ID
                            autoLoad={false}
                            fields="name,email,picture"
                            callback={handleFacebookResponse}
                            textButton="Login with Facebook"
                            icon="fa-facebook"
                            cssClass="fb-login-button"
                        />
                    </div>
                </form>
            )}
        </div>
    );
};

export default AuthForm;
