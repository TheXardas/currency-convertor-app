import {Box, Skeleton} from "@mui/material";
import CurrencyFlag from "./CurrencyFlag";

export default function CurrencyWithFlag({ currencyCode, sx, ...rest }) {
    return (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, ...sx }} {...rest}>
            {currencyCode ? (
                <>
                    <CurrencyFlag currencyCode={currencyCode}/>
                    <span>{currencyCode}</span>
                </>
            ) : (
                <>
                    <Skeleton variant="rectangular" width={37} height={27} />
                    <Skeleton variant="text" width={30} height={19} />
                </>
            )}
        </Box>
    )
}