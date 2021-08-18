import { FilterOptions } from 'components/AwesomeFilter'
import { GetPermissionsParams } from 'services'

const initialFilterOptions = (): FilterOptions<GetPermissionsParams> => ({
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
