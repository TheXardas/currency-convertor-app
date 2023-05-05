import {CardHeader, Divider} from "@mui/material";

export default function StyledCardHeader(props) {
    return (
        <>
            <CardHeader titleTypographyProps={{ fontSize: 20 }} sx={{ p: { xs: 1, md: 2 }, background: '#ffeed4', color: 'black' }} {...props} />
            <Divider/>
        </>
    );
}