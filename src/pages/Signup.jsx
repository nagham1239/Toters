import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Auth.css";
import { auth, db } from "../components/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [location, setLocation] = useState(""); // New state for location
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!name || !email || !password || !location) {
      setError("Please fill in all fields.");
      return;
    }

    try {
      // Create a new user with email and password
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Save additional user data (like name and location) to Firestore
      await setDoc(doc(db, "users", user.uid), {
        name: name,
        email: email,
        location: location,
      });

      // Clear any previous errors
      setError("");

      // Redirect to the login page after successful signup
      alert("Signup successful! Redirecting to Login...");
      navigate("/login");
    } catch (error) {
      // Handle Firebase-specific errors
      setError(error.message || "An error occurred during signup.");
    }
  };

  return (
    <div className="auth-container">
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        {/* Full Name Input */}
        <input
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        {/* Email Input */}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        {/* Password Input */}
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        {/* Location Input */}
        <input
          type="text"
          placeholder="Location (e.g., City, Country)"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          required
        />

        {/* Error Message */}
        {error && <p className="error-message">{error}</p>}

        {/* Submit Button */}
        <button type="submit">Sign Up</button>
      </form>

      {/* Login Link */}
      <p>
        Already have an account?{" "}
        <a href="/login" className="auth-link">
          Login
        </a>
      </p>
    </div>
  );
};

export default Signup;