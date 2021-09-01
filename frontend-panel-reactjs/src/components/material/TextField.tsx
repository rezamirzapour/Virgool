import { TextField as MaterialTextField, StandardTextFieldProps } from '@material-ui/core';
import { Control, useController } from 'react-hook-form'

interface ITextFieldProps extends Omit<StandardTextFieldProps, 'variant'> {
    name: string,
    control: Control<any>,
    variant?: 'standard' | 'outlined'
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
        error={invalid}
        helperText={error?.message}
        inputRef={ref}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        variant="outlined"
        fullWidth
        {...rest}
    />
}
