const ProductDetails = ({ productProps }) => {
  console.log(productProps);
  return (
    <div className="product-details">
      <h2>Характеристики продукта</h2>
      <ul>
        {productProps.map((prop, index) => (
          <li key={index} className="product-prop">
            <strong>{prop.name}:</strong> {prop.value}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductDetails;
