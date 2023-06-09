/**
 * Round rate for 4 fraction digits
 * @param rate
 * @returns {string|*}
 */
export default function roundRate(rate) {
    if (!rate) return rate;
    return (Math.floor( rate * 10000 ) / 10000).toFixed(4)
}