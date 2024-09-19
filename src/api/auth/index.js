import Cookies from "js-cookie";
import axios from "axios";

import api from "../api";

export const register = async () => {};

export const login = async (userData) => {
  const response = await api.post("/auth/verify", {
    login: userData.name,
    password: userData.password,
  });

  axios.defaults.headers.common["Authorization"] = `Bearer ${response.access}`;
  Cookies.set("token", response.data.result.access);
  Cookies.set("refreshToken", response.data.result.refresh);
  return response.data;
};

export const refresh = async () => {
  axios.defaults.headers.common["Authorization"] = `Bearer ${Cookies.get(
    "refreshToken"
  )}`;

  try {
    const response = await api.post("/token/refresh", {
      refresh: Cookies.get("refreshToken"),
    });
    axios.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${response.access}`;
    Cookies.set("token", response.access);
    Cookies.set("refreshToken", response.refresh);
  } catch (error) {
    console.error(error);
    alert(error.response?.data?.message || "Ошибка обновления токена");
  }
};

export const logout = () => {
  Cookies.remove("token");
  Cookies.remove("refreshToken");
  delete axios.defaults.headers.common["Authorization"];
};
