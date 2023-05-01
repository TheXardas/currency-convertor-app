import {IconButton} from "@mui/material";
import {Logout as LogoutIcon} from "@mui/icons-material";

export default function LogoutButton() {
    return (
        <IconButton>
            <LogoutIcon sx={{ color: 'white' }} />
        </IconButton>
    )
}