import { Header, Navbar, Card, CardModal } from "../components";

import { useSelector } from "react-redux";
import { useState } from "react";

function Home() {
  const [cardModalOpen, setCardModalOpen] = useState(false);
  const [selectProduct, setSelectProduct] = useState({});

  const openModal = () => setCardModalOpen(true);
  const closeModal = () => setCardModalOpen(false);

  const onClickCard = (id) => {
    // console.log(products[id]);
    setSelectProduct(products[id]);
    openModal();
  };

  const products = useSelector(({ mpStatProducts }) => mpStatProducts.items);

  return (
    <div className="home-container">
      <Header />
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
          product={selectProduct}
          isOpen={cardModalOpen}
          closeModal={closeModal}
        />
      )}
    </div>
  );
}

export default Home;
