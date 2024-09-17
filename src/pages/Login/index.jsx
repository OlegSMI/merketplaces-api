import { Link } from "react-router-dom";
import { useState } from "react";
import Cookies from "js-cookie";

import styles from "./Login.module.scss";
import { login } from "../../api";
import { SignHeader } from "../../components";
import img from "../../assets/Login.png";

const Login = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const data = await login({ name, password });
      Cookies.set("token", data.token); // Сохраните токен в cookies
      alert("Авторизация успешна!");
    } catch (error) {
      console.error(error);
      alert("Ошибка авторизации");
    }
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
          <form onSubmit={handleLogin}>
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
            <button type="submit">Войти</button>
          </form>
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
