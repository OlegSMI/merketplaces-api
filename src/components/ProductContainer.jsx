// import axios from "axios";
import { useContext } from "react";
import { ErrorContext } from "../context.js";
import ProductCard from "./ProductCard.jsx";
import { LoadingContext, ProductsContext } from "/src/context.js";

const ProductContainer = () => {
  const { products } = useContext(ProductsContext);
  const { isLoading } = useContext(LoadingContext);
  const { isError } = useContext(ErrorContext);

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (isError) {
    return <div>Ошибка запроса</div>;
  } else if (products.length === 0) {
    return <div>Нет элементов</div>;
  } else {
    return (
      <div className="row-products">
        {products.map((product) => (
          <div key={product.item_id} className="gutter-row">
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    );
  }
};

export default ProductContainer;
