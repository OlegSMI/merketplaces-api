import { Route, Routes } from "react-router-dom";

import { ProtectedRoute, SideBar } from "../../components";
import styles from "./Admin.module.scss";
import { Main, ProdInfo, Categories, Collecting } from "@pages";

const User = () => {
  return (
    <div className={styles.container}>
      <SideBar />

      <div className={styles.content}>
        <Routes>
          {/* <Route
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
          /> */}
          {/* <Route path="/categories" element={<FinPlan />} /> */}
          {/* <Route
            path="/categories"
            element={
              <ProtectedRoute>
                <Categories />
              </ProtectedRoute>
            }
          /> */}
          <Route
            path="/collecting"
            element={
              <ProtectedRoute>
                <Collecting />
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
