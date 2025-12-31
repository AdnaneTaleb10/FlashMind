import React from "react";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";
import { AppProvider } from "./context/AppContext.jsx";
import MainLayout from "./layouts/MainLayout.jsx";
import ErrorPage from "./pages/ErrorPage.jsx";
import LandingPage from "./pages/LandingPage.jsx";
import SignIn from "./pages/SignIn/SignIn.jsx";
import SignUp from "./pages/SignUp/SignUp.jsx";
import Dashboard from "./pages/Dashboard/Dashboard.jsx";
import FolderView from "./pages/FolderView/FolderView.jsx";
import FolderDetails from "./pages/FolderDetails/FolderDetails.jsx";
import StudyQuestion from "./pages/StudyQuestion/StudyQuestion.jsx";
import StudyAnswer from "./pages/StudyAnswer/StudyAnswer.jsx";
import StudyHistory from "./pages/StudyHistory/StudyHistory.jsx";
import SessionResults from "./pages/SessionResults/SessionResults.jsx";
import UserInfo from "./pages/UserInfo/UserInfo.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <LandingPage /> },
      { path: "/signin", element: <SignIn /> },
      { path: "/signup", element: <SignUp /> },
      {
        path: "/app",
        element: <MainLayout />,
        children: [
          { index: true, element: <Dashboard /> },
          { path: "folders", element: <FolderView /> },
          { path: "folders/:folderId", element: <FolderDetails /> },
          { path: "study/question", element: <StudyQuestion /> },
          { path: "study/answer", element: <StudyAnswer /> },
          { path: "study/results", element: <SessionResults /> },
          { path: "history", element: <StudyHistory /> },
          { path: "profile", element: <UserInfo /> },
        ],
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
    <StrictMode>
      <AppProvider>
        <RouterProvider router={router} />
      </AppProvider>
    </StrictMode>
);