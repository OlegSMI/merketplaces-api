import api from "../api";

export const getSessionId = async () => {
  const response = await api.get("/mpstats/session");
  return response.data.result.sessionId;
};

export const getSessionState = async (sessionId) => {
  const response = await api.get(`/mpstats/session/${sessionId}`);
  return response.data.result.sessionState;
};

export const getAllHistory = async () => {
  const response = await api.get(`/mpstats/history/`);
  return response.data.result.history;
};

export const getCollections = async (sessionId) => {
  const response = await api.get(`/mpstats/session/${sessionId}/collections`);
  return response.data.result.collections;
};

export const getExel = async (sessionId) => {
  const response = await api.get(`/mpstats/session/${sessionId}/exel`);
  return response.data.result.exel;
};
