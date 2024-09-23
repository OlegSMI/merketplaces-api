import Cookies from "js-cookie";
import api from "../api";

const useGoodsAPI = () => {
  const token = Cookies.get("token");

  const getGlobalCategories = async () => {
    const response = await api.get("/mpstats/categories", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  };

  const createCategory = async ({ name, url, path }) => {
    const newCategory = {
      path: path,
      url: url,
      name: name,
    };

    const response = await api.post("/wildberries/category", newCategory, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    return response.result.products;
  };

  const getCategories = async () => {
    const response = await api.get("/wildberries/categories", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  };

  const getProducts = async (categoryName, paybackPeriod, investmentAmount) => {
    const response = await api.post(
      "/wildberries/products",
      {
        categoryName: categoryName,
        paybackPeriod: paybackPeriod,
        investmentAmount: investmentAmount,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.result.products;
  };

  const hideProductById = async (productId) => {
    const response = await api.delete(
      `/wildberries/product/${productId}`,

      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response;
  };

  const approvedProductById = async (productId) => {
    const response = await api.post(
      `/wildberries/product/${productId}/approve`,
      {
        productId: productId,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response;
  };

  return {
    getGlobalCategories,
    createCategory,
    getCategories,
    getProducts,
    hideProductById,
    approvedProductById,
  };
};

export default useGoodsAPI;
