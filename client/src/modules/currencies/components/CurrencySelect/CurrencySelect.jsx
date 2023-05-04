import {Autocomplete, TextField} from "@mui/material";

export default function CurrencySelect({ label, value, onChange, options }) {
    return (
        <Autocomplete
            value={value}
            onChange={onChange}
            isOptionEqualToValue={(option, value) => option.code === value}
            renderOption={(props, option, { selected }) => (
                <div key={option.id} {...props}>
                    {option.label} {selected && 'SELECTED'}
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
        />
    )
}