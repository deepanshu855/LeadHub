import { useContext } from "react";
import { LeadContext } from "../LeadProvider";
import { createLead, getLeads, updateLead } from "../services/lead.api";

export const useLead = () => {
  const { leads, setLeads, loading, setLoading, error, setError } =
    useContext(LeadContext);

  const handleCreateLead = async ({ name, email, budgetRange, message }) => {
    try {
      setLoading(true);
      const data = await createLead({ name, email, budgetRange, message });
      return data;
    } catch (error) {
      setError(error.response?.data?.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  const handleGetLeads = async () => {
    try {
      setLoading(true);
      const data = await getLeads();
      setLeads(data.leads);
    } catch (error) {
      setError(error.response?.data?.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateLead = async (id, status) => {
    try {
      setLoading(true);
      const data = await updateLead(id, status);
      await handleGetLeads();
    } catch (error) {
      setError(error.response?.data?.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return {
    leads,
    loading,
    error,
    handleCreateLead,
    handleGetLeads,
    handleUpdateLead,
  };
};
