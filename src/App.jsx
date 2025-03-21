import React from "react";
import { Outlet } from "react-router-dom";
import { SessionProvider } from "./context/SessionContext";
import Layout from "./components/Layout/Layout";

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
