import EmptyLayout from "./EmptyLayout";
import {Link} from "@mui/material";
import {useNavigate} from "react-router-dom";
import {useCallback} from "react";

export default function NotFoundPage() {
    const navigate = useNavigate();

    const onHome = useCallback(() => {
        navigate('/');
    }, [navigate]);

    return (
        <EmptyLayout>
            404 - Not Found

            <Link onClick={onHome}>Go Home</Link>
        </EmptyLayout>
    );
}