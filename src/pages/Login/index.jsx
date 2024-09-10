import { Link } from "react-router-dom";

import styles from "./Login.module.scss";
import { SignHeader } from "../../components";
import img from "../../assets/Login.png";

const Login = () => {
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
          <input type="email" placeholder="email" />
          <input type="password" placeholder="password" />
          <button>Войти</button>
          <span className={styles.description}>
            Нет аккаунта?{" "}
            <Link className={styles.reg} to="/registration">
              Зарегистрироваться
            </Link>
          </span>
        </div>
      </div>
    </>
  );
};

export default Login;
