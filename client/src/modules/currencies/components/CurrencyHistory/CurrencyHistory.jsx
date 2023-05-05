import {Box, Card, Tab, Tabs} from "@mui/material";
import {useCallback, useEffect, useState} from "react";
import currencyService from "../../services/currencyService";
import {HISTORY_TIMEFRAMES} from "../../constants/currencies";
import {LineChart, CartesianGrid, Line, XAxis, YAxis, Tooltip, ResponsiveContainer} from 'recharts';
import StyledCardHeader from "../../../core/components/StyledCardHeader";
import useChartData from "../../hooks/useChartData";
import {useTheme} from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

export default function CurrencyHistory({ baseCurrencyCode, targetCurrencyCode }) {
    const [historyData, setHistoryData] = useState(null);
    const [timeframe, setTimeframe] = useState(HISTORY_TIMEFRAMES.MONTH)

    useEffect(() => {
        currencyService.history(timeframe, baseCurrencyCode, targetCurrencyCode).then(setHistoryData);
    }, [timeframe, baseCurrencyCode, targetCurrencyCode]);

    const chartData = useChartData(historyData);

    const handleChange = useCallback((event, value) => {
        setTimeframe(value);
    }, [setTimeframe])

    const theme = useTheme();
    const desktop = useMediaQuery(theme.breakpoints.up('md'), {noSsr: true})

    return (
        <Card>
            <StyledCardHeader title="Rates History" subheader={`${baseCurrencyCode} → ${targetCurrencyCode}`}/>

            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs
                    value={timeframe}
                    onChange={handleChange}
                    variant="scrollable"
                    scrollButtons="auto"
                    aria-label="basic tabs example"
                >
                    <Tab value={HISTORY_TIMEFRAMES.MONTH} label="Last month" />
                    <Tab value={HISTORY_TIMEFRAMES.THREE_MONTHS} label="Last 3 months" />
                    <Tab value={HISTORY_TIMEFRAMES.SIX_MONTHS} label="Last 6 months" />
                    <Tab value={HISTORY_TIMEFRAMES.TWELVE_MONTHS} label="Last 12 months" />
                </Tabs>
            </Box>

            <ResponsiveContainer width="100%" height={desktop ? 400 : 250}>
                <LineChart
                    width={1100}
                    height={desktop ? 400 : 250}
                    data={chartData}
                    margin={{ top: 20, right: 20, bottom: 15, left: -8 }}
                >
                    <Line type="monotone" dataKey="rate" stroke="#8884d8"  />
                    <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                    <XAxis style={{ fontSize: 13 }} dataKey="date" angle={-35} textAnchor='end'/>
                    <YAxis style={{ fontSize: 13 }}domain={['auto', 'auto']} interval={0} />
                    <Tooltip />
                </LineChart>
            </ResponsiveContainer>
        </Card>
    );
}
