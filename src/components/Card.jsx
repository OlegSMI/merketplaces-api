// import React from "react";

function Card({
  id,
  name,
  brand,
  color,
  rating,
  clientPrice,
  basicPrice,
  country,
  thumb,
  selectCard,
}) {
  const onClickCard = () => {
    selectCard(id);
  };

  return (
    <div className="card" onClick={onClickCard}>
      <img className="image" src={thumb} alt={name} />
      <h2 className="title">{name}</h2>
      <p className="brand">Бренд: {brand}</p>
      <p className="color">Цвет: {color}</p>
      <p className="rating">Рейтинг: ★{rating}</p>
      <p className="price">
        Цена: <span className="clientPrice">{clientPrice}₽</span>
        <span className="basicPrice">{basicPrice}₽</span>
      </p>
      <p className="country">Страна: {country}</p>
      <button className="button">В корзину</button>
    </div>
  );
}

export default Card;
