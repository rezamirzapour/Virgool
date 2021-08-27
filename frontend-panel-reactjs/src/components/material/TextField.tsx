import { TextField as MaterialTextField, StandardTextFieldProps } from '@material-ui/core';
import { Control, useController } from 'react-hook-form'

interface ITextFieldProps extends StandardTextFieldProps {
    name: string,
    control: Control<any>,
}

export function TextField({ control, ...rest }: ITextFieldProps) {
    const {
        field: { value, onChange, onBlur, ref },
        fieldState: { invalid, error },
    } = useController({
        name: rest.name,
        control,
    });
    return <MaterialTextField
        variant={rest.variant ?? "outlined"}
        fullWidth={rest.fullWidth ?? true}
        error={invalid}
        helperText={error?.message}
        inputRef={ref}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        {...rest}
    />
}
