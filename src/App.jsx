import { useState } from "react";
import "./App.css";
import Navbar from "./components/Navbar.jsx";
import ProductContainer from "./components/ProductContainer.jsx";
import { ProductsContext } from "./context.js";

function App() {
  const [products, setProducts] = useState([]);

  return (
    <ProductsContext.Provider value={{ products, setProducts }}>
      <div className="App">
        <Navbar />
        <ProductContainer />
      </div>
    </ProductsContext.Provider>
  );
}

export default App;
