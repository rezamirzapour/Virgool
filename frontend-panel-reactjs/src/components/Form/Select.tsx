import { Select, FormControl, MenuItem, makeStyles } from '@material-ui/core'
import { Controller } from 'react-hook-form'
import clsx from 'clsx'

interface ISelect {
    multiple: boolean;
    options: any[];
    label: string;
    name: string;
    methods: any;
    onChange: (ev: any) => void
}
export default function CustomSelect({
    multiple = false,
    options = [],
    label,
    name,
    methods,
    onChange
}: ISelect) {
    const classes = useStyles()
    return (<div className="mb-4">
        <p className="mb-1">{label}</p>
        <FormControl fullWidth variant="outlined">
            <Controller
                control={methods.control}
                name={name}
                as={
                    <Select
                        name={name}
                        onChange={onChange}
                        multiple={multiple}

                    >
                        {options?.map?.((o) => (
                            <MenuItem key={o.value} value={o.value}>
                                {o.label}
                            </MenuItem>
                        ))}
                    </Select>
                }
            />
        </FormControl>
        <p className={clsx("text-red-500 text-xs", classes.errorMessage)}>{methods?.errors?.[name]?.message}</p>
    </div>
    )
}

const useStyles = makeStyles(() => ({
    errorMessage: {
        minHeight: '16px'
    }
}))