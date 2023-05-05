import {useCallback, useState} from "react";
import {DEFAULT_AMOUNT} from "../constants/currencies";
import fixAmount from "../helpers/fixAmount";
import {roundAmount} from "../helpers/roundAmount";

let updateTimer;

/**
 * Since user can change both amounts, and we have strict rounding requirements,
 * we process amounts a second after it was typed in.
 * @param rate
 * @returns {{handleTargetAmountChange: ((function(*): void)|*), fromAmount: number, toAmount: number, handleFromAmountChange: ((function(*): void)|*)}}
 */
export default function useConvertor(rate) {
    const [fromAmount, setFromAmount] = useState(DEFAULT_AMOUNT);
    const [toAmount, setToAmount] = useState(0);

    const fixFromAmount = useCallback((newAmount) => {
        const fixed = fixAmount(newAmount)
        setFromAmount(fixed);
        setToAmount(roundAmount(fixed * rate))
    }, [rate, setFromAmount, setToAmount])

    const fixToAmount = useCallback((newAmount) => {
        const fixed = fixAmount(newAmount)
        setToAmount(fixed)
        setFromAmount(roundAmount(fixed / rate))
    })

    const handleFromAmountChange = useCallback((newAmount) => {
        setFromAmount(newAmount)
        clearTimeout(updateTimer)
        updateTimer = setTimeout(() => fixFromAmount(newAmount), 1000)
        if (isNaN(Number(newAmount)) || !newAmount) return;
        setToAmount(roundAmount(newAmount * rate))
    }, [rate, fixFromAmount])

    const handleTargetAmountChange = useCallback((newAmount) => {
        setToAmount(newAmount)
        clearTimeout(updateTimer)
        updateTimer = setTimeout(() => fixToAmount(newAmount), 1000)
        if (isNaN(Number(newAmount)) || !newAmount) return;
        setFromAmount(roundAmount(newAmount / rate))
    }, [rate])
    return {
        handleFromAmountChange,
        handleTargetAmountChange,
        fromAmount,
        toAmount,
    };
}