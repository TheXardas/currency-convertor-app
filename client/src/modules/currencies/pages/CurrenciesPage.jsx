import CurrenciesLayout from "./CurrenciesLayout";
import {Grid} from "@mui/material";
import LatestRates from "../components/LatestCurrencies/LatestRates";
import CurrencyConvertor from "../components/CurrencyConvertor/CurrencyConvertor";
import CurrencyHistory from "../components/CurrencyHistory/CurrencyHistory";
import {Navigate} from "react-router-dom";
import {useAuth} from "../../auth/context/AuthContext";
import {useEffect, useState} from "react";
import currencyService from '../services/currencyService';

export default function CurrenciesPage() {
    const {isLoggedIn} = useAuth();
    const [currencies, setCurrencies] = useState(null);
    const [latestRates, setLatestRates] = useState(null);
    const [baseCurrencyCode, setBaseCurrencyCode] = useState('USD');
    const [targetCurrencyCode, setTargetCurrencyCode] = useState('EUR');

    useEffect(() => {
        currencyService.currencies().then(setCurrencies)
        currencyService.latest().then(setLatestRates)
    }, [baseCurrencyCode])

    if (!isLoggedIn) {
        // TODO loader
        return <Navigate to="/login"/>;
    }

    // TODO if no user yet + but has token, then show loader too

    // TODO load data
    return (
        <CurrenciesLayout>
            <Grid container spacing={{ xs: 2, md: 4 }} sx={{mb: 5}}>
                <Grid item xs={12} md={8}>
                    <CurrencyConvertor
                        currencies={currencies}
                        baseCurrencyCode={baseCurrencyCode}
                        targetCurrencyCode={targetCurrencyCode}
                        setBaseCurrencyCode={setBaseCurrencyCode}
                        setTargetCurrencyCode={setTargetCurrencyCode}
                        rates={latestRates}
                    />
                </Grid>
                <Grid item xs={12} md={4}>
                    <LatestRates
                        currencies={currencies}
                        baseCurrencyCode={baseCurrencyCode}
                        rates={latestRates}
                    />
                </Grid>
                <Grid item xs={12} md={12}>
                    <CurrencyHistory baseCurrencyCode={baseCurrencyCode} targetCurrencyCode={targetCurrencyCode}/>
                </Grid>
            </Grid>
        </CurrenciesLayout>
    );
}