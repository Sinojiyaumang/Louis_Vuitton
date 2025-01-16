import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../Firebase";
import { useNavigate, Link } from "react-router-dom"; // Import Link for navigation
import '../Styles/Signup.css';

const SignUp = () => {
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber: "",
        country: "",
        password: "",
        confirmPassword: "",
    });
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const countries = ["United States", "Canada", "India", "United Kingdom", "Australia"];

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSignUp = async (e) => {
        e.preventDefault();
        setError(""); // Clear previous error

        const { email, password, confirmPassword } = formData;

        if (password !== confirmPassword) {
            setError("Passwords do not match.");
            return;
        }

        try {
            const result = await createUserWithEmailAndPassword(auth, email, password);
            const user = result.user;
            console.log("Registered user:", user);

            localStorage.setItem("user", JSON.stringify(user));
            navigate("/login");
        } catch (error) {
            setError(error.message);
            console.error("Error during sign-up:", error.message);
        }
    };

    return (
        <div className="signup-page">
            <div className="signup-container">
                <h1>Sign Up</h1>

                {/* Error Message */}
                {error && <p className="error-message">{error}</p>}

                <form onSubmit={handleSignUp}>
                    <input
                        type="text"
                        name="firstName"
                        placeholder="First Name"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        required
                    />
                    <input
                        type="text"
                        name="lastName"
                        placeholder="Last Name"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        required
                    />
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                    />
                    <input
                        type="tel"
                        name="phoneNumber"
                        placeholder="Phone Number"
                        value={formData.phoneNumber}
                        onChange={handleInputChange}
                        required
                    />
                    <select
                        name="country"
                        value={formData.country}
                        onChange={handleInputChange}
                        required
                    >
                        <option value="">Select Country</option>
                        {countries.map((country) => (
                            <option key={country} value={country}>
                                {country}
                            </option>
                        ))}
                    </select>
                    <input
                        type="password"
                        name="password"
                        placeholder="Set Password"
                        value={formData.password}
                        onChange={handleInputChange}
                        required
                    />
                    <input
                        type="password"
                        name="confirmPassword"
                        placeholder="Confirm Password"
                        value={formData.confirmPassword}
                        onChange={handleInputChange}
                        required
                    />
                    <button type="submit">Sign Up</button>
                </form>

                {/* Already have an account */}
                <p className="already-account">
                    Already have an account?{" "}
                    <Link to="/login" className="login-link" style={{color: "black"}}>
                        Log In
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default SignUp;
