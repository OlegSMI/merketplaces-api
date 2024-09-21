import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Alert, AlertTitle, Stack } from "@mui/material";

import styles from "./Login.module.scss";
import { login } from "../../api/auth";
import { SignHeader } from "../../components";
import img from "../../assets/auth/Login.png";

const Login = () => {
  const [showAlert, setShowAlert] = useState(0);
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await login({ name, password });
      navigate("/user/main/table");
    } catch (error) {
      if (error?.response?.data?.errorCode === 10002) {
        setShowAlert(1);
      } else {
        setShowAlert(2);
      }
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
        <div className={styles.panel}>
          <form onSubmit={handleLogin} className={styles.form}>
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
          </form>
          <span className={styles.description}>
            Нет аккаунта?{" "}
            <Link className={styles.reg} to="/register">
              Зарегистрироваться
            </Link>
          </span>
        </div>
        {showAlert === 1 && (
          <Stack sx={{ width: "50%" }} spacing={2} className={styles.alert}>
            <Alert severity="info" className={styles.title}>
              <AlertTitle className={styles.text}>Внимание</AlertTitle>
              Не верный логин или пароль
            </Alert>
          </Stack>
        )}
        {showAlert === 2 && (
          <Stack sx={{ width: "50%" }} spacing={2} className={styles.alert}>
            <Alert severity="error" className={styles.title}>
              <AlertTitle className={styles.text}>Ошибка</AlertTitle>
              Ошибка авторизации
            </Alert>
          </Stack>
        )}
      </div>
    </>
  );
};

export default Login;
