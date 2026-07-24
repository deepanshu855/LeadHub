import React from "react";
import { useForm } from "react-hook-form";
import Navbar from "../../shared/components/Navbar";
import Footer from "../../shared/components/Footer";
import "../styles/landing.css";
import { useLead } from "../hooks/useLead.js";

const Landing = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    mode: "onSubmit", // Validates when the user clicks submit
  });

  const { loading, error, handleCreateLead } = useLead();

  if (loading) {
    return <h2>Loading...</h2>;
  }

  const onSubmit = async (data) => {
    const { name, email, budgetRange, message } = data;

    const result = await handleCreateLead({
      name,
      email,
      budgetRange,
      message,
    });
    console.log(result);
    reset();
  };

  return (
    <div className="landing-wrapper">
      <Navbar />

      <main className="landing-main">
        {/* Hero Section */}
        <section className="hero-section" id="home">
          <div className="hero-container">
            {/* Left Content */}
            <div className="hero-content">
              <h1 className="hero-title">
                Supercharge Your Pipeline with{" "}
                <span className="highlight">High-Quality Leads</span>
              </h1>
              <p className="hero-subtitle">
                LeadHub connects your business with verified, high-intent
                prospects. Grow your revenue with our data-driven targeting
                strategies.
              </p>
              <div className="hero-benefits">
                <div className="benefit-item">✓ Verified Prospects</div>
                <div className="benefit-item">✓ Real-time Delivery</div>
                <div className="benefit-item">✓ High Conversion Rates</div>
              </div>
            </div>

            {/* Right Content: Lead Form with React Hook Form */}
            <div className="hero-form-wrapper" id="quote">
              <form
                className="lead-form"
                onSubmit={handleSubmit(onSubmit)}
                noValidate
              >
                <h3 className="form-title">Get Your Free Proposal</h3>

                {/* Name Field */}
                <div className="form-group">
                  <label htmlFor="name">Full Name</label>
                  <input
                    type="text"
                    id="name"
                    placeholder="John Doe"
                    className={errors.name ? "input-error" : ""}
                    {...register("name", {
                      required: "Name is required",
                      pattern: {
                        value: /^[A-Za-z\s]+$/,
                        message: "Name can only contain letters and spaces",
                      },
                    })}
                  />
                  {errors.name && (
                    <span className="error-text">{errors.name.message}</span>
                  )}
                </div>

                {/* Email Field */}
                <div className="form-group">
                  <label htmlFor="email">Work Email</label>
                  <input
                    type="email"
                    id="email"
                    placeholder="john@company.com"
                    className={errors.email ? "input-error" : ""}
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value:
                          /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                        message: "Please enter a valid email address",
                      },
                    })}
                  />
                  {errors.email && (
                    <span className="error-text">{errors.email.message}</span>
                  )}
                </div>

                {/* Budget Range Field */}
                <div className="form-group">
                  <label htmlFor="budgetRange">Monthly Budget</label>
                  <select
                    id="budgetRange"
                    className={errors.budgetRange ? "input-error" : ""}
                    defaultValue=""
                    {...register("budgetRange", {
                      required: "Please select a budget range",
                    })}
                  >
                    <option value="" disabled>
                      Select your budget
                    </option>
                    {/* Exact enum values strictly matching backend validation */}
                    <option value="< ₹10,000">{"< ₹10,000"}</option>
                    <option value="₹10k - ₹50k">{"₹10k - ₹50k"}</option>
                    <option value="₹50k - ₹1L">{"₹50k - ₹1L"}</option>
                    <option value="> ₹1L">{"> ₹1L"}</option>
                  </select>
                  {errors.budgetRange && (
                    <span className="error-text">
                      {errors.budgetRange.message}
                    </span>
                  )}
                </div>

                {/* Message Field */}
                <div className="form-group">
                  <label htmlFor="message">Message</label>
                  <textarea
                    id="message"
                    placeholder="Tell us about your requirements..."
                    rows="4"
                    className={errors.message ? "input-error" : ""}
                    {...register("message", {
                      required: "Message is required",
                      validate: (value) =>
                        value.trim().length > 10 ||
                        "Message must be greater than 10 characters",
                    })}
                  ></textarea>
                  {errors.message && (
                    <span className="error-text">{errors.message.message}</span>
                  )}
                </div>

                <button type="submit" className="submit-btn">
                  Get Started
                </button>
              </form>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="features-section" id="services">
          <div className="features-container">
            <h2 className="section-title">Why Choose LeadHub?</h2>
            <div className="features-grid">
              <div className="feature-card">
                <div className="feature-icon">🎯</div>
                <h3>Precision Targeting</h3>
                <p>
                  We find leads that match your exact ideal customer profile,
                  ensuring higher engagement.
                </p>
              </div>
              <div className="feature-card">
                <div className="feature-icon">⚡</div>
                <h3>Instant Routing</h3>
                <p>
                  Leads are delivered straight to your CRM in real-time while
                  they are still hot.
                </p>
              </div>
              <div className="feature-card">
                <div className="feature-icon">📈</div>
                <h3>Scalable Growth</h3>
                <p>
                  Easily scale your lead volume up or down based on your sales
                  team's capacity.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Landing;
