/* eslint-disable react/prop-types */
import { Card } from "antd";

const ProductCard = (props) => {
  return (
    <Card
      hoverable
      style={{ "min-width": 270 }}
      cover={<img alt="example" src={props.product.img} />}
      className="card-product"
    >
      <div className="card-content">
        <span className="card-title">{props.product.title}</span>
        <a target="_blank" href={props.product.product_url}>
          Ссылка на товар
        </a>
        <span className="card-price">{`Цена: ${props.product.price}¥`}</span>
      </div>
    </Card>
  );
};

export default ProductCard;
