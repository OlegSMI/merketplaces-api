import { Input } from "antd";
import { FileProtectOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";

import { addMpStatProducts } from "../redux/actions/mpStatProducts";
import { featchMpStats } from "../api";
import { useState } from "react";

function SettingsModal({ isOpen, onClose }) {
  const [token, setToken] = useState("");
  const dispatch = useDispatch();

  // if (!isOpen) return null;

  const onClickButton = async () => {
    dispatch(addMpStatProducts(await featchMpStats(token)));
    onClose();
  };

  return (
    <div className={`modal-overlay ${isOpen ? "open" : ""}`}>
      <div className={`modal-content ${isOpen ? "open" : ""}`}>
        <h2>Настройки</h2>
        <div className="token-search">
          <Input
            prefix={<FileProtectOutlined />}
            placeholder="Введите токен..."
            onChange={(e) => setToken(e.target.value)}
          />
        </div>
        <button className="buttonClose" type="button" onClick={onClickButton}>
          Отправить
        </button>
      </div>
    </div>
  );
}

export default SettingsModal;
