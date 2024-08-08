import { Header, Card, CardModal } from "../components";
import { featchTmApi } from "../api";

import { useSelector } from "react-redux";
import { useState } from "react";

function Home() {
  const [cardModalOpen, setCardModalOpen] = useState(false);
  const [selectProduct, setSelectProduct] = useState({});
  const [token, setToken] = useState("");

  const openModal = () => setCardModalOpen(true);
  const closeModal = () => setCardModalOpen(false);

  const onClickCard = (id) => {
    setSelectProduct(products[id]);
    openModal();
  };

  const products = useSelector(({ mpStatProducts }) => mpStatProducts.items);

  return (
    <div className="home-container">
      <Header token={token} setToken={setToken} />
      {token ? (
        <>
          <div className="card-container">
            {products.map((product) => (
              <Card
                key={product.id}
                {...product}
                selectCard={(id) => onClickCard(id)}
              />
            ))}
          </div>
          {cardModalOpen && (
            <CardModal
              token={token}
              selectProduct={selectProduct}
              isOpen={cardModalOpen}
              closeModal={closeModal}
            />
          )}
        </>
      ) : (
        <h2 className="card-container__empty">Введите токен в настройках</h2>
      )}
    </div>
  );
}

export default Home;
