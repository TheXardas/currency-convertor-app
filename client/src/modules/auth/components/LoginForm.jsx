import React, {useCallback, useState} from 'react';
import {Box, Button, Card, TextField} from "@mui/material";
import authService from "../services/authService";
import {Error} from "@mui/icons-material";


export default function LoginForm() {
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('')
    const [loginError, setLoginError] = useState(false)
    const [passwordError, setPasswordError] = useState(false)
    const [formError, setFormError] = useState('');

    const handleSubmit = useCallback(async (e) => {
        e.preventDefault()

        setLoginError(false)
        setPasswordError(false)
        setFormError('');

        if (login === '') {
            setLoginError(true)
            setFormError('Login is required');
        }
        if (password === '') {
            setPasswordError(true)
            setFormError('Password is required');
        }

        if (login && password) {
            try {
                await authService.login(login, password);
                // Redirect will be done automatically in LoginPage
            } catch (e) {
                const error = e.message;
                if ((e.response.status === 400 || e.response.status === 404) && error) {
                    setPasswordError(true);
                    setFormError(error);
                } else {
                    setFormError('Server error');
                }
            }
        }
    }, [login, password, setLoginError, setPasswordError]);

    return (
        <Card sx={{ px: 10, pb: 5 }}>
            <form onSubmit={handleSubmit}>
                <Box sx={{ flexDirection: 'column', display: 'flex', alignItems: 'center', gap: 1 }}>
                    <h2>Welcome back!</h2>

                    <TextField
                        label="Login"
                        onChange={e => setLogin(e.target.value)}
                        variant="outlined"
                        color="secondary"
                        type="text"
                        sx={{mb: 3}}
                        fullWidth
                        value={login}
                        error={loginError}
                    />
                    <TextField
                        label="Password"
                        onChange={e => setPassword(e.target.value)}
                        variant="outlined"
                        color="secondary"
                        type="password"
                        value={password}
                        error={passwordError}
                        fullWidth
                        sx={{mb: 3}}
                    />
                    <Button variant="outlined" color="secondary" type="submit">
                        Login
                    </Button>

                    <Box color="error" sx={{ height: '20px', display: 'flex', alignItems: 'center', gap: 1 }}>
                        {!!formError && (
                            <><Error color="error"/> {formError}</>
                        )}
                    </Box>

                </Box>

            </form>
        </Card>
    )
}