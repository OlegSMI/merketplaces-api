import Cookies from "js-cookie";
import api from "../api";

const token = Cookies.get("token");

export const getGlobalCategories = async (limit, offset) => {
  const response = await api.get(
    `/mpstats/categories?limit=${limit}&offset=${offset}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data.result.categories;
};

export const createCategory = async ({ name, url, path }) => {
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

export const getCategories = async () => {
  const response = await api.get("/wildberries/categories", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data.result.categories;
};

// export const getProducts = async (
//   categoryName,
//   paybackPeriod,
//   investmentAmount
// ) => {
//   const response = await api.post(
//     "/wildberries/products",
//     {
//       categoryName: categoryName,
//       paybackPeriod: paybackPeriod,
//       investmentAmount: investmentAmount,
//     },
//     {
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${token}`,
//       },
//     }
//   );

//   return response.data.result.products;
// };

export const hideProductById = async (productId) => {
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

export const approvedProductById = async (productId) => {
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
