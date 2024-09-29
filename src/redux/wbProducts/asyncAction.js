import api from "@api/api";
import { createAsyncThunk } from "@reduxjs/toolkit";

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
        },
      }
    );
    console.log("response", response);
    return response.data.result;
  }
);
