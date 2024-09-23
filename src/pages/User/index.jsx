import { Routes, Route } from "react-router-dom";

import styles from "./User.module.scss";
import { SideBar } from "../../components";
import { Main, FinPlan, ProdInfo, Profile, Categories } from "../";

const User = () => {
  return (
    <div className={styles.container}>
      <SideBar />

      <div className={styles.content}>
        <Routes>
          <Route path="/main/*" element={<Main />} />
          <Route path="/prodinfo" element={<ProdInfo />} />
          {/* <Route path="/categories" element={<FinPlan />} /> */}
          <Route path="/categories" element={<Categories />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </div>
    </div>
  );
};

export default User;
