import { createAsyncThunk } from "@reduxjs/toolkit";
import data from "../../json/myTest.json";

export const getWbProducts = createAsyncThunk(
  "products/fetchProducts",
  async ({ page = 1, limit = 5 }) => {
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const products = data.products.slice(startIndex, endIndex);
    return {
      products,
      totalPages: Math.ceil(data.products.length / limit),
    };
  }
);
