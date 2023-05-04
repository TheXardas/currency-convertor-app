import {Box, Typography} from "@mui/material";

export default function YourRate({ from, to, rate, lastUpdated }) {
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', p: 2}}>
            <Typography fontSize={20}>Your rate:</Typography>
            <Typography fontSize={21}>{from} 1 = {to} {rate}</Typography>
            <Typography fontSize={15}>Last updated {lastUpdated}</Typography>
        </Box>
    );
}