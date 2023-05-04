import {format} from "date-fns";
import roundRate from "../helpers/roundRate";
import {useMemo} from "react";

export default function useChartData(historyData) {
    return useMemo(() => {
        if (!historyData) return [];
        return Object.entries(historyData).map(([date, rate]) => ({
            date: format(new Date(date), 'MMM d'),
            rate: roundRate(rate)
        })).reverse()
    }, [historyData]);
}