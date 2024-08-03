import { useState } from "react";
import "./App.css";
import Navbar from "./components/Navbar.jsx";
import ProductContainer from "./components/ProductContainer.jsx";
import { LoadingContext, ProductsContext } from "./context.js";

function App() {
  const [isLoading, setLoading] = useState([]);
  const [products, setProducts] = useState([]);

  return (
    <LoadingContext.Provider value={{ isLoading, setLoading }}>
      <ProductsContext.Provider value={{ products, setProducts }}>
        <div className="App">
          <h1>Поиск похожих товаров</h1>
          <Navbar />
          <ProductContainer />
        </div>
      </ProductsContext.Provider>
    </LoadingContext.Provider>
  );
}

export default App;
