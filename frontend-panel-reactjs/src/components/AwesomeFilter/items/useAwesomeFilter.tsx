import { useState } from 'react';
import { Filters, FilterOptions } from './interface';

export default function useAwesomeFilter(FilterOptions: FilterOptions) {
    const [state, setState] = useState<FilterOptions>(FilterOptions)

    const getValues = () => {
        const params: any = {}
        state.filters.forEach((filter) => {
            if (typeof filter.field === "string")
                if (filter.value)
                    params[filter.field] = filter.value
            // if (["DATE_TIME_RANGE", "NUMBER_RANGE"].includes(filter.type)) {
            if (filter.type === "DATE_TIME_RANGE" || filter.type === "NUMBER_RANGE") {
                if (filter.value.start !== null && filter.value.end !== null) {
                    params[filter.field.start] = filter.value.start
                    params[filter.field.end] = filter.value.end
                }
            }
        });
        return params;
    }

    const onFilterChange = (filters: Filters) => setState(pre => ({ ...pre, filters }))

    const getValuesAsQueryString = () => {
        let query = "?"
        state.filters.forEach(filter => {
            switch (filter.type) {
                case 'STRING':
                case 'SELECT': {
                    if (filter.value)
                        query += `${filter.field.toString()}=${filter.value}&`
                    break;
                }
                case 'NUMBER_RANGE':
                case 'DATE_TIME_RANGE': {
                    if (filter.value.start && filter.value.end)
                        query += `${filter.field.start.toString()}=${filter.value.start}&${filter.field.end.toString()}=${filter.value.end}`
                    break;
                }
            }
        })
        return query;
    }


    return { onFilterChange, getValues, getValuesAsQueryString, filterOptions: state };
}