import {Skeleton, TextField} from "@mui/material";
import {useCallback} from "react";

export default function Amount({ label, value, onChange, isLoaded }) {
    const handleChange = useCallback(e => onChange(e.target.value), [onChange])

    if (!isLoaded) {
        return <Skeleton variant="rounded" width={197} height={56} />
    }

    return (
        <TextField
            sx={{ flexShrink: 1 }}
            label={label}
            onChange={handleChange}
            variant="outlined"
            color="secondary"
            type="text"
            value={value}
        />
    )
}