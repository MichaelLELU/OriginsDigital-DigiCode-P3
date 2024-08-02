import React from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import axios from "axios";

import App from "./App";
import HomePage from "./pages/homepage/HomePage";
import CategoriesPage from "./pages/categoriespage/CategoriesPage";
import CategoryPage from "./pages/categorypage/CategoryPage";
import VideoPage from "./pages/videopage/VideoPage";
import SignupPage from "./pages/signupPage/SignupPage";
import ResultPage from "./pages/resultpage/ResultPage";
import LoginPage from "./pages/loginpage/LoginPage";
import AdminPage from "./pages/adminpage/AdminPage";
import UserPage from "./pages/userpage/UserPage";
import RgpdPage from "./pages/rgpdpage/rgpdPage";

const express = import.meta.env.VITE_API_URL;

const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      {
        path: "/",
        element: <HomePage />,
        loader: () => fetch(`${express}/api/videos`),
      },
      {
        path: "/categories",
        element: <CategoriesPage />,
        loader: () => fetch(`${express}/api/categories`),
      },
      {
        path: "/categories/:name",
        element: <CategoryPage />,
        loader: async ({ params }) => {
          try {
            return await axios
              .get(
                `${express}/api/categories/${params.name.replaceAll("-", " ").toLowerCase()}`
              )
              .then((res) => res.data);
          } catch (error) {
            return window.history.back();
          }
        },
      },
      {
        path: "/video/:id",
        element: <VideoPage />,
        loader: async ({ params }) => {
          try {
            return await axios
              .get(`${express}/api/videos/${params.id}`)
              .then((res) => res.data);
          } catch (error) {
            return window.history.back();
          }
        },
      },
      {
        path: "/signup",
        element: <SignupPage />,
      },
      {
        path: "/login",
        element: <LoginPage />,
      },
      {
        path: "/result/:q",
        element: <ResultPage />,
      },
      {
        path: "/history9",
        element: <AdminPage />,
      },
      {
        path: "/user",
        element: <UserPage />,
      },
      {
        path: "/rgpd",
        element: <RgpdPage />,
      },
      {
        path: "/*",
        element: <Navigate to="/" />,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
