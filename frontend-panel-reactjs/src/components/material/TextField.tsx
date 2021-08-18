import { TextField as MaterialTextField, makeStyles, StandardTextFieldProps } from '@material-ui/core';
import { Controller, Control } from 'react-hook-form'

interface ITextFieldProps extends StandardTextFieldProps {
    methods: {
        control: Control,
        errors: any
    }
}

export function TextField({ methods, ...rest }: ITextFieldProps) {
    const classes = useStyles();
    return <Controller
        name={rest.name as string}
        control={methods.control}
        defaultValue={rest.defaultValue ?? ""}
        render={(otherProps) => <MaterialTextField
            className={classes.root}
            variant={rest.variant ?? "outlined"}
            fullWidth={rest.fullWidth ?? true}
            {...rest}
            {...otherProps}
        />}
    />
}

const useStyles = makeStyles({
    root: {

    }
});