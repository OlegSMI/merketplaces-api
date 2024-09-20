import { Routes, Route } from "react-router-dom";

import styles from "./User.module.scss";
import { SideBar } from "../../components";
import { Main, FinPlan, ProdInfo } from "../";

const User = () => {
  return (
    <div className={styles.container}>
      <SideBar />

      <div className={styles.content}>
        <Routes>
          <Route path="/main/*" element={<Main />} />
          <Route path="/prodinfo" element={<ProdInfo />} />
          <Route path="/finplan" element={<FinPlan />} />
          <Route path="/profile" element={<div>Profile</div>} />
        </Routes>
      </div>
    </div>
  );
};

export default User;
