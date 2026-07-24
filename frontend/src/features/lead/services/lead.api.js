import axios from "axios";

const instance = axios.create({
  baseURL: "https://leadhub-vouo.onrender.com/api/leads",
  withCredentials: true,
});

export const createLead = async ({ name, email, budgetRange, message }) => {
  const response = await instance.post("/", {
    name,
    email,
    budgetRange,
    message,
  });
  return response.data;
};

export const getLeads = async () => {
  const response = await instance.get("/");
  return response.data;
};

export const updateLead = async (id, status) => {
  const response = await instance.patch(`/${id}/status`, {
    status,
  });
  return response.data;
};
