import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../assets/Css/Auth.css";
import adminSignupImg from "../../assets/images/login.jpg";
import studentSignupImg from "../../assets/images/login.jpg";
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {
  const [role, setRole] = useState("admin");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const getImage = () => (role === "admin" ? adminSignupImg : studentSignupImg);

  const handleSignup = (e) => {
    e.preventDefault();

    if (!name || !email || !password) {
      alert("Please fill all fields");
      return;
    }

    const user = { name, email, password, role };
    localStorage.setItem(`${role}_user`, JSON.stringify(user));

    alert(`${role.toUpperCase()} registered successfully!`);
    navigate("/login");
  };

  return (
    <div className="auth-bg d-flex justify-content-center align-items-center vh-100">
      <div className="card auth-card shadow-lg d-flex flex-row">

        <div className="auth-image-container">
          <img src={getImage()} alt="signup visual" className="img-fluid rounded-start" />
        </div>

        <div className="auth-form-container p-4 d-flex flex-column justify-content-center">
          <h2 className="text-center mb-3">Sign Up</h2>
          <p className="text-center text-muted mb-3">{role === "admin" ? "Admin Portal" : "Student Portal"}</p>

          <div className="d-flex gap-2 justify-content-center mb-3">
            <button
              type="button"
              className={`btn ${role === "admin" ? "btn-primary" : "btn-outline-primary"}`}
              onClick={() => setRole("admin")}
            >
              Admin
            </button>
            <button
              type="button"
              className={`btn ${role === "student" ? "btn-primary" : "btn-outline-primary"}`}
              onClick={() => setRole("student")}
            >
              Student
            </button>
          </div>

          <form onSubmit={handleSignup}>
            <div className="mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <input
                type="email"
                className="form-control"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <input
                type="password"
                className="form-control"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button className="btn btn-success w-100 mb-2" type="submit">Create Account</button>
          </form>

          <div className="text-center mt-2">
            <p>
              Already have an account? <Link to="/login" className="link-primary">Login</Link>
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Signup;
