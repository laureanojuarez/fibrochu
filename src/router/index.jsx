import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home/Home";
import SignUpPage from "../pages/auth/SignUpPage";
import SignInPage from "../pages/auth/SignInPage";
import AuthProtectedRoute from "./AuthProtectedRoute";
import DashboardPage from "../pages/dashboard/DashboardPage";
import NotFoundPage from "../pages/404Page";
import App from "../App";
import ProductsPage from "../pages/productos/ProductsPage";
import MetodospagoPage from "../pages/metodos-de-pago/MetodospagoPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <NotFoundPage />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "login",
        element: <SignInPage />,
      },
      {
        path: "register",
        element: <SignUpPage />,
      },
      {
        path: "productos",
        element: <ProductsPage />,
      },
      {
        path: "metodos-de-pago",
        element: <MetodospagoPage />,
      },
      {
        element: <AuthProtectedRoute />,
        children: [
          {
            path: "dashboard",
            element: <DashboardPage />,
          },
        ],
      },
    ],
  },
]);

export default router;
