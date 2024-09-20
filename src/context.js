import React from "react";

export const ProductsContext = React.createContext([]);

export const LoadingContext = React.createContext({
  loading: false,
  setLoading: () => {},
});

export const ErrorContext = React.createContext(false);
