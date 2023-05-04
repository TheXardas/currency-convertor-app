import {ListItem} from "@mui/material";

export default function LatestRateListItem(props) {
    return (
        <ListItem sx={{ p: 2, width: '100%', display: 'flex', justifyContent: 'space-between' }} divider {...props}/>
    )
}