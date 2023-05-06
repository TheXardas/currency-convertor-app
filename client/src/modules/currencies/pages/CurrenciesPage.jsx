import CurrenciesLayout from "./CurrenciesLayout";
import {Grid} from "@mui/material";
import LatestRates from "../components/LatestRates/LatestRates";
import CurrencyConvertor from "../components/CurrencyConvertor/CurrencyConvertor";
import CurrencyHistory from "../components/CurrencyHistory/CurrencyHistory";
import {Navigate} from "react-router-dom";
import {useAuth} from "../../auth/context/AuthContext";
import {useEffect, useState} from "react";
import currencyService from '../services/currencyService';
import {ErrorBoundary} from "react-error-boundary";

export default function CurrenciesPage() {
    const {isLoggedIn} = useAuth();
    const [currencies, setCurrencies] = useState(null);
    const [latestRates, setLatestRates] = useState(null);
    const [baseCurrencyCode, setBaseCurrencyCode] = useState('USD');
    const [targetCurrencyCode, setTargetCurrencyCode] = useState('EUR');

    useEffect(() => {
        currencyService.currencies().then(setCurrencies);
        currencyService.latest().then(setLatestRates)
    }, [baseCurrencyCode]);

    if (!isLoggedIn) {
        return <Navigate to="/login"/>;
    }

    return (
        <CurrenciesLayout>
            <Grid container spacing={{ xs: 2, md: 4 }} sx={{mb: 5}}>
                <Grid item xs={12} md={8}>
                    <ErrorBoundary fallback={<div>Sorry, convertor is unavailable right now. Try again later</div>}>
                        <CurrencyConvertor
                            currencies={currencies}
                            baseCurrencyCode={baseCurrencyCode}
                            targetCurrencyCode={targetCurrencyCode}
                            setBaseCurrencyCode={setBaseCurrencyCode}
                            setTargetCurrencyCode={setTargetCurrencyCode}
                            rates={latestRates}
                        />
                    </ErrorBoundary>
                </Grid>
                <Grid item xs={12} md={4}>
                    <ErrorBoundary fallback={<div>Sorry, rates are unavailable right now. Try again later</div>}>
                        <LatestRates
                            currencies={currencies}
                            baseCurrencyCode={baseCurrencyCode}
                            rates={latestRates}
                        />
                    </ErrorBoundary>
                </Grid>
                <Grid item xs={12} md={12}>
                    <ErrorBoundary fallback={<div>Sorry, history is unavailable right now. Try again later</div>}>
                        <CurrencyHistory baseCurrencyCode={baseCurrencyCode} targetCurrencyCode={targetCurrencyCode}/>
                    </ErrorBoundary>
                </Grid>
            </Grid>
        </CurrenciesLayout>
    );
}