import EmptyLayout from "../../core/components/EmptyLayout";
import {Grid} from "@mui/material";
import LoginForm from "../components/LoginForm";
import {Navigate, useNavigate} from "react-router-dom";
import {useAuth} from "../context/AuthContext";

export default function LoginPage() {
    const navigate = useNavigate();

    const {isLoggedIn} = useAuth();
    if (isLoggedIn) {
        // TODO loader
        return <Navigate to={'/'}/>;
    }

    return (
        <EmptyLayout>
            <Grid
                container
                spacing={0}
                direction="column"
                alignItems="center"
                justifyContent="center"
                style={{ minHeight: '100vh' }}
            >
                <Grid item xs={3}>
                    <LoginForm />
                </Grid>
            </Grid>
        </EmptyLayout>
    )
}