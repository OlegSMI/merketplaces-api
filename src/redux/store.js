import { configureStore } from "@reduxjs/toolkit";
import wbProducts from "./wbProducts/slice";

const store = configureStore({
  reducer: {
    wbProducts,
  },
});

export default store;
