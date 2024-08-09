import React from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  Navigate,
  redirect,
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
import Error404Page from "./pages/errorpage/Error404Page";

const express = import.meta.env.VITE_API_URL;

const fetchUser = async () =>
  axios
    .get(`${import.meta.env.VITE_API_URL}/api/auth/checkauth`, {
      withCredentials: true,
    })
    .then((response) => response.data.user);

const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      {
        path: "/",
        element: <HomePage />,
        loader: () => {
          const latestVideos = axios
            .get(`${express}/api/videos/misc/latest`)
            .then((response) => response.data);
          const randomVideos = axios
            .get(`${express}/api/videos/misc/random`)
            .then((response) => response.data);

          return Promise.all([latestVideos, randomVideos]);
        },
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
          const fetchCategory = async () => {
            try {
              const specificCategory = await axios
                .get(`${express}/api/categories/${params.name}`)
                .then((res) => res.data);
              const allCategories = await axios
                .get(`${express}/api/categories`)
                .then((res) => res.data);

              return [specificCategory, allCategories];
            } catch (error) {
              return redirect("/404");
            }
          };

          return fetchCategory();
        },
      },
      {
        path: "/video/:id",
        element: <VideoPage />,
        loader: ({ params }) => {
          const fetchVideo = async () => {
            try {
              const data = await axios
                .get(`${express}/api/videos/${params.id}`)
                .then((response) => response.data);

              return Promise.all([fetchUser(), data]);
            } catch (error) {
              return redirect("/404");
            }
          };

          return fetchVideo();
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
        loader: () => fetchUser(),
      },
      {
        path: "/user",
        element: <UserPage />,
        loader: () => fetchUser(),
      },
      {
        path: "/rgpd",
        element: <RgpdPage />,
      },
      {
        path: "/404",
        element: <Error404Page />,
      },
      {
        path: "/*",
        element: <Navigate to="/404" />,
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
