import { featchTmApi } from "../api";
import { addTmApiProducts } from "../redux/actions/tmApiProducts";
import { CardSceleton } from "./";

import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

function CardModal({ isOpen, token, selectProduct, closeModal }) {
  const [loader, setLoader] = useState(true);
  const dispatch = useDispatch();
  const products = useSelector(({ tmApiProducts }) => tmApiProducts.items);

  useEffect(() => {
    const fetchData = async () => {
      const data = await featchTmApi(token, selectProduct.thumb);
      dispatch(addTmApiProducts(data));
      setLoader(false);
    };

    fetchData();
  }, []);

  return (
    <div className={`modal-overlay ${isOpen ? "open" : ""}`}>
      <div className={`modal-content ${isOpen ? "open" : ""}`}>
        <h1>Аналоги в китае</h1>
        <div className="cardModal-container">
          {loader
            ? [...Array(8)].map((item, index) => <CardSceleton key={index} />)
            : products.map((product) => (
                <div
                  key={product.item_id}
                  className="cardModal-container__card"
                >
                  <img
                    src={product.img}
                    alt={product.title}
                    className="cardModal-container__image"
                  />
                  <h2 className="cardModal-container__title">
                    {product.title}
                  </h2>
                  <p className="cardModal-container__price">
                    Цена: {product.price} ¥
                  </p>
                  <p className="cardModal-container__quantity">
                    Минимальное количество: {product.quantity_begin}
                  </p>
                  <p className="cardModal-container__rating">
                    Рейтинг: {product.goods_score} / 5
                  </p>
                  <a
                    href={product.product_url}
                    className="cardModal-container__button"
                  >
                    Смотреть товар
                  </a>
                </div>
              ))}
        </div>
        <button
          className="cardModal-container__buttonClose"
          onClick={closeModal}
        >
          Закрыть
        </button>
      </div>
    </div>
  );
}

export default CardModal;
