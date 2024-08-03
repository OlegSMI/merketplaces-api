// import axios from "axios";
import { Col } from "antd";
import { useContext } from "react";
import ProductCard from "./ProductCard.jsx";
import { ProductsContext } from "/src/context.js";

const ProductContainer = () => {
  const { products } = useContext(ProductsContext);

  if (products.length === 0) {
    return <div>Нет элементов</div>;
  } else {
    return (
      <div className="row-products">
        {products.map((product) => (
          <Col key={product.item_id} className="gutter-row" span={5}>
            <ProductCard product={product} />
          </Col>
        ))}
      </div>
    );
  }
};

export default ProductContainer;
