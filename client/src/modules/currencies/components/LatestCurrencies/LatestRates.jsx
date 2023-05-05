import {Box, Card, List, Skeleton} from "@mui/material";
import {
    MAX_LATEST_CURRENCIES_DISPLAYED
} from "../../constants/currencies";
import StyledCardHeader from "../../../core/components/StyledCardHeader";
import roundRate from "../../helpers/roundRate";
import LatestRateListItem from "./LatestRateListItem";
import useLatestRates from "../../hooks/useLatestRates";
import CurrencyFlag from "../CurrencyFlag";
import CurrencyWithFlag from "../CurrencyWithFlag";

export default function LatestRates({ baseCurrencyCode, rates }) {
    const latestRates = useLatestRates(rates, baseCurrencyCode)

    return (
        <Card sx={{ height: '100%'}}>
            <StyledCardHeader title="Today's rates" subheader={`${baseCurrencyCode} ↓`}/>

            <List>
                {latestRates.length > 0 ? latestRates.map((r, i) => (
                    <LatestRateListItem key={r.id} divider={i !== latestRates.length - 1}>
                        <CurrencyWithFlag currencyCode={r.to} />
                        <span>{roundRate(r.rate)}</span>
                    </LatestRateListItem>
                )) : (
                    [...Array(MAX_LATEST_CURRENCIES_DISPLAYED)].map((_, i) => (
                        <LatestRateListItem key={i} divider={i !== MAX_LATEST_CURRENCIES_DISPLAYED - 1}>
                            <CurrencyWithFlag currencyCode={null}/>
                            <Skeleton variant="text" width={65} height={19} />
                        </LatestRateListItem>
                    )))
                }
            </List>
        </Card>
    );
}