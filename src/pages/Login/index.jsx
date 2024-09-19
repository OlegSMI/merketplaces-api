import { Link } from "react-router-dom";
import { useState } from "react";

import styles from "./Login.module.scss";
import { login } from "../../api/authorization";
import { SignHeader } from "../../components";
import img from "../../assets/Login.png";

const Login = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    await login({ name, password });
  };

  return (
    <>
      <SignHeader />
      <div className={styles.container}>
        <div className={styles.img}>
          <h3 className={styles.title}>С возвращением!</h3>
          <p className={styles.text}>Давайте приступим к работе</p>
          <img src={img} alt="img" />
        </div>
        <div className={styles.form}>
          <input
            type="email"
            placeholder="email"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="password"
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button onClick={handleLogin}>Войти</button>
          <span className={styles.description}>
            Нет аккаунта?{" "}
            <Link className={styles.reg} to="/register">
              Зарегистрироваться
            </Link>
          </span>
        </div>
      </div>
    </>
  );
};

export default Login;
