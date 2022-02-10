import {
    FormControl,
    FormControlLabel,
    FormHelperText,
    FormLabel,
    Radio,
    RadioGroup,
} from "@mui/material";
import React from "react";
import { Control, useController } from "react-hook-form";

interface RadioGroupFieldProps {
    name: string;
    control: Control<any>;
    label?: string;
    disable?: boolean;
    options: RadioOption[];
}

export interface RadioOption {
    label?: string;
    value: number | string;
}

export function RadioGroupField(props: RadioGroupFieldProps) {
    const { name, control, label, disable, options } = props;

    const {
        field: { value, onChange, onBlur },
        fieldState: { invalid, error },
    } = useController({ name, control });
    return (
        <FormControl
            component="fieldset"
            error={invalid}
            margin="normal"
            disabled={disable}
        >
            <FormLabel component="legend">{label}</FormLabel>
            <RadioGroup
                name={name}
                value={value}
                onChange={onChange}
                onBlur={onBlur}
                row
            >
                {options.map((option) => (
                    <FormControlLabel
                        key={option.value}
                        value={option.value}
                        control={<Radio />}
                        label={option?.label as string}
                    />
                ))}
            </RadioGroup>
            <FormHelperText>{error?.message}</FormHelperText>
        </FormControl>
    );
}
