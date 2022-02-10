import {
    FormControl,
    FormHelperText,
    InputLabel,
    MenuItem,
    Select,
} from "@mui/material";
import React from "react";
import { Control, useController } from "react-hook-form";

interface SelectProps {
    name: string;
    control: Control<any>;
    label?: string;
    disable?: boolean;
    options: SelectOption[];
}

export interface SelectOption {
    label?: string;
    value: number | string;
}

export function SelectField(props: SelectProps) {
    const { name, control, label, disable, options } = props;

    const {
        field: { value, onChange, onBlur },
        fieldState: { invalid, error },
    } = useController({ name, control });
    return (
        <FormControl
            fullWidth
            variant="outlined"
            error={invalid}
            margin="normal"
            disabled={disable}
        >
            <InputLabel id={`${name}_label`}>{label}</InputLabel>
            <Select
                labelId={`${name}_label`}
                value={value}
                onChange={onChange}
                onBlur={onBlur}
                label={label}
            >
                {options.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                        {option.label}
                    </MenuItem>
                ))}
            </Select>
            <FormHelperText>{error?.message}</FormHelperText>
        </FormControl>
    );
}
