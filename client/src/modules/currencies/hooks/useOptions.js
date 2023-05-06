import {BASE_CURRENCY_CODE} from "../constants/currencies";
import {useMemo} from "react";

export default function useOptions(rates, currencies) {
    return useMemo(() => {
        if (!rates || !currencies) return [];
        return rates.filter(r => r.from === BASE_CURRENCY_CODE).map(r => {
            const currency = currencies.find(c => c.code === r.to);
            return {
                id: r.to,
                code: r.to,
                label: r.to,
                name: currency.name,
                symbol: currency.symbol,
            }
        });
    }, [rates, currencies])
}