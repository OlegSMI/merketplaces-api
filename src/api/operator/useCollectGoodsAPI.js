import api from "../api";

export const getHistory = async (limit, offset) => {
  const response = await api.get(
    `/serviceSession?&limit=${limit}&offset=${offset}`
  );
  return response.data.result.sessions;
};

export const getSessionStatus = async (sessionId) => {
  const response = await api.get(`/serviceSession/${sessionId}`);
  return response.data.result;
};

export const createSession = async () => {
  const response = await api.post(`/serviceSession`);
  return response.data.result.serviceId;
};

export const startSession = async (articles) => {
  const response = await api.post(`/serviceSessionstart/`, {
    wildberriesIds: articles,
  });
  return response.data.result;
};
