import {ListItem} from "@mui/material";

export default function LatestRateListItem(props) {
    return (
        <ListItem sx={{ p: 1.5, width: '100%', display: 'flex', justifyContent: 'space-between' }} divider {...props}/>
    )
}