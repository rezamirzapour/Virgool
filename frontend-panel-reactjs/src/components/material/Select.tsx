import { Select as MaterialSelect, MenuItem, SelectProps } from '@material-ui/core';
import { Controller, Control } from 'react-hook-form'

interface ISelectProps extends SelectProps {
    options: [{
        label: string,
        value: any
    }],
    methods: {
        control: Control,
        errors: any
    }
}
export function Select({ methods, options, ...rest }: ISelectProps) {
    return <Controller
        name={rest.name as string}
        control={methods.control}
        defaultValue={rest.defaultValue ?? ""}
        render={(otherProps) => <MaterialSelect
            variant={rest.variant ?? "outlined"}
            fullWidth={rest.fullWidth ?? true}
            {...rest}
            {...otherProps}
        >
            {options.map(o => <MenuItem value={o.value}>{o.label}</MenuItem>)}
        </MaterialSelect>
        }
    />
}