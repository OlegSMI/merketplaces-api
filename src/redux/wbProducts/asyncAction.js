import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "@api/api";
import Cookies from "js-cookie";

export const getWbProducts = createAsyncThunk(
  "products/fetchProducts",
  async ({ categoryName, paybackPeriod, investmentAmount }) => {
    const response = await api.post(
      "/wildberries/products",
      {
        categoryName,
        paybackPeriod,
        investmentAmount,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
      }
    );
    console.log("response", response);
    return response.data.result;
  }
);
