import EmptyLayout from "../../core/components/EmptyLayout";
import {Card, TextField} from "@mui/material";

export default function LoginPage() {
    return (
        <EmptyLayout>
            <Card>
                <TextField label="Login" type="text" />
                <TextField label="Password" type="password" />
            </Card>
        </EmptyLayout>
    )
}