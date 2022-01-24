import { Grid, TextField } from '@material-ui/core';
import { NumberRangeValue } from './interface';

interface IProps {
    value: NumberRangeValue,
    onChange: (value: NumberRangeValue) => void
}

export default function NumberRangeFilter({ value, onChange }: IProps) {
    const localOnChange = (key: "start" | 'end', inputValue: string) => {
        if (inputValue === "")
            return;
        const modifiedValue = Number(inputValue)
        if (!isNaN(modifiedValue))
            onChange({ ...value, [key]: modifiedValue })
    }

    return <Grid container spacing={3}>
        <Grid item lg={6}>
            <TextField
                value={value.start === null ? '' : value.start}
                placeholder="از"
                fullWidth
                variant="outlined"
                onChange={(ev) => localOnChange('start', ev.target.value)}
            />
        </Grid>
        <Grid item lg={6}>
            <TextField
                value={value.end === null ? '' : value.end}
                placeholder="تا"
                fullWidth
                variant="outlined"
                onChange={ev => localOnChange('end', ev.target.value)} />
        </Grid>
    </Grid>
}