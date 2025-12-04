import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../assets/Css/Auth.css";
import studentLoginImg from "../../assets/images/studentLoginImg.jpg";

const LoginStudent = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleLogin = (e) => {
    e.preventDefault();

    if (email === "samxen700@gmail.com" && password === "12345678") {
        const defaultStudent = {
            email: "samxen700@gmail.com",
            password: "12345678",
            role: "student",
        };
        localStorage.setItem("user", JSON.stringify(defaultStudent));
        return navigate("/student/dashboard");
    }

    const savedUser = JSON.parse(localStorage.getItem("student_user"));

    if (!savedUser) {
        return alert("No student account found. Please sign up first.");
    }

    if (savedUser.email !== email || savedUser.password !== password) {
        return alert("Invalid email or password");
    }

    localStorage.setItem("user", JSON.stringify(savedUser));

    navigate("/student/dashboard");
};

    return (
        <div className="auth-bg d-flex justify-content-center align-items-center vh-100">
            <div className="card auth-card shadow-lg d-flex flex-row">

                <div className="auth-image-container">
                    <img src={studentLoginImg} alt="login visual" className="img-fluid rounded-start" />
                </div>

                <div className="auth-form-container p-4 d-flex flex-column justify-content-center">
                    <h2 className="text-center mb-3">Student Login</h2>

                    <form onSubmit={handleLogin}>
                        <div className="mb-3 mt-3">
                            <p>Enter your email</p>

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
                            <p>Enter your password</p>

                            <input
                                type="password"
                                className="form-control"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>

                        <button className="btn btn-primary w-100 mb-2" type="submit">
                            Login
                        </button>
                    </form>

                    <div className="text-center mt-2">
                        <p>
                            Don't have an account?{" "}
                            <Link to="/signup" className="link-primary">
                                Sign Up
                            </Link>
                        </p>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default LoginStudent;
