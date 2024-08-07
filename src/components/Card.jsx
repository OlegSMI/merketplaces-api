// import React from "react";

function Card(product) {
  console.log("card", product);
  return (
    <div className="card">
      <img className="image" src={product.thumb} alt={product.name} />
      <h2 className="title">{product.name}</h2>
      <p className="brand">Бренд: {product.brand}</p>
      <p className="color">Цвет: {product.color}</p>
      <p className="rating">Рейтинг: {product.rating} ★</p>
      <p className="price">
        Цена: <span className="clientPrice">{product.clientPrice}₽</span>
        <span className="basicPrice">{product.basicPrice}₽</span>
      </p>
      <p className="country">Страна: {product.country}</p>
      <button className="button">Купить</button>
    </div>
  );
}

export default Card;
