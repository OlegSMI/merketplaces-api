import { Header, Card, CardModal, CardSceleton } from "../components";
import { featchTmApi } from "../api";

import { useSelector } from "react-redux";
import { useState } from "react";

function Home() {
  const [cardModalOpen, setCardModalOpen] = useState(false);
  const [selectProduct, setSelectProduct] = useState({});
  const [token, setToken] = useState("");
  const [loader, setLoader] = useState(null);

  const openModal = () => setCardModalOpen(true);
  const closeModal = () => setCardModalOpen(false);

  const onClickCard = (id) => {
    setSelectProduct(products[id]);
    openModal();
  };

  const products = useSelector(({ mpStatProducts }) => mpStatProducts.items);

  return (
    <div className="home-container">
      <Header setLoader={setLoader} token={token} setToken={setToken} />
      {token ? (
        <>
          {loader === null ? (
            <h2 className="card-container__empty">Выберите категорию</h2>
          ) : loader === true ? (
            [...Array(8)].map((item, index) => <CardSceleton key={index} />)
          ) : (
            loader === false && (
              <div className="card-container">
                {products.map((product) => (
                  <Card
                    key={product.id}
                    {...product}
                    selectCard={(id) => onClickCard(id)}
                  />
                ))}
              </div>
            )
          )}
        </>
      ) : (
        <h2 className="card-container__empty">Введите токен в настройках</h2>
      )}

      {cardModalOpen && (
        <CardModal
          token={token}
          selectProduct={selectProduct}
          isOpen={cardModalOpen}
          closeModal={closeModal}
        />
      )}
    </div>
  );
}

export default Home;
