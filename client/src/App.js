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
import {AuthContextProvider} from "./modules/auth/context/AuthContext";

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
            <AuthContextProvider>
                <RouterProvider router={router} />
            </AuthContextProvider>
        </React.StrictMode>
  );
}

export default App;
