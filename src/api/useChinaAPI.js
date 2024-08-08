import axios from "axios";
import { useContext } from "react";
import { ErrorContext, LoadingContext } from "../context";

const useSearch = () => {
  const { setLoading } = useContext(LoadingContext);
  const { setError } = useContext(ErrorContext);
  const url = "http://51.250.20.233:8090/stand/";

  const getImages = async (token, image) => {
    try {
      const res = await axios.get(
        `${url}products?api_token=${token}&img_url=${image}`
      );

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

  const getTranslating = async (fromLang, toLang, text) => {
    const requestBody = {
      fromLang: fromLang,
      toLang: toLang,
      text: text,
    };

    try {
      const res = await axios.post(`${url}translate`, requestBody);

      const { text } = res.data.result;
      return text;
    } catch (error) {
      return error;
    }
  };

  const getProductById = async (token, itemID) => {
    try {
      const res = await axios.get(
        `${url}products/${itemID}?api_token=${token}`
      );

      const { info } = res;

      console.log(info);
      setError(false);
      return info;
    } catch (error) {
      setError(true);
      return error;
    } finally {
      setLoading(false);
    }
  };

  return {
    getImages,
    getTranslating,
    getProductById,
  };
};

export default useSearch;
