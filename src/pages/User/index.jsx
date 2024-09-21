import { Routes, Route } from "react-router-dom";

import styles from "./User.module.scss";
import { SideBar } from "../../components";
import { Main, FinPlan, ProdInfo, Profile } from "../";

const User = () => {
  return (
    <div className={styles.container}>
      <SideBar />

      <div className={styles.content}>
        <Routes>
          <Route path="/main/*" element={<Main />} />
          <Route path="/prodinfo" element={<ProdInfo />} />
          <Route path="/finplan" element={<FinPlan />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </div>
    </div>
  );
};

export default User;
