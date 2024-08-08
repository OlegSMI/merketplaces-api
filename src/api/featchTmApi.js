// import axios from 'axios'
import data from "../json/tmApi.json";

const featchTmApi = async (token, image) => {
  try {
    const items = data.result.items;
    return items;
  } catch (error) {
    console.log(error);
  }
};

export default featchTmApi;
