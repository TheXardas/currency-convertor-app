import {Avatar, Box} from "@mui/material";

export default function UserName({ name }) {
    return (
        <Box sx={{ width: '130px', display: 'flex', alignItems: 'center', gap: 1 }}>
            <Avatar /> {name}
        </Box>
    )
}