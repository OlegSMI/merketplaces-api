const initialState = {
  items: [],
};

const addTmApiProducts = (state = initialState, action) => {
  if (action.type === "SET_ADD_TMAPI_PRODUCTS") {
    console.log("redux", action.payload);
    return {
      ...state,
      items: [...action.payload],
    };
  }
  return state;
};

export default addTmApiProducts;
