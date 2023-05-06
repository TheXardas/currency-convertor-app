import {DEFAULT_AMOUNT} from "../constants/currencies";
import {roundAmount} from "./roundAmount";

export default function fixAmount(amount) {
    let formatted = Number(amount
        .toString()
        .replace(/,/g, '.')
        .replace(/[\D[^.]]/g, '')
    );
    if (isNaN(formatted) || !formatted) formatted = DEFAULT_AMOUNT;
    return roundAmount(formatted);
}