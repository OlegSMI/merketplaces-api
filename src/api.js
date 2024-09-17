import axios from "axios";

const api = axios.create({
  baseURL: "http://51.250.20.233:8085",
});

export const register = async (userData) => {
  const response = await api.post("/auth/register", userData);
  return response.data;
};

export const login = async (userData) => {
  const response = await api.post("/auth/verify", userData);
  return response.data;
};
