import React, { useState } from "react";
import { GoogleAuthProvider, signInWithPopup, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../Firebase"; // Adjust the path to your firebase configuration
import { useNavigate } from "react-router-dom";
import '../Styles/Login.css'

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    // Handle Google Sign-In
    const handleGoogleSignIn = async () => {
        const provider = new GoogleAuthProvider();
        try {
            const result = await signInWithPopup(auth, provider);
            const user = result.user;
            console.log("User Info:", user);

            // Redirect or save user data
            localStorage.setItem("user", JSON.stringify(user));
            navigate("/"); // Redirect to the home page
        } catch (error) {
            setError(error.message);
            console.error("Error during Google Sign-In:", error.message);
        }
    };

    // Handle Manual Login
    const handleManualLogin = async (e) => {
        e.preventDefault();
        setError(""); // Clear previous error
        try {
            const result = await signInWithEmailAndPassword(auth, email, password);
            const user = result.user;
            console.log("Logged in user:", user);

            // Redirect or save user data
            localStorage.setItem("user", JSON.stringify(user));
            navigate("/"); // Redirect to the home page
        } catch (error) {
            setError("Invalid email or password");
            console.error("Error during manual login:", error.message);
        }
    };

    return (
        <div className="login-page">
            <div className="login-container">
                <h1>Login</h1>

                {/* Error Message */}
                {error && <p className="error-message">{error}</p>}

                {/* Manual Login Form */}
                <form onSubmit={handleManualLogin}>
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <button type="submit">Login</button>
                </form>

                {/* Google Sign-In */}
                <button className="google-btn" onClick={handleGoogleSignIn}>
                    <i className="fa-brands fa-google"></i> Sign in with Google
                </button>

                {/* Sign-Up Link */}
                <p>
                    Don't have an account?{" "}
                    <button onClick={() => navigate("/signup")} className="signup-btn">
                        Sign Up
                    </button>
                </p>
            </div>
        </div>
    );
};

export default Login;
