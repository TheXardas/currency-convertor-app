import {TextField} from "@mui/material";
import {forwardRef, useCallback} from "react";

export default forwardRef(function LoginFormInput({ onChange, ...rest }, ref) {
    const handleChange = useCallback(e => onChange(e.target.value), [onChange]);
    return (
        <TextField
            onChange={handleChange}
            variant="outlined"
            color="secondary"
            type="text"
            sx={{mb: 3}}
            fullWidth
            inputRef={ref}
            {...rest}
        />
    )
})