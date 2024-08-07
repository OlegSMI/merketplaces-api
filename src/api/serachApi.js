import axios from "axios";
import { useContext } from "react";
import { ErrorContext, LoadingContext } from "../context";

const useSearch = () => {
  const { setLoading } = useContext(LoadingContext);
  const { setError } = useContext(ErrorContext);
  const url = "http://51.250.20.233:8090/stand/products";
  const getImages = async (token, image) => {
    try {
      const res = await axios.get(`${url}?api_token=${token}&img_url=${image}`);

      const { items } = res.data.result;
      setError(false);
      return items;
    } catch (error) {
      setError(true);
      return error;
    } finally {
      setLoading(false);
    }
  };

  return {
    getImages,
  };
};

export default useSearch;
