import React from "react";
import { useForm } from "react-hook-form";
import { NavLink, useNavigate, Navigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Mail, Lock, Loader2, LogIn } from "lucide-react";
import "../styles/auth.css";
import { useAuth } from "../hooks/useAuth";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onSubmit", // Validates when the user clicks submit
  });
  const navigate = useNavigate();
  const { user, handleLogin, loading } = useAuth();

  if (user) {
    return <Navigate to={"/admin/dashboard"} />;
  }

  const onSubmit = async (data) => {
    const { email, password } = data;
    await handleLogin(email, password);
    navigate("/admin/dashboard");
  };

  if (loading) {
    return (
      <main className="auth-layout loading-layout">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="auth-loading"
        >
          <Loader2 size={40} className="spinner-icon spinning" />
          <h2>Authenticating...</h2>
          <p>Please wait while we verify your credentials.</p>
        </motion.div>
      </main>
    );
  }

  return (
    <div className="auth-wrapper">
      <motion.div
        className="auth-card"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <div className="auth-header">
          <div className="auth-logo-icon"></div>
          <h2 className="auth-title">Welcome Back</h2>
          <p className="auth-subtitle">
            Log in to your LeadHub account to continue.
          </p>
        </div>

        <form
          className="auth-form"
          onSubmit={handleSubmit(onSubmit)}
          noValidate
        >
          {/* Email Field */}
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <div className="input-wrapper">
              <Mail size={18} className="input-icon" />
              <input
                type="email"
                id="email"
                placeholder="you@example.com"
                className={errors.email ? "input-error" : ""}
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                    message: "Please enter a valid email address",
                  },
                })}
              />
            </div>
            {errors.email && (
              <span className="error-text">{errors.email.message}</span>
            )}
          </div>

          {/* Password Field */}
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <div className="input-wrapper">
              <Lock size={18} className="input-icon" />
              <input
                type="password"
                id="password"
                placeholder="••••••••"
                className={errors.password ? "input-error" : ""}
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters long",
                  },
                })}
              />
            </div>
            {errors.password && (
              <span className="error-text">{errors.password.message}</span>
            )}
          </div>

          <button type="submit" className="submit-btn auth-btn">
            Login
            <LogIn size={18} className="btn-icon" />
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default Login;
