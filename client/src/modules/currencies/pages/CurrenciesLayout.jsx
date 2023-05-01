import {Container} from "@mui/material";
import Header from "../../core/components/Header";

export default function CurrenciesLayout({ children }) {
    return (
        <Container maxWidth="lg">
            <Header sx={{ marginBottom: 4 }}/>
            {children}
        </Container>
    );
}