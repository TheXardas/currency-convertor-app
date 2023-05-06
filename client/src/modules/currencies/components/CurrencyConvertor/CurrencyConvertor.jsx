import {Box, Card, Divider} from "@mui/material";
import YourRate from "./YourRate";
import CurrencySelect from "./CurrencySelect";
import StyledCardHeader from "../../../core/components/StyledCardHeader";
import Amount from "./Amount";
import useOptions from "../../hooks/useOptions";
import findRate from "../../helpers/findRate";
import useConvertor from "../../hooks/useConvertor";
import {useEffect} from "react";


export default function CurrencyConvertor({
    currencies,
    baseCurrencyCode,
    targetCurrencyCode,
    setBaseCurrencyCode,
    setTargetCurrencyCode,
    rates
}) {
    const rate = findRate(rates, baseCurrencyCode, targetCurrencyCode);

    const {handleFromAmountChange, handleTargetAmountChange, fromAmount, toAmount} = useConvertor(rate);

    useEffect(() => handleFromAmountChange(fromAmount), [baseCurrencyCode, targetCurrencyCode, handleFromAmountChange, fromAmount]);

    const options = useOptions(rates, currencies);
    const isLoaded = options.length > 0;

    return (
        <Card sx={{ height: '100%' }}>
            <StyledCardHeader title="Currency Convertor" subheader={`${baseCurrencyCode} → ${targetCurrencyCode}`}/>

            <Box sx={{ display: 'flex', gap: 3, p: 2 }}>
                <Amount label="From" value={fromAmount} onChange={handleFromAmountChange} isLoaded={isLoaded}/>

                <CurrencySelect
                    value={baseCurrencyCode}
                    onChange={setBaseCurrencyCode}
                    options={options}
                />
            </Box>

            <Box sx={{ display: 'flex', gap: 3, p: 2 }}>
                <Amount label="To" value={toAmount} onChange={handleTargetAmountChange} isLoaded={isLoaded}/>

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