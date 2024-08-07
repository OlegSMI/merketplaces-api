import { combineReducers } from "redux";

import mpStatProducts from "./mpStatProducts";
import tmApiProducts from "./tmApiProducts";

const rootReducer = combineReducers({
  mpStatProducts,
  tmApiProducts,
});

export default rootReducer;
