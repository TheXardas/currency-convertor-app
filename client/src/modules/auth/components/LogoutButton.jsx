import {IconButton, Skeleton} from "@mui/material";
import {Logout as LogoutIcon} from "@mui/icons-material";
import authService from "../services/authService";

export default function LogoutButton({ user }) {
    return (
        <IconButton onClick={user ? authService.logout : undefined}>
            {user ? (
                <LogoutIcon sx={{ color: 'white' }}/>
            ) : (
                <Skeleton width={24} height={30}/>
            )}
        </IconButton>
    )
}