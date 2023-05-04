import {Avatar, Box, Skeleton} from "@mui/material";

export default function UserName({ user }) {
    return (
        <Box sx={{ width: '130px', display: 'flex', alignItems: 'center', gap: 1 }}>
            {user ? (
                <>
                    <Avatar /> {user.name}
                </>
            ) : (
                <>
                    <Skeleton variant="circular" width={40} height={40} />
                    <Skeleton width={70} height={30}/>
                </>
            )}
        </Box>
    )
}