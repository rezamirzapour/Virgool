import { Select as MaterialSelect, MenuItem, makeStyles, SelectProps } from '@material-ui/core';

interface ISelectProps extends SelectProps {
    options: [{
        label: string,
        value: any
    }]
}
export function Select(props: ISelectProps) {
    const classes = useStyles();
    const { options, ...otherProps } = props
    return <MaterialSelect
        className={classes.root}
        variant={props.variant ?? "outlined"}
        fullWidth={props.fullWidth ?? true}
        {...otherProps}>
        {options.map(o => <MenuItem value={o.value}>{o.label}</MenuItem>)}
    </MaterialSelect>
}

const useStyles = makeStyles({
    root: {

    }
});