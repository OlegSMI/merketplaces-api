import axios from "axios";

const api = axios.create({
  baseURL: "http://51.250.20.233:8080",
});

export default api;
