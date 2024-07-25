// import axios from "axios";
import React, { useState } from "react";
import ProductCard from "./ProductCard";

const ProductContainer = () => {
  const [products, setProducts] = useState([]);

  // React.useEffect(() => {
  //   axios
  //     .get("https://66910f4126c2a69f6e8e426e.mockapi.io/test/products")
  //     .then((response) => {
  //       setProducts(response.data);
  //     })
  //     .catch((error) => {
  //       alert("Произошла ошибка при запросе данных");
  //       console.log(error);
  //     });
  // }, []);

  React.useEffect(() => {
    let url = "/src/data.json";
    fetch(url)
      .then((res) => res.json())
      .then((prod) => setProducts(prod.result.items));
  }, []);

  return (
    <>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </>
  );
};

export default ProductContainer;
