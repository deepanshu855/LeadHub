import React from "react";
import { useForm } from "react-hook-form";
import { NavLink, useNavigate, Navigate } from "react-router-dom";
import "../styles/auth.css";
import { useAuth } from "../hooks/useAuth";

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onSubmit",
  });
  const navigate = useNavigate();
  const { user, handleRegister, loading } = useAuth();

  if (user) {
    return <Navigate to={"/admin/dashboard"} />;
  }

  const onSubmit = async (data) => {
    const { email, password } = data;
    await handleRegister(email, password);
    navigate("/admin/dashboard");
  };

  if (loading) {
    return (
      <main className="auth-layout">
        <div className="auth-loading">
          {/* <Loader2 size={48} className="spinner-icon" /> */}
          <h2>Authenticating...</h2>
        </div>
      </main>
    );
  }

  return (
    <div className="auth-wrapper">
      <div className="auth-card">
        <h2 className="auth-title">Create an Account</h2>
        <p className="auth-subtitle">
          Join LeadHub to supercharge your pipeline.
        </p>

        <form
          className="auth-form"
          onSubmit={handleSubmit(onSubmit)}
          noValidate
        >
          {/* Email Field */}
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
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
            {errors.email && (
              <span className="error-text">{errors.email.message}</span>
            )}
          </div>

          {/* Password Field */}
          <div className="form-group">
            <label htmlFor="password">Password</label>
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
            {errors.password && (
              <span className="error-text">{errors.password.message}</span>
            )}
          </div>

          <button type="submit" className="submit-btn auth-btn">
            Register
          </button>
        </form>

        <div className="auth-footer">
          <p>
            Already have an account?{" "}
            <NavLink to="/admin/login" className="auth-link">
              Login
            </NavLink>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
