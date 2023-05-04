export function roundAmount(amount) {
    return (Math.floor(amount * 20) / 20).toFixed(2)
}