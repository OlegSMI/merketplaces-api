import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CircularProgress } from "@mui/material";
import { useSnackbar } from "notistack";

import { login } from "../../api/auth";
import img from "../../assets/auth/Login.png";
import { SignHeader } from "../../components";
import { LoadingContext } from "../../context";
import styles from "./Login.module.scss";

const Login = () => {
  const { enqueueSnackbar } = useSnackbar();

  const [name, setName] = useState("");
  // const [error, setError] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const { loading, setLoading } = useContext(LoadingContext);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await login({ name, password });
      navigate("/user/main/table");
    } catch (error) {
      if (error?.response?.data?.errorCode === 10002) {
        enqueueSnackbar("Неверный логин или пароль", {
          variant: "error",
          anchorOrigin: { vertical: "top", horizontal: "right" },
        });
      } else
        enqueueSnackbar(error.response?.data?.message || "Ошибка авторизации", {
          variant: "error",
          anchorOrigin: { vertical: "top", horizontal: "right" },
        });
    } finally {
      setLoading(false);
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
            {loading ? (
              <button>
                <CircularProgress size="30px" color="white" />
              </button>
            ) : (
              <button onClick={handleLogin}>Войти</button>
            )}
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
