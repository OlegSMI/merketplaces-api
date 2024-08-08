import axios from "axios";
// import data from "../json/categories.json";

const featchCategories = async () => {
  try {
    const res = await axios.get(
      "http://51.250.20.233:8090/mpstats/categories?limit=4&offset=0",
      {
        headers: {
          Accept: "application/json",
        },
      }
    );

    return res.data.result.categories;
  } catch (error) {
    console.log("Ошибка запроса -> ", error);
  }
};

export default featchCategories;
