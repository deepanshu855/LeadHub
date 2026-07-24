import React, { useState, useEffect } from "react";
import { useLead } from "../../lead/hooks/useLead.js";
import { useAuth } from "../../auth/hooks/useAuth.js";
import "../styles/dashboard.css";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const { leads, loading, error, handleGetLeads, handleUpdateLead } = useLead();
  const { handleLogout } = useAuth();
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

  // Helper function to format the MongoDB timestamp safely
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
            <span className="dash-logo">LeadHub</span>
            <span className="dash-title">Admin Dashboard</span>
          </div>
          <div className="dash-user-actions">
            <span className="dash-email">admin@leadhub.com</span>
            <button onClick={submitLogout} className="btn-logout">
              Logout
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
        <section className="stats-grid">
          {/* ... (Keep your existing stat cards here) ... */}
          <div className="stat-card">
            <div
              className="stat-icon"
              style={{ backgroundColor: "#eff6ff", color: "#2563eb" }}
            >
              📊
            </div>
            <div className="stat-info">
              <span className="stat-value">{loading ? "-" : totalLeads}</span>
              <span className="stat-label">Total Leads</span>
            </div>
          </div>
          <div className="stat-card">
            <div
              className="stat-icon"
              style={{ backgroundColor: "#eff6ff", color: "#3b82f6" }}
            >
              🆕
            </div>
            <div className="stat-info">
              <span className="stat-value">{loading ? "-" : newLeads}</span>
              <span className="stat-label">New</span>
            </div>
          </div>
          <div className="stat-card">
            <div
              className="stat-icon"
              style={{ backgroundColor: "#fff7ed", color: "#f97316" }}
            >
              📞
            </div>
            <div className="stat-info">
              <span className="stat-value">
                {loading ? "-" : contactedLeads}
              </span>
              <span className="stat-label">Contacted</span>
            </div>
          </div>
          <div className="stat-card">
            <div
              className="stat-icon"
              style={{ backgroundColor: "#f0fdf4", color: "#22c55e" }}
            >
              ✅
            </div>
            <div className="stat-info">
              <span className="stat-value">{loading ? "-" : closedLeads}</span>
              <span className="stat-label">Closed</span>
            </div>
          </div>
        </section>

        {/* Search & Table Section */}
        <section className="table-section">
          <div className="search-container">
            <svg
              className="search-icon"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
            <input
              type="text"
              className="search-input"
              placeholder="Search by name or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
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
                  <th>Actions</th>
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
                      <td>
                        <div className="skeleton-box btn-skel"></div>
                      </td>
                    </tr>
                  ))
                ) : filteredLeads.length === 0 ? (
                  <tr>
                    <td colSpan="6">
                      <div className="empty-state">
                        <div className="empty-icon">📭</div>
                        <h3>No Leads Found</h3>
                        <p>No leads match your current search criteria.</p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  filteredLeads.map((lead) => (
                    <tr key={lead._id}>
                      <td className="fw-600">{lead.name}</td>
                      <td className="text-muted">{lead.email}</td>
                      <td>{lead.budgetRange}</td>
                      <td className="truncate" title={lead.message}>
                        {lead.message}
                      </td>
                      <td>
                        <span className={`status-badge badge-${lead.status}`}>
                          {lead.status === "close"
                            ? "Closed"
                            : lead.status.charAt(0).toUpperCase() +
                              lead.status.slice(1)}
                        </span>
                      </td>
                      <td>
                        <button
                          className="btn-update"
                          onClick={() => openModal(lead)}
                        >
                          View & Update
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </section>
      </main>

      {/* Expanded Lead Details Modal */}
      {isModalOpen && selectedLead && (
        <div className="modal-overlay" onClick={closeModal}>
          <div
            className="modal-content modal-large"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-header">
              <h3>Lead Details</h3>
              <p>Review information and update status</p>
            </div>

            <div className="modal-body lead-details-body">
              {/* Data Grid */}
              <div className="details-grid">
                <div className="detail-group">
                  <label>Full Name</label>
                  <p>{selectedLead.name}</p>
                </div>
                <div className="detail-group">
                  <label>Email Address</label>
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
                  <label>Budget Range</label>
                  <p className="highlight-text">{selectedLead.budgetRange}</p>
                </div>
                <div className="detail-group">
                  <label>Submitted At</label>
                  <p>{formatDate(selectedLead.createdAt)}</p>
                </div>
              </div>

              {/* Full Message Box */}
              <div className="detail-group message-box">
                <label>Message / Requirements</label>
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
                Close
              </button>
              <button
                className="btn-save"
                onClick={onUpdateStatus}
                disabled={loading}
              >
                {loading ? "Updating..." : "Update Status"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
