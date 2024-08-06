import { Input } from "antd";
import { FileProtectOutlined } from "@ant-design/icons";

function SettingsModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className={`modal-overlay ${isOpen ? "open" : ""}`}>
      <div className={`modal-content ${isOpen ? "open" : ""}`}>
        <h2>Настройки</h2>
        <div className="token-search">
          <Input
            prefix={<FileProtectOutlined />}
            placeholder="Введите токен..."
            // onChange={(e) => setToken(e.target.value)}
            onChange={(e) => console.log(e.target.value)}
          />
        </div>
        <button className="buttonClose" type="button" onClick={onClose}>
          Закрыть
        </button>
      </div>
    </div>
  );
}

export default SettingsModal;
