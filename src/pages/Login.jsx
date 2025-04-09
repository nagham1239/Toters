import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import "./Auth.css";
import { auth } from "../components/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import Cookies from "js-cookie"; // For managing cookies

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!email || !password) {
      setError("Please fill in all fields.");
      return;
    }

    try {
      // Sign in with Firebase Authentication
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Save user session in a cookie
      Cookies.set("userSession", user.uid, { expires: 7 }); // Expires in 7 days
      Cookies.set("typeSession", user.type, { expires: 7 }); // Expires in 7 days
      // Clear any previous errors
      setError("");

      // Redirect to the home page
      alert("Login successful! Redirecting...");
      if(user.type=="admin"){
        navigate("/admin")
      }
      navigate("/");
    } catch (error) {
      // Handle Firebase-specific errors
      setError(error.message || "An error occurred during login.");
    }
  };

  return (
    <div className="auth-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        {/* Email Input */}
        <div className="input-group">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        {/* Password Input */}
        <div className="input-group">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button
            type="button"
            className="password-toggle"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
        </div>

        {/* Error Message */}
        {error && <p className="error-message">{error}</p>}

        {/* Submit Button */}
        <button type="submit" className="auth-button">
          Login
        </button>
      </form>

      {/* Signup Link */}
      <p>
        Don't have an account?{" "}
        <Link to="/signup" className="auth-link">
          Sign up
        </Link>
      </p>
    </div>
  );
};

export default Login;