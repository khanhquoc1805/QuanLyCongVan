import { TextField } from "@mui/material";
import React, { InputHTMLAttributes } from "react";
import { Control, useController } from "react-hook-form";

interface InputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
    name: string;
    control: Control<any>;
    label?: string;
}

export function InputField(props: InputFieldProps) {
    const { name, control, label, ...inputProps } = props;

    const {
        field: { value, onChange, onBlur, ref },
        fieldState: { invalid, error },
    } = useController({ name, control });
    return (
        <TextField
            label={label}
            variant="outlined"
            value={value}
            fullWidth
            margin="normal"
            onChange={onChange}
            onBlur={onBlur}
            inputRef={ref}
            error={invalid}
            helperText={error?.message}
            inputProps={inputProps}
        />
    );
}
