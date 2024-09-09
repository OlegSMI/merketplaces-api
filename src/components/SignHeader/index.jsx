import styles from "./SignHeader.module.scss";

const SignHeader = () => {
  return (
    <div className={styles.container}>
      <div className={styles.logo}>UStats</div>
      <div className={styles.fields}>
        <p>Возможности</p>
        <p>О сервисе</p>
        <p>Контакты</p>
      </div>
    </div>
  );
};

export default SignHeader;
