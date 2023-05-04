import {Autocomplete, TextField} from "@mui/material";

export default function CurrencySelect({ label, value, onChange, options, ...rest }) {
    return (
        <Autocomplete
            value={value}
            onChange={onChange}
            isOptionEqualToValue={(option, value) => option.code === value}
            renderOption={(props, option, { selected }) => (
                <div key={option.id} {...props}>
                    {option.label} {option.symbol} {option.name}
                </div>
            )}
            renderInput={(params) => (
                <TextField
                    {...params}
                    label={label}
                    placeholder={label}
                />
            )}
            options={options}
            {...rest}
        />
    )
}