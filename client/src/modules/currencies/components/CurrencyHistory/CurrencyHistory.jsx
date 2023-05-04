import {Box, Card, CardHeader, Divider, Tab, Tabs} from "@mui/material";
import {useCallback, useEffect, useMemo, useState} from "react";
import currencyService from "../../services/currencyService";
import {HISTORY_TIMEFRAMES} from "../../constants/currencies";
import {LineChart, CartesianGrid, Line, XAxis, YAxis, Tooltip} from 'recharts';
import {format} from 'date-fns';
import StyledCardHeader from "../../../core/components/StyledCardHeader";

export default function CurrencyHistory({ baseCurrencyCode, targetCurrencyCode }) {
    const [historyData, setHistoryData] = useState(null);
    const [timeframe, setTimeframe] = useState(HISTORY_TIMEFRAMES.MONTH)

    useEffect(() => {
        currencyService.history(timeframe, baseCurrencyCode, targetCurrencyCode).then(setHistoryData);
    }, [timeframe, baseCurrencyCode, targetCurrencyCode]);

    const chartData = useMemo(() => {
        if (!historyData) return [];
        return Object.entries(historyData).map(([date, rate]) => ({
            date: format(new Date(date), 'MMM d'),
            rate,
        })).reverse()
    }, [historyData]);

    const handleChange = useCallback((event, value) => {
        setTimeframe(value);
    }, [setTimeframe])

    return (
        <Card>
            <StyledCardHeader title="Rates History" subheader={`${baseCurrencyCode} - ${targetCurrencyCode}`}/>

            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={timeframe} onChange={handleChange} aria-label="basic tabs example">
                    <Tab value={HISTORY_TIMEFRAMES.MONTH} label="Last month" />
                    <Tab value={HISTORY_TIMEFRAMES.THREE_MONTHS} label="Last 3 months" />
                    <Tab value={HISTORY_TIMEFRAMES.SIX_MONTHS} label="Last 6 months" />
                    <Tab value={HISTORY_TIMEFRAMES.TWELVE_MONTHS} label="Last 12 months" />
                </Tabs>
            </Box>

            <LineChart
                width={1100}
                height={400}
                data={chartData}
                margin={{ top: 30, right: 30, bottom: 45, left: 10 }}
            >
                <Line type="monotone" dataKey="rate" stroke="#8884d8"  />
                <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                <XAxis dataKey="date" angle={-35} textAnchor='end'/>
                <YAxis domain={['auto', 'auto']} interval={0} />
                <Tooltip />
            </LineChart>

        </Card>
    );
}
