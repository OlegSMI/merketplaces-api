import { useSearch } from "../api";
import { Card, CardModal, CardSceleton, Header } from "../components";

import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

function Home() {
  const [cardModalOpen, setCardModalOpen] = useState(false);
  const [selectProduct, setSelectProduct] = useState({});
  const [token, setToken] = useState("");
  const [loader, setLoader] = useState(null);
  const { getTranslating, getProductById } = useSearch();

  const openModal = () => setCardModalOpen(true);
  const closeModal = () => setCardModalOpen(false);

  const onClickCard = (product) => {
    setSelectProduct(product);
    openModal();
  };

  const translateToRus = async (text) => {
    const textTr = await getTranslating("en", "ru", text);
    return textTr;
  };

  useEffect(() => {
    const translate = async () => {
      const data = await await translateToRus("You is so loser");
      console.log(data);
    };

    const getInfo = async () => {
      const info = await getProductById(
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VybmFtZSI6InNkZmRmIiwiQ29taWQiOm51bGwsIlJvbGVpZCI6bnVsbCwiaXNzIjoidG1hcGkiLCJzdWIiOiJzZGZkZiIsImF1ZCI6WyIiXSwiaWF0IjoxNzIzMTE3MjMyfQ.E9jw5blyEIvwoZrmJ2ZpuQtFgzfa5PyVof-mza1IL2s",
        777715039521
      );
      console.log(info);
    };

    getInfo();
    translate();
  }, []);

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
                    selectCard={(id) => onClickCard(product)}
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
