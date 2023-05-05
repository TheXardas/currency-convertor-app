
export default function CurrencyFlag({ currencyCode, sx, ...rest }) {
    return (
        <img
            style={{ border: '1px solid gray', width: '36px', height: '26px', ...sx }}
            alt={currencyCode}
            src={`/flags/${currencyCode.toLowerCase()}.svg`}
            {...rest}
        />
    )
}