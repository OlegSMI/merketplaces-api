import axios from "axios";

const featchCategoryProducts = async (category) => {
  try {
    const res = await axios.post(
      "http://51.250.20.233:8090/mpstats/categories/products",
      {
        path: category,
        startDate: "2024-08-08",
        endDate: "2024-08-08",
        limit: 4,
        offset: 2147483647,
      }
    );

    return res.data.result.products;
  } catch (error) {
    console.log("Ошибка запроса", error);
  }
};

export default featchCategoryProducts;
