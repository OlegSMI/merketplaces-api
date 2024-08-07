import { Header, Navbar, Card } from "../components";

import { useSelector } from "react-redux";

function Home() {
  const products = useSelector(({ mpStatProducts }) => mpStatProducts.items);
  return (
    <div className="home-container">
      <Header />
      <div className="card-container">
        {products.map((product) => (
          <Card key={product.id} {...product} />
        ))}
      </div>
    </div>
  );
}

export default Home;
