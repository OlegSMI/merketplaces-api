import { SearchOutlined } from "@ant-design/icons";
import { useContext, useState } from "react";
import { useSearch } from "../api/serachApi";

import { Button, Input, Space } from "antd";
import { ProductsContext } from "../context";

const Nav = () => {
  const { setProducts } = useContext(ProductsContext);
  const { getImages } = useSearch();

  const [photoUrl, setPhotoUrl] = useState("");
  const [token, setToken] = useState("");

  const handleClick = async () => {
    const items = await getImages(token, photoUrl);
    setProducts(items);
  };

  return (
    <div style={{ margin: "20px" }}>
      <Input
        placeholder="Введите токен..."
        onChange={(e) => setToken(e.target.value)}
        style={{ "margin-bottom": "20px" }}
      />
      <Space.Compact style={{ width: "100%" }}>
        <Input
          prefix={<SearchOutlined />}
          placeholder="Введите ссылку на фото для поиска..."
          onChange={(e) => setPhotoUrl(e.target.value)}
        />
        <Button onClick={() => handleClick()} type="primary">
          Найти
        </Button>
      </Space.Compact>
    </div>
  );
};

export default Nav;
