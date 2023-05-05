import {Box} from "@mui/material";

export default function BackDrop() {
    return (
        <Box sx={{ position: 'absolute', top: 0, left: 0, overflow: 'hidden', width: '100%', height: '100%', zIndex: -1 }}>
            <Box sx={{ borderRadius: '50%', width: '200%', height: '200%', zIndex: 1, position: 'absolute', top: 0, left: '50%', background: 'purple', filter: 'blur(75px)' }}/>
            <Box sx={{ borderRadius: '50%', width: '200%', height: '200%', zIndex: 2, position: 'absolute', bottom: 0, left: '-100%', background: 'orange', filter: 'blur(150px)' }}/>
            <Box sx={{ borderRadius: '50%', width: '100%', height: '100%', zIndex: 3, position: 'absolute', top: '50%', left: '-20%', background: 'gray', filter: 'blur(75px)' }}/>
        </Box>
    )
}