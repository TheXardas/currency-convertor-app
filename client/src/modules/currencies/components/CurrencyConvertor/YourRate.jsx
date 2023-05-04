import {Box, Skeleton, Typography} from "@mui/material";
import roundRate from "../../helpers/roundRate";

export default function YourRate({ from, to, rate, lastUpdated }) {
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', p: 2}}>
            <Typography fontSize={20}>Your rate:</Typography>
            {rate ? (
                <Typography fontSize={21}>{from} 1 = {to} {roundRate(rate)}</Typography>
            ) : (
                <Skeleton width={190} height={30}/>
            )}
        </Box>
    );
}