import Cookies from "js-cookie";
import api from "../api";

const useSearch = () => {
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

    return response.result;
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

  const editProductById = async (productId) => {
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
    editProductById,
  };
};

export default useSearch;
