import { Grid } from '@material-ui/core'
import { DatePicker } from '@material-ui/pickers';
import { useState } from 'react';
import { DateTimeRangeValue } from './interface';
import { useEffect } from 'react';

interface IProps {
    onChange: (value: DateTimeRangeValue) => void,
    value: DateTimeRangeValue
}

export default function DateTimeRangeFilter({ onChange, value }: IProps) {
    const [state, setState] = useState<DateTimeRangeValue>(value)

    useEffect(() => { if (state.start !== null && state !== null) onChange(state) }, [state])

    return <Grid container spacing={3}>
        <Grid lg={6} item>
            <DatePicker
                fullWidth
                autoOk
                okLabel="تایید"
                cancelLabel="انصراف"
                value={state.start}
                onChange={value => setState(pre => ({ ...pre, start: value?.toDate?.() || null }))}
            />
        </Grid>
        <Grid lg={6} item>
            <DatePicker
                fullWidth
                autoOk
                okLabel="تایید"
                cancelLabel="انصراف"
                value={state.end}
                onChange={value => setState(pre => ({ ...pre, end: value?.toDate?.() || null }))}
            />
        </Grid>
    </Grid>
}
