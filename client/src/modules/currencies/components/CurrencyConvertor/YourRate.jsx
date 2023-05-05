import {Box, Skeleton, Typography} from "@mui/material";
import roundRate from "../../helpers/roundRate";

export default function YourRate({ from, to, rate, lastUpdated }) {
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', p: { xs: 1, md: 2 }}}>
            <Typography fontSize={{ xs: 13, md: 15 }}>Your rate:</Typography>
            <Typography fontSize={{ xs: 15, md: 21}}>
            {rate ? (
                <>{from} 1 = {to} {roundRate(rate)}</>
            ) : (
                <Skeleton variant="text" width={190} />
            )}
            </Typography>
        </Box>
    );
}