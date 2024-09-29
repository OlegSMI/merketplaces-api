import { Route, Routes } from "react-router-dom";

import { Categories, Main, ProdInfo } from "@pages";
import { ProtectedRoute, SideBar } from "../../components";
import { CollectGoods } from "../CollectGoods";
import styles from "./Admin.module.scss";

const User = () => {
  return (
    <div className={styles.container}>
      <SideBar />

      <div className={styles.content}>
        <Routes>
          <Route
            path="/main/*"
            element={
              <ProtectedRoute>
                <Main />
              </ProtectedRoute>
            }
          />

          <Route
            path="/prodinfo"
            element={
              <ProtectedRoute>
                <ProdInfo />
              </ProtectedRoute>
            }
          />
          {/* <Route path="/categories" element={<FinPlan />} /> */}
          <Route
            path="/categories"
            element={
              <ProtectedRoute>
                <Categories />
              </ProtectedRoute>
            }
          />
          <Route
            path="/collect-goods"
            element={
              <ProtectedRoute>
                <CollectGoods />
              </ProtectedRoute>
            }
          />
          {/* <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          /> */}
        </Routes>
      </div>
    </div>
  );
};

export default User;
