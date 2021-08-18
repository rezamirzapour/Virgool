import { FilterOptions } from 'components/AwesomeFilter';
import { GetUsersParms } from 'services/users';
import { IS_EMAIL_VERIFIED_OPTIONS, IS_PHONE_NUMBER_VERIFIED_OPTIONS } from './options';

const initialFilterOptions = (): FilterOptions<GetUsersParms> => ({
    defaultFilter: 'نام',
    filters: [
        {
            type: 'STRING',
            field: 'firstName',
            label: 'نام',
            value: "",
        },
        {
            type: 'STRING',
            field: 'email',
            label: 'ایمیل',
            value: "",
        },
        {
            type: 'SELECT',
            field: 'isEmailVerified',
            label: 'ایمیل مورد تایید است',
            value: "",
            options: IS_EMAIL_VERIFIED_OPTIONS
        },
        {
            type: 'SELECT',
            field: 'isPhoneNumberVerified',
            label: 'موبایل مورد تایید است',
            value: "",
            options: IS_PHONE_NUMBER_VERIFIED_OPTIONS
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
    ]
})

export default initialFilterOptions;
