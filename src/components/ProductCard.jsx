/* eslint-disable react/prop-types */
import { Card } from "antd";

const { Meta } = Card;

const ProductCard = (props) => {
  return (
    <Card
      hoverable
      style={{ width: 240 }}
      cover={<img alt="example" src={props.product.img} />}
      className="card-product"
    >
      <Meta
        title={props.product.title}
        description={`Ссылка на товар: ${props.product.product_url} \n
      Цена: ${props.product.price}¥`}
      />
    </Card>
  );
};

export default ProductCard;
