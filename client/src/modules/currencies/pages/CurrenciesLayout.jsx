import {Container} from "@mui/material";
import Header from "../../core/components/Header";
import EmptyLayout from "../../core/components/EmptyLayout";

export default function CurrenciesLayout({ children }) {
    return (
        <EmptyLayout>
            <Container maxWidth="lg">
                <Header sx={{ marginBottom: 4 }}/>
                {children}
            </Container>
        </EmptyLayout>
    );
}