import React from "react";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";
import ErrorPage from "./pages/ErrorPage.jsx";
import LandingPage from "./pages/LandingPage.jsx";
import SignIn from "./pages/SignIn/SignIn.jsx";
import SignUp from "./pages/SignUp/SignUp.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import UserInfo from "./pages/UserInfo/UserInfo.jsx"
import Studyhistory from "./pages/StudyHistory/StudyHistory.jsx"

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <LandingPage /> },
      { path: "/signin", element: <SignIn /> },
      { path: "/signup", element: <SignUp /> },
      { path: "/dashboard", element: <Dashboard /> },
      { path: "/userinfo", element: <UserInfo /> },
      { path: "/studyhistory", element: <Studyhistory /> },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
