import authService from "../services/authService";
import {useCallback, useRef, useState} from "react";

export default function useLoginForm() {
    const passwordRef = useRef(null);
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [loginError, setLoginError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const [formError, setFormError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = useCallback(async (e) => {
        e.preventDefault();

        setLoginError(false);
        setPasswordError(false);
        setFormError('');

        if (login === '') {
            setLoginError(true);
            setFormError('Login is required');
        }
        if (password === '') {
            setPasswordError(true);
            setFormError('Password is required');
        }

        if (login && password) {
            try {
                setIsLoading(true);
                await authService.login(login, password);
                // Redirect will be done automatically in LoginPage, because of updated context
            } catch (e) {
                const error = e.message;
                if ((e.response.status === 400 || e.response.status === 404) && error) {
                    setPasswordError(true);
                    setFormError(error);

                    // Timeout here, to allow input to become enabled again on next render.
                    setTimeout(() => passwordRef.current && passwordRef.current.focus());
                } else {
                    setFormError('Server error');
                }
            } finally {
                setIsLoading(false);
            }
        }
    }, [login, password, setLoginError, setPasswordError]);

    return {
        handleSubmit, setLogin, login, loginError,
        isLoading, setPassword, password, passwordError,
        passwordRef, formError
    }
}