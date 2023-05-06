import EmptyLayout from "./EmptyLayout";
import {Link, Card, Grid} from "@mui/material";
import {useNavigate} from "react-router-dom";
import {useCallback} from "react";
import BackDrop from "./BackDrop";

export default function NotFoundPage() {
    const navigate = useNavigate();

    const onHome = useCallback(() => {
        navigate('/');
    }, [navigate]);

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
                    <Card sx={{ zIndex: 2, px: {xs: 3, md: 10}, pb: {xs: 3, md: 5} }}>
                        <h2>404 — Not Found</h2>

                        <Link onClick={onHome}>Go Home</Link>
                    </Card>
                </Grid>
            </Grid>
        </EmptyLayout>
    );
}