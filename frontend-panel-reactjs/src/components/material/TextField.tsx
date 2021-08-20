import { useCallback } from 'react';
import { TextField as MaterialTextField, StandardTextFieldProps } from '@material-ui/core';
import { Controller, UseFormMethods, } from 'react-hook-form'

interface ITextFieldProps extends StandardTextFieldProps {
    methods: Pick<UseFormMethods, 'control' | 'errors'>,
    rules?: Record<string, any>
}

export function TextField({ methods, rules, ...rest }: ITextFieldProps) {
    const getError = useCallback(() => methods.errors[rest.name as string]?.message ?? "", [methods.errors])
    return <Controller
        name={rest.name as string}
        control={methods.control}
        defaultValue={rest.defaultValue ?? ""}
        {...(rules && { rules })}
        render={(otherProps) => <MaterialTextField
            variant={rest.variant ?? "outlined"}
            fullWidth={rest.fullWidth ?? true}
            error={Boolean(getError())}
            helperText={getError()}
            {...rest}
            {...otherProps}
        />}
    />
}
