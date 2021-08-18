import { Filters, FilterOptions, DateTimeRangeValue, NumberRangeValue } from './items/interface';
import { Grid, Select, ListItem, Button } from '@material-ui/core';
import { Sort as SortIcon } from '@material-ui/icons';
import { useState } from 'react';
import { TextFieldFilter, SelectFilter, DateTimeRangeFilter, NumberRangeFilter } from './items'

interface IProps {
    onFilterChange: (filters: Filters) => void;
    filterOptions: FilterOptions,
    onApplyFilter: () => void
}

export default function AwesomeFilter(props: IProps) {
    const { filterOptions, onFilterChange, onApplyFilter } = props;
    const [currentFilter, setCurrentFilter] = useState(filterOptions.filters.find(f => f.label === filterOptions.defaultFilter))

    const onSelectChange = (label: string) => {
        const targetFilter = filterOptions.filters.find(f => f.label === label)
        setCurrentFilter(targetFilter)
    }

    function commonOnChange<T>(label: string, value: T) {
        const previousValue = [...filterOptions.filters]
        const target = previousValue.find(f => f.label === label)
        if (target)
            target.value = value
        onFilterChange(previousValue);
    }

    const onTextFieldFilterChange = (label: string, value: string | number) => {
        commonOnChange(label, value)
    }

    const onDateTimeRangeChange = (label: string, value: DateTimeRangeValue) => {
        commonOnChange(label, value)
    }

    const onNumberRangeChange = (label: string, value: NumberRangeValue) => {
        commonOnChange(label, value)
    }

    const getInput = () => {
        switch (currentFilter?.type) {
            case 'STRING': return <TextFieldFilter value={currentFilter?.value} onChange={ev => onTextFieldFilterChange(currentFilter.label, ev.target.value)} />
            case 'SELECT': return <SelectFilter options={currentFilter.options} selectProps={{ value: currentFilter?.value, onChange: ev => onTextFieldFilterChange(currentFilter.label, ev.target.value as string) }} />
            case 'DATE_TIME_RANGE': return <DateTimeRangeFilter value={currentFilter.value} onChange={value => onDateTimeRangeChange(currentFilter.label, value)} />
            case 'NUMBER_RANGE': return <NumberRangeFilter value={currentFilter.value} onChange={value => onNumberRangeChange(currentFilter.label, value)} />
        }
    }

    return (
        <Grid container spacing={3} alignItems="center">
            <Grid item lg={4}>
                <Select variant="outlined" fullWidth value={currentFilter?.label} onChange={(ev) => onSelectChange(ev.target.value as string)}>
                    {filterOptions.filters.map(filter => <ListItem key={filter.label} value={filter.label}>{filter.label}</ListItem>)}
                </Select>
            </Grid>
            <Grid item lg={5}>
                {getInput()}
            </Grid>
            <Grid item lg={3}>
                <Button color="primary" variant="contained" onClick={onApplyFilter} endIcon={<SortIcon />}>اعمال فیلتر</Button>
            </Grid>
        </Grid>
    )
}