import CurrenciesLayout from "./CurrenciesLayout";
import {Card, Grid} from "@mui/material";
import LatestCurrencies from "../components/LatestCurrencies/LatestCurrencies";
import CurrencyConvertor from "../components/CurrencyConvertor/CurrencyConvertor";
import CurrencyHistory from "../components/CurrencyHistory/CurrencyHistory";

export default function CurrenciesPage() {
    // Load and show data
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