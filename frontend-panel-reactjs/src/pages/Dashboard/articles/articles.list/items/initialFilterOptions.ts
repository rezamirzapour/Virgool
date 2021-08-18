import { FilterOptions } from 'components/AwesomeFilter'
import { STAUS_OPTIONS } from './options'
import { GetArticlesParms } from 'services/articles'
const initialFilterOptions = (): FilterOptions<GetArticlesParms> => ({
    defaultFilter: 'عنوان',
    filters: [
        {
            type: 'STRING',
            field: 'title',
            label: 'عنوان',
            value: "",
        },
        {
            type: 'SELECT',
            field: 'status',
            label: 'وضعیت',
            value: "",
            options: STAUS_OPTIONS
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

        },
        {
            type: 'NUMBER_RANGE',
            field: {
                start: 'startLikeCount',
                end: "endLikeCount"
            },
            label: 'تعداد لایک',
            value: {
                start: null,
                end: null
            }
        },
    ]
})

export default initialFilterOptions;
