import { FilterOptions } from 'components/AwesomeFilter'
import type { GetRolesParms } from 'types'

const initialFilterOptions = (): FilterOptions<GetRolesParms> => ({
    defaultFilter: 'عنوان',
    filters: [
        {
            type: 'STRING',
            field: 'title',
            label: 'عنوان',
            value: "",
        },
        {
            type: 'DATE_TIME_RANGE',
            field: {
                start: 'startDate',
                end: "endDate"
            },
            label: 'بازه تاریخی',
            value: {
                start: null,
                end: null
            }

        }
    ]
})

export default initialFilterOptions;
