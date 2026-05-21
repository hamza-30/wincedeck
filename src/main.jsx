import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "../Layout.jsx";
import LandingPage from "./pages/LandingPage.jsx";
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import NewProject from "./pages/NewProject.jsx";
import Project from "./pages/Project.jsx";
import ProjectSettings from "./pages/ProjectSettings.jsx";
import ForgotPassword from "./pages/ForgotPassword.jsx";
import { Toaster } from "sonner";
import AuthContextProvider from "./context/AuthContext/AuthContextProvider.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import PublicOnlyRoute from "./components/PublicOnlyRoute.jsx";

let router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        element: <PublicOnlyRoute />,
        children: [
          {
            index: true,
            element: <LandingPage />,
          },
          {
            path: "login",
            element: <Login />,
          },
          {
            path: "signup",
            element: <Signup />,
          },
          {
            path: "resetpassword",
            element: <ForgotPassword />,
          },
        ],
      },

      {
        element: <ProtectedRoute />,
        children: [
          {
            path: "dashboard",
            element: <Dashboard />,
          },
          {
            path: "dashboard/new",
            element: <NewProject />,
          },
          {
            path: "dashboard/:projectId",
            element: <Project />,
          },
          {
            path: "dashboard/:projectId/settings",
            element: <ProjectSettings />,
          },
        ],
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Toaster
      position="top-center"
      toastOptions={{ className: "mt-9 sm:mt-7", duration: "2500" }}
    />
    <AuthContextProvider>
      <RouterProvider router={router} />
    </AuthContextProvider>
  </StrictMode>,
);
