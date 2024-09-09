import { Link } from "react-router-dom";

import styles from "./Registration.module.scss";
import { SignHeader } from "../../components";
import img from "../../assest/Registration.png";

const Registration = () => {
  return (
    <>
      <SignHeader />
      <div className={styles.container}>
        <div className={styles.img}>
          <h3 className={styles.title}>Нет аккаунта?</h3>
          <p className={styles.text}>Зарегистрируйтесь для начала работы </p>
          <img src={img} alt="img" />
        </div>
        <div className={styles.form}>
          <input type="email" placeholder="email" />
          <input type="password" placeholder="password" />
          <button>Войти</button>
          <span className={styles.description}>
            Уже есть аккаунт?{" "}
            <Link className={styles.reg} to="/login">
              Войти
            </Link>
          </span>
        </div>
      </div>
    </>
  );
};

export default Registration;
