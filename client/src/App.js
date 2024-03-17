import { Routes, Route, Navigate } from "react-router-dom";
import { publicRoutes, privateRoutes } from "./routes/routes";
import { Fragment, useEffect, useState, useRef } from "react";
import UserLayout from "./layout/Public/UserLayout";
import { ToastContainer } from "react-toastify";
import { useLocation } from "react-router-dom";

function App() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <>
      <Routes>
        {publicRoutes.map((route, index) => {
          const Page = route.component;
          let Layout = route.layout ? UserLayout : Fragment;

          return (
            <Route
              exact
              key={index}
              path={route.path}
              element={
                <Layout>
                  <Page />
                </Layout>
              }
            />
          );
        })}

        {privateRoutes.map((route, index) => {
          const Page = route.component;
          let Layout = route.layout ? route.layout : Fragment;
          return (
            <Route
              exact
              key={index}
              path={route.path}
              element={
                // isAuthenticated ? (
                <Layout>
                  <Page />
                </Layout>
                // ) : (
                //   <Navigate to="/login" />
                // )
              }
            />
          );
        })}
      </Routes>

      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
        style={{ fontSize: "16px" }}
      />
    </>
  );
}

export default App;
