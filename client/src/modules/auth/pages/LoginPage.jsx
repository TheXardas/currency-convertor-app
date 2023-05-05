import EmptyLayout from "../../core/components/EmptyLayout";
import {Grid} from "@mui/material";
import LoginForm from "../components/LoginForm";
import {Navigate} from "react-router-dom";
import {useAuth} from "../context/AuthContext";
import BackDrop from '../components/BackDrop';

export default function LoginPage() {
    const {isLoggedIn} = useAuth();
    if (isLoggedIn) {
        return <Navigate to={'/'}/>;
    }

    return (
        <EmptyLayout>
            <BackDrop/>
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