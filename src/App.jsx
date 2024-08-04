import { Divider } from "antd";
import { useState } from "react";
import { ReactNotifications } from "react-notifications-component";
import "./App.css";
import Navbar from "./components/Navbar.jsx";
import ProductContainer from "./components/ProductContainer.jsx";
import { ErrorContext, LoadingContext, ProductsContext } from "./context.js";

function App() {
  const [isLoading, setLoading] = useState(false);
  const [isError, setError] = useState(false);
  const [products, setProducts] = useState([]);

  return (
    <LoadingContext.Provider value={{ isLoading, setLoading }}>
      <ErrorContext.Provider value={{ isError, setError }}>
        <ProductsContext.Provider value={{ products, setProducts }}>
          <ReactNotifications />
          <div className="App">
            <h1>Поиск похожих товаров</h1>
            <Navbar />
            <Divider
              style={{
                color: "white",
                fontWeight: "bold",
                fontSize: "20px",
                borderColor: "white",
              }}
            >
              Список товаров
            </Divider>
            <ProductContainer />
          </div>
        </ProductsContext.Provider>
      </ErrorContext.Provider>
    </LoadingContext.Provider>
  );
}

export default App;
