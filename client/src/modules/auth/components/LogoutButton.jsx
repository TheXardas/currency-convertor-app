import {IconButton} from "@mui/material";
import {Logout as LogoutIcon} from "@mui/icons-material";
import authService from "../services/authService";

export default function LogoutButton() {
    return (
        <IconButton onClick={authService.logout}>
            <LogoutIcon sx={{ color: 'white' }}/>
        </IconButton>
    )
}