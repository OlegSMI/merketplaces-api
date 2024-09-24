import Cookies from "js-cookie";
import api from "../api";

const useChinaAPI = () => {
  const token = Cookies.get("token");

  const getProductsByImage = async (productId) => {
    const response = await api.get(
      `collection/products?WBProductId=${productId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data.result.products;
  };

  const getInfoProductById = async (productId) => {
    const response = await api.get(`collection/product/${productId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.result;
  };

  const hideProductById = async (productId) => {
    const response = await api.post(`/collection/product/${productId}/reject`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.result;
  };

  const approveProductById = async (productId) => {
    const response = await api.post(
      `/collection/product/${productId}/approve`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.result;
  };

  return {
    getProductsByImage,
    getInfoProductById,
    hideProductById,
    approveProductById,
  };
};

export default useChinaAPI;
