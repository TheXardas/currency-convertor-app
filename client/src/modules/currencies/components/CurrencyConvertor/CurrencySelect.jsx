import {Autocomplete, Box, createFilterOptions, Skeleton, TextField} from "@mui/material";
import {useCallback} from "react";
import CurrencyFlag from "../CurrencyFlag";
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

export default function CurrencySelect({ label, value, onChange, options, ...rest }) {
    const handleChange = useCallback((event, newValue) => {
        if (!newValue) return;
        onChange(newValue.code);
    }, [onChange]);

    const isOptionEqualToValue = useCallback((option, value) => option.code === value, []);

    const theme = useTheme();
    const desktop = useMediaQuery(theme.breakpoints.up('md'), {noSsr: true});

    const renderOption = useCallback((props, option, { selected }) => (
        <Box sx={{ display: 'flex', width: '100%', justifyContent: 'space-between !important' }} key={option.id} {...props}>
            <span>{option.label} {desktop && (<span>{option.symbol} {option.name}</span>)}</span>
            <CurrencyFlag currencyCode={option.code} />
        </Box>
    ), [desktop]);

    const renderInput = useCallback((params) => (
        <TextField
            {...params}
            label={label}
            placeholder={label}
        />
    ), [label])

    const filterOptions = createFilterOptions({
        matchFrom: 'any',
        stringify: (option) => `${option.label} ${option.symbol} ${option.name}`,
    });

    if (options.length < 1) {
        return <Skeleton sx={{ flexGrow: 1 }} variant="rounded" width='auto' height={56}/>
    }

    return (
        <Box sx={{ position: 'relative', flexGrow: 1}}>
            <Autocomplete
                value={value}
                onChange={handleChange}
                isOptionEqualToValue={isOptionEqualToValue}
                renderOption={renderOption}
                renderInput={renderInput}
                options={options}
                disableClearable
                filterOptions={filterOptions}
                {...rest}
            />
            <CurrencyFlag
                sx={{ position: 'absolute', top: '15px', right: '40px', pointerEvents: 'none' }}
                currencyCode={value}
            />
        </Box>
    )
}