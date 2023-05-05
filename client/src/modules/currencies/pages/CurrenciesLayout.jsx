import {Container} from "@mui/material";
import Header from "../../core/components/Header";
import EmptyLayout from "../../core/components/EmptyLayout";

export default function CurrenciesLayout({ children }) {
    return (
        <EmptyLayout>
            <Header sx={{ marginBottom: { xs: 2, md: 4 }}}/>
            <Container>
                {children}
            </Container>
        </EmptyLayout>
    );
}