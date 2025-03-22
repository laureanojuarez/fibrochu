import React from "react";
import { Outlet } from "react-router-dom";
import { SessionProvider } from "./context/SessionContext";
import Layout from "./components/Layout/Layout";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
const App = () => {
  return (
    <SessionProvider>
      <Layout>
        <Outlet />
      </Layout>
    </SessionProvider>
  );
};

export default App;
