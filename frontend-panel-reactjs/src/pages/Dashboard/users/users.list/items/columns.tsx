import { IColumn } from 'components/AwesomeTable/items/interface';
import { UsersPayloadResponse } from 'services/users';
import { colors, Avatar, Box } from '@material-ui/core';
import { Check as CheckIcon, Close as CloseIcon } from '@material-ui/icons'
import jMomemnt from 'moment-jalaali';

const columns: IColumn<UsersPayloadResponse>[] = [
    {
        title: 'شناسه',
        field: 'id',
    },
    {
        title: 'نام',
        field: 'firstName',
    },
    {
        title: ' نام خانوادگی',
        field: 'lastName',
    },
    {
        title: ' ایمیل',
        field: 'email',
    },
    {
        title: ' شماره موبایل',
        render: (rd) => rd.phoneNumber ?? '-',
    },
    {
        title: 'تاییدیه ایمیل',
        render: (rd) => rd.isEmailVerified ? <CheckIcon style={{ color: colors.green[500] }} /> : <CloseIcon style={{ color: colors.red[500] }} />,
    },
    {
        title: 'تاییدیه موبایل',
        render: (rd) => rd.isPhoneNumberVerified ? <CheckIcon style={{ color: colors.green[500] }} /> : <CloseIcon style={{ color: colors.red[500] }} />,
    },
    {
        title: 'نصویر شاخص',
        render: (rd) => <Box display="flex" justifyContent="center">
            <Avatar src={rd.avatar?.toString() ?? ''} alt={rd.firstName}>{rd.firstName[0]}</Avatar>
        </Box>
    },
    {
        title: 'تاریخ ایجاد',
        render: (rd) => jMomemnt(rd.createdAt).format("jYYYY/jMM/jDD")
    },
    {
        title: 'آخرین ویرایش',
        render: (rd) => jMomemnt(rd.updatedAt).format("jYYYY/jMM/jDD")
    },
]

export default columns;