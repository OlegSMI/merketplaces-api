import data from "../json/wb.json";

const featchWbProduct = async () => {
  try {
    const res = data.result.productProps;
    console.log("res", res);
    return res;
  } catch (error) {
    console.log("error", error);
  }
};

export default featchWbProduct;
