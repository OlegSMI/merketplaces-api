import axios from "axios";
import Cookies from "js-cookie";

const token = Cookies.get("token");

const api = axios.create({
  baseURL: "http://84.201.155.146:8080/",
});

api.defaults.headers.common["Authorization"] = `Bearer ${token}`;

export default api;
