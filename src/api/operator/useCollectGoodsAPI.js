import api from "../api";
import Cookies from "js-cookie";

export const getHistory = async (limit, offset) => {
  const response = await api.get(
    `/serviceSession?limit=${limit}&offset=${offset}`,
    {
      headers: {
        Authorization: `Bearer ${Cookies.get("token")}`,
      },
    }
  );
  return response.data.result.sessions;
};

export const getSessionStatus = async (sessionId) => {
  const response = await api.get(`/serviceSession/${sessionId}`, {
    headers: {
      Authorization: `Bearer ${Cookies.get("token")}`,
    },
  });
  return response.data.result;
};

export const createSession = async () => {
  const response = await api.post(`/serviceSession`, {
    headers: {
      Authorization: `Bearer ${Cookies.get("token")}`,
    },
  });
  return response.data.result.serviceId;
};

export const startSession = async (articles) => {
  const response = await api.post(
    `/serviceSessionstart`,
    {
      wildberriesIds: articles,
    },
    {
      headers: {
        Authorization: `Bearer ${Cookies.get("token")}`,
      },
    }
  );
  return response.data.result;
};

export const getWbProducts = async (limit, offset, sessionId) => {
  const response = await api.get(
    `/storage/wb/session/products?limit=${limit}&offset=${offset}&serviceSessionId=${sessionId}`,
    {
      headers: {
        Authorization: `Bearer ${Cookies.get("token")}`,
      },
    }
  );
  return response.data.result.products;
};

export const getAlibabaProducts = async (wbProductId) => {
  const response = await api.get(
    `/storage/alibaba/session/products?WBProductId=${wbProductId}`,
    {
      headers: {
        Authorization: `Bearer ${Cookies.get("token")}`,
      },
    }
  );
  return response.data.result.products;
};

export const createExcel = async (sessionId) => {
  const response = await api.post(
    `/serviceSession/${sessionId}/exportExcel`,
    null,
    {
      headers: {
        Authorization: `Bearer ${Cookies.get("token")}`,
      },
      responseType: "blob",
    }
  );

  return response;
};

export const rejectAlibabaProduct = async (productId) => {
  const response = await api.post(
    `/storage/alibaba/product/${productId}/reject`,
    {
      headers: {
        Authorization: `Bearer ${Cookies.get("token")}`,
      },
    }
  );
  return response.data;
};

export const approveAlibabaProduct = async (productId) => {
  const response = await api.post(
    `/storage/alibaba/product/${productId}/approve`,
    {
      headers: {
        Authorization: `Bearer ${Cookies.get("token")}`,
      },
    }
  );
  return response.data;
};

export const setWeightProduct = async (sessionId, productId, weight) => {
  console.log("startZapros", sessionId, productId, weight);
  const response = await api.post(
    `/serviceSession/${sessionId}/setDefaultWeight`,
    {
      wbId: productId,
      defaultWeight: weight,
    },
    {
      headers: {
        Authorization: `Bearer ${Cookies.get("token")}`,
      },
    }
  );

  return response.data;
};
