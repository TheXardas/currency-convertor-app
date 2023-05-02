import CurrenciesLayout from "./CurrenciesLayout";
import {Grid} from "@mui/material";
import LatestCurrencies from "../components/LatestCurrencies/LatestCurrencies";
import CurrencyConvertor from "../components/CurrencyConvertor/CurrencyConvertor";
import CurrencyHistory from "../components/CurrencyHistory/CurrencyHistory";
import {Navigate} from "react-router-dom";
import {useAuth} from "../../auth/context/AuthContext";

export default function CurrenciesPage() {
    const {isLoggedIn} = useAuth();
    if (!isLoggedIn) {
        // TODO loader
        return <Navigate to={'/login'}/>;
    }

    // TODO load data
    return (
        <CurrenciesLayout>
            <Grid container spacing={4}>
                <Grid item xs={8}>
                    <CurrencyConvertor/>
                </Grid>
                <Grid item xs={4}>
                    <LatestCurrencies/>
                </Grid>
                <Grid item xs={12}>
                    <CurrencyHistory/>
                </Grid>
            </Grid>
        </CurrenciesLayout>
    );
}