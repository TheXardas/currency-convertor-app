import {Box, Card, Divider} from "@mui/material";
import YourRate from "./YourRate";
import {useState} from "react";
import CurrencySelect from "./CurrencySelect";
import StyledCardHeader from "../../../core/components/StyledCardHeader";
import {roundAmount} from "../../helpers/roundAmount";
import Amount from "./Amount";
import useOptions from "../../hooks/useOptions";
import findRate from "../../helpers/findRate";

export default function CurrencyConvertor({
    currencies,
    baseCurrencyCode,
    targetCurrencyCode,
    setBaseCurrencyCode,
    setTargetCurrencyCode,
    rates
}) {
    const [fromAmount, setFromAmount] = useState(1000);
    const [toAmount, setToAmount] = useState(0);
    const options = useOptions(rates, currencies);
    const isLoaded = options.length > 0;

    const rate = findRate(rates, baseCurrencyCode, targetCurrencyCode);

    const toAmountResult = fromAmount * rate;

    return (
        <Card sx={{ height: '100%' }}>
            <StyledCardHeader title="Currency Convertor" subheader={`${baseCurrencyCode} → ${targetCurrencyCode}`}/>

            <Box sx={{ display: 'flex', gap: 3, p: 2 }}>
                <Amount label="From" value={fromAmount} onChange={setFromAmount} isLoaded={isLoaded}/>

                <CurrencySelect
                    value={baseCurrencyCode}
                    onChange={setBaseCurrencyCode}
                    options={options}
                />
            </Box>

            <Box sx={{ display: 'flex', gap: 3, p: 2 }}>
                <Amount label="To" value={roundAmount(toAmountResult)} onChange={setToAmount} isLoaded={isLoaded}/>

                <CurrencySelect
                    value={targetCurrencyCode}
                    onChange={setTargetCurrencyCode}
                    options={options}
                />
            </Box>

            <Divider/>

            <YourRate from={baseCurrencyCode} to={targetCurrencyCode} rate={rate}/>
        </Card>
    );
}