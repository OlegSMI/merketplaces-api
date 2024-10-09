import axios from "axios";
import Cookies from "js-cookie";

const token = Cookies.get("token");

const api = axios.create({
  // baseURL: import.meta.env.VITE_HOST,
  baseURL: "https://productscollector-diggingware-apps.apps.dev.fly-teh.ru",
});

api.defaults.headers.common["Authorization"] = `Bearer ${token}`;

export default api;
