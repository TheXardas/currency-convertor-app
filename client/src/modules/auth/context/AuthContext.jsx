import {createContext, useCallback, useContext, useEffect, useState} from "react";
import authService from "../services/authService";

const AuthContext = createContext({ user: authService.getCurrentUser(), isLoggedIn: authService.isLoggedIn() });

export function useAuth() {
    return useContext(AuthContext);
}

export function AuthContextProvider({ children }) {
    const [contextValue, setContextValue] = useState({ user: authService.getCurrentUser(), isLoggedIn: authService.isLoggedIn() });

    const onLoginChange = useCallback(() => {
        setContextValue({
            user: authService.getCurrentUser(),
            isLoggedIn: authService.isLoggedIn(),
        })
    }, [setContextValue]);

    useEffect(() => {
        // We use event handler here, to ensure rapid react update of context and app state, when localStorage changes.
        // It can change in a number of ways, and without a reactive state we cannot react to change another way.
        // In future, i.e. if mobx is used, should be refactored to reactive storage instead.
        window.addEventListener('loginChange', onLoginChange);
        return () => {
            window.removeEventListener('loginChange', onLoginChange);
        }
    }, [onLoginChange]);

    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    );
}