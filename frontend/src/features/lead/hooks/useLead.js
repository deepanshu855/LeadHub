import { useContext } from "react";
import { LeadContext } from "../LeadProvider";
import { createLead, getLeads, updateLead } from "../services/lead.api";
import { toast } from "react-toastify";

export const useLead = () => {
  const { leads, setLeads, loading, setLoading, error, setError } =
    useContext(LeadContext);

  const handleCreateLead = async ({ name, email, budgetRange, message }) => {
    try {
      setLoading(true);
      const data = await createLead({ name, email, budgetRange, message });
      toast.success("Lead created!", {
        autoClose: 1000,
      });
      return data;
    } catch (error) {
      setError(error.response?.data?.message || "Something went wrong.");
      toast.error(error.response?.data?.message || "Something went wrong.", {
        autoClose: 2000,
      });
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
      toast.success("Lead updated!", {
        autoClose: 1000,
      });
    } catch (error) {
      setError(error.response?.data?.message || "Something went wrong.");
      toast.error(error.response?.data?.message || "Something went wrong.", {
        autoClose: 2000,
      });
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
