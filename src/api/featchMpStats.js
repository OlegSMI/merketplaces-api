// import axios from "axios";

import data from "../json/mpStats.json";

const featchMpStats = async () => {
  try {
    // const res = await axios.get("../json/mpStats.json");
    const items = data.result.products;
    return items;
  } catch (error) {
    console.log("error", error);
  }
};

export default featchMpStats;
