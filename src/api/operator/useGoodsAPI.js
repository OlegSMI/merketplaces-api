import Cookies from "js-cookie";
import api from "../api";

const useGoodsAPI = () => {
  const token = Cookies.get("token");

  const getCategories = async () => {
    const response = await api.get("/mpstats/categories", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log(response);
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

    console.log(response);
    return response.result.products;
  };

  // const getProductCardById = () => {};

  const hideProductById = () => {};

  const editProductById = () => {};

  return {
    getCategories,
    getProducts,
    // getProductCardById,
    hideProductById,
    editProductById,
  };
};

export default useGoodsAPI;
