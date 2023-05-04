import findRate from "../helpers/findRate";
import {CURRENT_CURRENCIES_CODES, MAX_LATEST_CURRENCIES_DISPLAYED} from "../constants/currencies";
import {useMemo} from "react";

export default function useLatestRates(rates, baseCurrencyCode) {
    return useMemo(() => CURRENT_CURRENCIES_CODES
        .filter(c => c !== baseCurrencyCode)
        .map(c => rates && {
            id: baseCurrencyCode + c,
            to: c,
            rate: findRate(rates, baseCurrencyCode, c),
        })
        .filter((r) => !!r)
        .slice(0, MAX_LATEST_CURRENCIES_DISPLAYED)
    , [rates, baseCurrencyCode]);
}