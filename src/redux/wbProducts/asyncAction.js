import { createAsyncThunk } from "@reduxjs/toolkit";

import data from "../../json/myTest.json";

export const getWbProducts = createAsyncThunk(
  "products/featchProducts",
  async () => {
    const res = data.products;

    return res;
  }
);
