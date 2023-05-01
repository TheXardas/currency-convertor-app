import './App.css';
import React from 'react';
import NotFoundPage from "./modules/core/components/NotFoundPage";
import LoginPage from "./modules/auth/pages/LoginPage";
import {
    createHashRouter,
    RouterProvider,
} from "react-router-dom";
import "./index.css";
import CurrenciesPage from "./modules/currencies/pages/CurrenciesPage";

const router = createHashRouter([
    {
        path: "/",
        element: <CurrenciesPage/>,
    },
    {
        path: "/login",
        element: <LoginPage/>,
    },
    {
        path: "*",
        element: <NotFoundPage/>,
    },

]);

function App() {
  return (
      <React.StrictMode>
          <RouterProvider router={router} />
      </React.StrictMode>
  );
}

export default App;
