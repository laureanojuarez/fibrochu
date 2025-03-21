import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home/Home";
import SignUpPage from "../pages/auth/SignUpPage";
import SignInPage from "../pages/auth/SignInPage";
import NotFoundPage from "../pages/404Page";
import AuthProtectedRoute from "./AuthProtectedRoute";
import ProtectedPage from "../pages/ProtectedPage";
import App from "../App";
import { DashboardPage } from "../pages/dashboard/DashboardPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
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
        path: "/",
        element: <AuthProtectedRoute />,
        children: [
          {
            path: "/dashboard",
            element: <DashboardPage />,
          },
        ],
      },
    ],
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
]);

export default router;
