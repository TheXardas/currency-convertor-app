import {Card, List, Skeleton} from "@mui/material";
import {
    MAX_LATEST_CURRENCIES_DISPLAYED
} from "../../constants/currencies";
import StyledCardHeader from "../../../core/components/StyledCardHeader";
import roundRate from "../../helpers/roundRate";
import LatestRateListItem from "./LatestRateListItem";
import useLatestRates from "../../hooks/useLatestRates";

export default function LatestRates({ baseCurrencyCode, rates }) {
    const latestRates = useLatestRates(rates, baseCurrencyCode)

    return (
        <Card sx={{ height: '100%'}}>
            <StyledCardHeader title="Today's rates" subheader={`${baseCurrencyCode} ↓`}/>

            <List>
                {latestRates.length > 0 ? latestRates.map(r => (
                    <LatestRateListItem key={r.id}>
                        <span>{r.to}</span>
                        <span>{roundRate(r.rate)}</span>
                    </LatestRateListItem>
                )) : (
                    [...Array(MAX_LATEST_CURRENCIES_DISPLAYED)].map((_, i) => (
                        <LatestRateListItem key={i}>
                            <Skeleton variant="text" width={30} height={19} />
                            <Skeleton variant="text" width={60} height={19} />
                        </LatestRateListItem>
                    )))
                }
            </List>
        </Card>
    );
}