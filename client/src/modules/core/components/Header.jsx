import {AppBar, Toolbar, Typography} from "@mui/material";
import UserName from "../../auth/components/UserName";
import LogoutButton from "../../auth/components/LogoutButton";
import {useAuth} from "../../auth/context/AuthContext";

export default function Header(props) {
    const {user} = useAuth();

    return (
        <AppBar position="static" color="secondary" {...props}>
            <header>
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        Exchange
                    </Typography>

                    {user && (
                        <>
                            <UserName name={user.name}/>

                            <LogoutButton/>
                        </>
                    )}
                </Toolbar>
            </header>
        </AppBar>
    )
}