import {Autocomplete, Box, Card, Divider, TextField} from "@mui/material";
import YourRate from "./YourRate";
import {useMemo, useState} from "react";
import CurrencySelect from "../CurrencySelect/CurrencySelect";
import {BASE_CURRENCY_CODE} from "../../constants/currencies";
import StyledCardHeader from "../../../core/components/StyledCardHeader";

export default function CurrencyConvertor({
    baseCurrencyCode,
    targetCurrencyCode,
    setBaseCurrencyCode,
    setTargetCurrencyCode,
    rates
}) {
    const [fromAmount, setFromAmount] = useState(1000);
    const [toAmount, setToAmount] = useState('');

    const options = useMemo(() => {
        if (!rates) return [];
        return rates.filter(r => r.from === BASE_CURRENCY_CODE).map(r => ({
            id: r.to,
            code: r.to,
            label: r.to,
        }));
    }, [rates])

    let rate;
    if (rates) {
        if (baseCurrencyCode === BASE_CURRENCY_CODE) rate = rates.find(r => r.from === baseCurrencyCode && r.to === targetCurrencyCode).rate;
        if (baseCurrencyCode !== BASE_CURRENCY_CODE) {
            const from = rates.find(r => r.from === BASE_CURRENCY_CODE && r.to === baseCurrencyCode);
            const to = rates.find(r => r.from === BASE_CURRENCY_CODE && r.to === targetCurrencyCode);
            rate = Math.floor((to.rate / from.rate) * 1000000) / 1000000;
        }
        console.log(rate, baseCurrencyCode, rates.find(r => r.to === targetCurrencyCode))
    }

    const toAmountResult = Math.floor( fromAmount * rate * 100 ) / 100;

    return (
        <Card sx={{ height: '100%' }}>
            <StyledCardHeader title="Currency Convertor" subheader={`${baseCurrencyCode} → ${targetCurrencyCode}`}/>


            <Box sx={{ display: 'flex', gap: 3, p: 2 }}>
                <TextField
                    sx={{ flexShrink: 1 }}
                    label="From"
                    onChange={e => setFromAmount(e.target.value)}
                    variant="outlined"
                    color="secondary"
                    type="text"
                    value={fromAmount}
                />

                <CurrencySelect
                    sx={{ flexGrow: 1 }}
                    value={baseCurrencyCode}
                    onChange={(event, newValue) => {
                        if (!newValue) return;
                        setBaseCurrencyCode(newValue.code);
                    }}
                    options={options}
                    label="Source"
                />
            </Box>

            <Box sx={{ display: 'flex', gap: 3, p: 2 }}>
                <TextField
                    sx={{ flexShrink: 1 }}
                    label="To"
                    variant="outlined"
                    color="secondary"
                    type="text"
                    value={toAmountResult}
                />
                <CurrencySelect
                    sx={{ flexGrow: 1 }}
                    value={targetCurrencyCode}
                    onChange={(event, newValue) => {
                        if (!newValue) return;
                        setTargetCurrencyCode(newValue.code);
                    }}
                    options={options}
                    label="Target"
                />
            </Box>

            <Divider/>
            <YourRate from={baseCurrencyCode} to={targetCurrencyCode} rate={rate}/>
        </Card>
    );
}