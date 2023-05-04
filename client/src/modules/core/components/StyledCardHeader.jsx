import {CardHeader, Divider} from "@mui/material";

export default function StyledCardHeader(props) {
    return (
        <>
            <CardHeader sx={{ background: '#ffeed4', color: 'black' }} {...props} />
            <Divider/>
        </>
    );
}