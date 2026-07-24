import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:3000/api/admin",
  withCredentials: true,
});

export const loginUser = async (email, password) => {
  const response = await instance.post("/login", {
    email,
    password,
  });

  return response.data;
};

export const registerUser = async (email, password) => {
  const response = await instance.post("/register", {
    email,
    password,
  });

  return response.data;
};

export const getMe = async () => {
  const response = await instance.get("/get-me");
  return response.data;
};
