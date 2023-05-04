import {Autocomplete, Skeleton, TextField} from "@mui/material";
import {useCallback} from "react";

export default function CurrencySelect({ label, value, onChange, options, ...rest }) {
    const handleChange = useCallback((event, newValue) => {
        if (!newValue) return;
        onChange(newValue.code);
    }, [onChange]);

    const isOptionEqualToValue = useCallback((option, value) => option.code === value, []);

    const renderOption = useCallback((props, option, { selected }) => (
        <div key={option.id} {...props}>
            {option.label} {option.symbol} {option.name}
        </div>
    ), []);

    const renderInput = useCallback((params) => (
        <TextField
            {...params}
            label={label}
            placeholder={label}
        />
    ), [label])

    if (options.length < 1) {
        return <Skeleton sx={{ flexGrow: 1 }} variant="rounded" width='auto' height={56}/>
    }

    return (
        <Autocomplete
            sx={{ flexGrow: 1 }}
            value={value}
            onChange={handleChange}
            isOptionEqualToValue={isOptionEqualToValue}
            renderOption={renderOption}
            renderInput={renderInput}
            options={options}
            disableClearable
            {...rest}
        />
    )
}