import {Error} from "@mui/icons-material";
import {Box} from "@mui/material";

export default function FormError({ error }) {
    return (
        <Box color="error" sx={{ height: '20px', display: 'flex', alignItems: 'center', gap: 1 }}>
            {!!error && (
                <><Error color="error"/> {error}</>
            )}
        </Box>
    )
}