import { configureStore } from "@reduxjs/toolkit";
import wbProducts from "./wbProducts/slice";
import wbCategories from "./wbCategories/slice";
import globalCategories from "./globalCategories/slice";

const store = configureStore({
  reducer: {
    wbProducts,
    wbCategories,
    globalCategories,
  },
});

export default store;
