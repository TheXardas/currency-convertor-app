import {AppBar, Toolbar, Typography} from "@mui/material";
import UserName from "../../auth/components/UserName";
import LogoutButton from "../../auth/components/LogoutButton";

export default function Header(props) {
    return (
        <AppBar position="static" {...props}>
            <header>
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        Currencies Rates
                    </Typography>

                    <UserName/>

                    <LogoutButton/>
                </Toolbar>
            </header>
        </AppBar>
    )
}