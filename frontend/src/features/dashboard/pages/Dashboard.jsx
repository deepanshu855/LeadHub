import React, { useState, useEffect } from "react";
import { useLead } from "../../lead/hooks/useLead.js";
import { useAuth } from "../../auth/hooks/useAuth.js";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  LogOut,
  Search,
  Users,
  Sparkles,
  PhoneCall,
  CheckCircle,
  X,
  User,
  Mail,
  DollarSign,
  Calendar,
  MessageSquare,
  Inbox,
  Edit3,
} from "lucide-react";
import "../styles/dashboard.css";
import Footer from "../../shared/components/Footer.jsx";

// Animation Variants
const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

const Dashboard = () => {
  const { leads, loading, error, handleGetLeads, handleUpdateLead } = useLead();
  const { user, handleLogout } = useAuth();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedLead, setSelectedLead] = useState(null);
  const [newStatus, setNewStatus] = useState("");

  useEffect(() => {
    handleGetLeads();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const submitLogout = () => {
    console.log("clicked");
    handleLogout();
  };

  const safeLeads = leads || [];

  const totalLeads = safeLeads.length;
  const newLeads = safeLeads.filter((l) => l.status === "new").length;
  const contactedLeads = safeLeads.filter(
    (l) => l.status === "contacted",
  ).length;
  const closedLeads = safeLeads.filter((l) => l.status === "close").length;

  const filteredLeads = safeLeads.filter(
    (lead) =>
      lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.email.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const openModal = (lead) => {
    setSelectedLead(lead);
    setNewStatus(lead.status);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedLead(null);
  };

  const onUpdateStatus = async () => {
    if (selectedLead && newStatus) {
      await handleUpdateLead(selectedLead._id || selectedLead.id, newStatus);
      closeModal();
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const options = {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    };
    return new Date(dateString).toLocaleDateString("en-IN", options);
  };

  return (
    <div className="dash-wrapper">
      {/* Sticky Top Navigation */}
      <nav className="dash-nav">
        <div className="dash-nav-container">
          <div className="dash-brand">
            <div className="dash-logo-icon">
              <LayoutDashboard size={18} />
            </div>
            <span className="dash-logo">LeadHub</span>
            <span className="dash-divider">/</span>
            <span className="dash-title">Overview</span>
          </div>
          <div className="dash-user-actions">
            <span className="dash-email">
              {user.email}
            </span>
            <button onClick={submitLogout} className="btn-logout">
              <LogOut size={16} /> Logout
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="dash-main">
        <header className="dash-header">
          <h1>Lead Management</h1>
          <p>Manage and track customer inquiries submitted through LeadHub.</p>
        </header>

        {error && (
          <div className="error-banner">
            <strong>Error:</strong>{" "}
            {error.message || "Failed to fetch leads. Please try again."}
          </div>
        )}

        {/* Summary Cards */}
        <motion.section
          className="stats-grid"
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={fadeUp} className="stat-card">
            <div
              className="stat-icon-wrapper"
              style={{ backgroundColor: "#eff6ff", color: "#2563eb" }}
            >
              <Users size={20} />
            </div>
            <div className="stat-info">
              <span className="stat-value">{loading ? "-" : totalLeads}</span>
              <span className="stat-label">Total Leads</span>
            </div>
          </motion.div>

          <motion.div variants={fadeUp} className="stat-card">
            <div
              className="stat-icon-wrapper"
              style={{ backgroundColor: "#f5f3ff", color: "#8b5cf6" }}
            >
              <Sparkles size={20} />
            </div>
            <div className="stat-info">
              <span className="stat-value">{loading ? "-" : newLeads}</span>
              <span className="stat-label">New Leads</span>
            </div>
          </motion.div>

          <motion.div variants={fadeUp} className="stat-card">
            <div
              className="stat-icon-wrapper"
              style={{ backgroundColor: "#fff7ed", color: "#f97316" }}
            >
              <PhoneCall size={20} />
            </div>
            <div className="stat-info">
              <span className="stat-value">
                {loading ? "-" : contactedLeads}
              </span>
              <span className="stat-label">Contacted</span>
            </div>
          </motion.div>

          <motion.div variants={fadeUp} className="stat-card">
            <div
              className="stat-icon-wrapper"
              style={{ backgroundColor: "#f0fdf4", color: "#22c55e" }}
            >
              <CheckCircle size={20} />
            </div>
            <div className="stat-info">
              <span className="stat-value">{loading ? "-" : closedLeads}</span>
              <span className="stat-label">Closed</span>
            </div>
          </motion.div>
        </motion.section>

        {/* Search & Table Section */}
        <motion.section
          className="table-section"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <div className="table-header-bar">
            <div className="search-container">
              <Search size={18} className="search-icon" />
              <input
                type="text"
                className="search-input"
                placeholder="Search by name or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          <div className="table-container">
            <table className="dash-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Budget Range</th>
                  <th>Message</th>
                  <th>Status</th>
                  <th className="text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  // Skeleton Loading State
                  [...Array(4)].map((_, idx) => (
                    <tr key={idx} className="skeleton-row">
                      <td>
                        <div className="skeleton-box"></div>
                      </td>
                      <td>
                        <div className="skeleton-box"></div>
                      </td>
                      <td>
                        <div className="skeleton-box"></div>
                      </td>
                      <td>
                        <div className="skeleton-box wide"></div>
                      </td>
                      <td>
                        <div className="skeleton-box badge-skel"></div>
                      </td>
                      <td className="text-right">
                        <div className="skeleton-box btn-skel"></div>
                      </td>
                    </tr>
                  ))
                ) : filteredLeads.length === 0 ? (
                  // Empty State
                  <tr>
                    <td colSpan="6">
                      <div className="empty-state">
                        <div className="empty-icon-wrapper">
                          <Inbox size={32} />
                        </div>
                        <h3>No Leads Found</h3>
                        <p>No leads match your current search criteria.</p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  // Data Rows
                  <AnimatePresence>
                    {filteredLeads.map((lead) => (
                      <motion.tr
                        key={lead._id || lead.id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        whileHover={{ backgroundColor: "#f9fafb" }}
                      >
                        <td className="fw-600">{lead.name}</td>
                        <td className="text-muted">{lead.email}</td>
                        <td>
                          <span className="budget-pill">
                            {lead.budgetRange}
                          </span>
                        </td>
                        <td className="truncate" title={lead.message}>
                          {lead.message}
                        </td>
                        <td>
                          <span className={`status-badge badge-${lead.status}`}>
                            <span className="status-dot"></span>
                            {lead.status === "close"
                              ? "Closed"
                              : lead.status.charAt(0).toUpperCase() +
                                lead.status.slice(1)}
                          </span>
                        </td>
                        <td className="text-right">
                          <button
                            className="btn-update"
                            onClick={() => openModal(lead)}
                          >
                            <Edit3 size={14} /> Update
                          </button>
                        </td>
                      </motion.tr>
                    ))}
                  </AnimatePresence>
                )}
              </tbody>
            </table>
          </div>
        </motion.section>
      </main>

      {/* Expanded Lead Details Modal */}
      <AnimatePresence>
        {isModalOpen && selectedLead && (
          <motion.div
            className="modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeModal}
          >
            <motion.div
              className="modal-content modal-large"
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="modal-header">
                <div>
                  <h3>Lead Details</h3>
                  <p>Review information and update status</p>
                </div>
                <button className="btn-close-modal" onClick={closeModal}>
                  <X size={20} />
                </button>
              </div>

              <div className="modal-body lead-details-body">
                {/* Data Grid */}
                <div className="details-grid">
                  <div className="detail-group">
                    <label>
                      <User size={14} /> Full Name
                    </label>
                    <p>{selectedLead.name}</p>
                  </div>
                  <div className="detail-group">
                    <label>
                      <Mail size={14} /> Email Address
                    </label>
                    <p>
                      <a
                        href={`mailto:${selectedLead.email}`}
                        className="detail-link"
                      >
                        {selectedLead.email}
                      </a>
                    </p>
                  </div>
                  <div className="detail-group">
                    <label>
                      <DollarSign size={14} /> Budget Range
                    </label>
                    <p className="highlight-text">{selectedLead.budgetRange}</p>
                  </div>
                  <div className="detail-group">
                    <label>
                      <Calendar size={14} /> Submitted At
                    </label>
                    <p>{formatDate(selectedLead.createdAt)}</p>
                  </div>
                </div>

                {/* Full Message Box */}
                <div className="detail-group message-box">
                  <label>
                    <MessageSquare size={14} /> Message / Requirements
                  </label>
                  <div className="message-content">{selectedLead.message}</div>
                </div>

                <hr className="modal-divider" />

                {/* Action Area */}
                <div className="detail-group update-section">
                  <label htmlFor="statusSelect">Update Lead Status</label>
                  <select
                    id="statusSelect"
                    className="modal-select"
                    value={newStatus}
                    onChange={(e) => setNewStatus(e.target.value)}
                  >
                    <option value="new">New</option>
                    <option value="contacted">Contacted</option>
                    <option value="close">Closed</option>
                  </select>
                </div>
              </div>

              <div className="modal-actions">
                <button
                  className="btn-cancel"
                  onClick={closeModal}
                  disabled={loading}
                >
                  Cancel
                </button>
                <button
                  className="btn-save"
                  onClick={onUpdateStatus}
                  disabled={loading}
                >
                  {loading ? "Updating..." : "Save Changes"}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
};

export default Dashboard;
