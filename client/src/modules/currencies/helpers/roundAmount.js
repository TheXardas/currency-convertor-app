/**
 * Round amount for 0.05 steps
 * @param amount
 * @returns {string}
 */
export function roundAmount(amount) {
    return (Math.floor(amount * 20) / 20).toFixed(2)
}