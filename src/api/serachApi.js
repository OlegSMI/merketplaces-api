import axios from "axios";

export const useSearch = () => {
  const url = "http://51.250.20.233:8090/stand/products";
  const getImages = async (image) => {
    try {
      const res = await axios.get(
        `${url}?api_token=${import.meta.env.VITE_TOKEN}&img_url=${image}`
      );

      const { items } = res.data.result;

      return items;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  return {
    getImages,
  };
};
