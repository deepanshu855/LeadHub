import React from "react";
import { createContext } from "react";
import { useState } from "react";

export const LeadContext = createContext();

const LeadProvider = ({ children }) => {
  const [leads, setLeads] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  return (
    <LeadContext.Provider
      value={{ leads, setLeads, loading, setLoading, error, setError }}
    >
      {children}
    </LeadContext.Provider>
  );
};

export default LeadProvider;
