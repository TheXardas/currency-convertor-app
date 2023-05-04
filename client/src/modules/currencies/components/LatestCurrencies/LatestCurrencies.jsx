import {Card, List, ListItem} from "@mui/material";
import {
    BASE_CURRENCY_CODE,
    CURRENT_CURRENCIES_CODES,
    MAX_LATEST_CURRENCIES_DISPLAYED
} from "../../constants/currencies";
import StyledCardHeader from "../../../core/components/StyledCardHeader";

export default function LatestCurrencies({ baseCurrencyCode, rates }) {
    const codesToDisplay = CURRENT_CURRENCIES_CODES.filter(c => c !== baseCurrencyCode);
    let baseRate;
    if (baseCurrencyCode !== BASE_CURRENCY_CODE) {
        baseRate = rates.find(r => r.from === BASE_CURRENCY_CODE && r.to === baseCurrencyCode);
    }

    // TODO Get rates higher in tree
    const finalRates = codesToDisplay
        .map(c => {
            if (!rates) return null;
            if (BASE_CURRENCY_CODE === baseCurrencyCode) return rates.find(r => r.from === baseCurrencyCode && r.to === c)
            const to = rates.find(r => r.from === BASE_CURRENCY_CODE && r.to === c);
            return {
                id: baseCurrencyCode + c,
                to: c,
                rate: Math.floor( (to.rate / baseRate.rate) * 1000000) / 1000000,
            }
        })
        .filter((r) => !!r)
        .slice(0, MAX_LATEST_CURRENCIES_DISPLAYED);

    return (
        <Card sx={{ height: '100%'}}>
            <StyledCardHeader title="Today's rates" subheader={`${baseCurrencyCode} to`}/>
            {finalRates && (
                <List>
                    {finalRates.map(r => (
                        <ListItem key={r.id}>
                            {r.to} - {r.rate}
                        </ListItem>
                    ))}
                </List>
            )}
        </Card>
    );
}