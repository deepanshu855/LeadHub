import React from "react";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import {
  User,
  Mail,
  DollarSign,
  MessageSquare,
  Zap,
  ShieldCheck,
  Target,
  Users,
  Clock,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";
import Navbar from "../../shared/components/Navbar";
import Footer from "../../shared/components/Footer";
import "../styles/landing.css";
import { useLead } from "../hooks/useLead.js";

// Animation Variants
const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const Landing = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    mode: "onSubmit",
  });

  const { loading, error, handleCreateLead } = useLead();

  if (loading) {
    return (
      <div className="loading-screen">
        <div className="spinner"></div>
        <p>Loading LeadHub...</p>
      </div>
    );
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
            <motion.div
              className="hero-content"
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
            >
              <motion.div variants={fadeUp} className="hero-badge">
                <Zap size={14} className="badge-icon" />
                <span>Next-Gen Lead Generation</span>
              </motion.div>

              <motion.h1 variants={fadeUp} className="hero-title">
                Capture More Business Opportunities with{" "}
                <span className="highlight">LeadHub</span>
              </motion.h1>

              <motion.p variants={fadeUp} className="hero-subtitle">
                LeadHub connects your business with verified, high-intent
                prospects. Easily submit inquiries and receive quick, tailored
                responses from our team.
              </motion.p>

              <motion.div variants={fadeUp} className="hero-benefits">
                <div className="benefit-item">
                  <CheckCircle2 size={18} className="text-success" /> Verified
                  Prospects
                </div>
                <div className="benefit-item">
                  <CheckCircle2 size={18} className="text-success" /> Real-time
                  Delivery
                </div>
                <div className="benefit-item">
                  <CheckCircle2 size={18} className="text-success" /> High
                  Conversion
                </div>
              </motion.div>
            </motion.div>

            {/* Right Content: Form */}
            <motion.div
              className="hero-form-wrapper"
              id="contact"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <form
                className="lead-form"
                onSubmit={handleSubmit(onSubmit)}
                noValidate
              >
                <div className="form-header">
                  <h3 className="form-title">Start Growing Today</h3>
                  <p className="form-desc">
                    Fill out the details below and we'll be in touch instantly.
                  </p>
                </div>

                <div className="form-group">
                  <label htmlFor="name">Full Name</label>
                  <div className="input-wrapper">
                    <User size={18} className="input-icon" />
                    <input
                      type="text"
                      id="name"
                      placeholder=""
                      className={errors.name ? "input-error" : ""}
                      {...register("name", {
                        required: "Name is required",
                        pattern: {
                          value: /^[A-Za-z\s]+$/,
                          message: "Name can only contain letters and spaces",
                        },
                      })}
                    />
                  </div>
                  {errors.name && (
                    <span className="error-text">{errors.name.message}</span>
                  )}
                </div>

                <div className="form-group">
                  <label htmlFor="email">Work Email</label>
                  <div className="input-wrapper">
                    <Mail size={18} className="input-icon" />
                    <input
                      type="email"
                      id="email"
                      placeholder=""
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
                  </div>
                  {errors.email && (
                    <span className="error-text">{errors.email.message}</span>
                  )}
                </div>

                <div className="form-group">
                  <label htmlFor="budgetRange">Monthly Budget</label>
                  <div className="input-wrapper">
                    <DollarSign size={18} className="input-icon" />
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
                      <option value="< ₹10,000">{"< ₹10,000"}</option>
                      <option value="₹10k - ₹50k">{"₹10k - ₹50k"}</option>
                      <option value="₹50k - ₹1L">{"₹50k - ₹1L"}</option>
                      <option value="> ₹1L">{"> ₹1L"}</option>
                    </select>
                  </div>
                  {errors.budgetRange && (
                    <span className="error-text">
                      {errors.budgetRange.message}
                    </span>
                  )}
                </div>

                <div className="form-group">
                  <label htmlFor="message">Message</label>
                  <div className="input-wrapper textarea-wrapper">
                    <MessageSquare size={18} className="input-icon" />
                    <textarea
                      id="message"
                      placeholder="Tell us about your requirements..."
                      rows="3"
                      className={errors.message ? "input-error" : ""}
                      {...register("message", {
                        required: "Message is required",
                        validate: (value) =>
                          value.trim().length > 10 ||
                          "Message must be greater than 10 characters",
                      })}
                    ></textarea>
                  </div>
                  {errors.message && (
                    <span className="error-text">{errors.message.message}</span>
                  )}
                </div>

                <button type="submit" className="submit-btn" disabled={loading}>
                  {loading ? "Submitting..." : "Get Started"}
                  <ArrowRight size={18} className="btn-icon" />
                </button>
              </form>
            </motion.div>
          </div>
        </section>

        {/* Trust Section */}
        <section className="trust-section" id="trust">
          <div className="trust-container">
            <p className="trust-label">Trusted by modern teams worldwide</p>
            <div className="trust-grid">
              <div className="trust-item">
                <ShieldCheck size={24} className="trust-icon" />
                <span>Secure Information</span>
              </div>
              <div className="trust-item">
                <Clock size={24} className="trust-icon" />
                <span>Quick Communication</span>
              </div>
              <div className="trust-item">
                <Target size={24} className="trust-icon" />
                <span>Trusted Service</span>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="features-section" id="features">
          <div className="features-container">
            <motion.div
              className="section-header"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="section-title">Why Choose LeadHub?</h2>
              <p className="section-desc">
                Everything you need to convert prospects into permanent clients,
                fast.
              </p>
            </motion.div>

            <motion.div
              className="features-grid"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <motion.div variants={fadeUp} className="feature-card">
                <div className="feature-icon-wrapper">
                  <Zap size={24} className="feature-icon" />
                </div>
                <h3>Fast Response</h3>
                <p>
                  Leads are processed and delivered straight to your CRM in
                  real-time while they are still hot.
                </p>
              </motion.div>

              <motion.div variants={fadeUp} className="feature-card">
                <div className="feature-icon-wrapper">
                  <Users size={24} className="feature-icon" />
                </div>
                <h3>Professional Team</h3>
                <p>
                  Our dedicated experts work alongside you to ensure highest
                  quality prospect verification.
                </p>
              </motion.div>

              <motion.div variants={fadeUp} className="feature-card">
                <div className="feature-icon-wrapper">
                  <Target size={24} className="feature-icon" />
                </div>
                <h3>Tailored Solutions</h3>
                <p>
                  We find leads that match your exact ideal customer profile,
                  ensuring scalable growth.
                </p>
              </motion.div>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Landing;
