import React from 'react';
import {Box, Card} from "@mui/material";
import LoginFormInput from "./LoginFormInput";
import FormError from "./FormError";
import LoginButton from "./LoginButton";
import useLoginForm from "../hooks/useLoginForm";

export default function LoginForm() {
    const {
        handleSubmit, setLogin, login, loginError,
        isLoading, setPassword, password, passwordError,
        passwordRef, formError
    } = useLoginForm();

    return (
        <Card sx={{ px: 10, pb: 5 }}>
            <form onSubmit={handleSubmit}>
                <Box sx={{ flexDirection: 'column', display: 'flex', alignItems: 'center', gap: 1 }}>
                    <h2>Welcome back!</h2>

                    <LoginFormInput
                        label="Login"
                        onChange={setLogin}
                        value={login}
                        error={loginError}
                        disabled={isLoading}
                        autoFocus
                    />
                    <LoginFormInput
                        label="Password"
                        onChange={setPassword}
                        value={password}
                        error={passwordError}
                        disabled={isLoading}
                        ref={passwordRef}
                        type="password"
                    />

                    <LoginButton disabled={isLoading}>Login</LoginButton>

                    <FormError error={formError}/>
                </Box>
            </form>
        </Card>
    )
}