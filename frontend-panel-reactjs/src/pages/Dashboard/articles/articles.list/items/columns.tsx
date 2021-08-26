import { IColumn } from 'components/AwesomeTable/items/interface';
import { ArticlesResult } from 'services/articles';
import { colors, Avatar, Box } from '@material-ui/core';
import { parseDate } from 'utils'
import { STAUS_OPTIONS } from './options';

const columns: IColumn<ArticlesResult>[] = [
    {
        title: 'شناسه',
        field: 'id',
    },
    {
        title: 'عنوان',
        field: 'title',
    },
    {
        title: 'تعداد لایک',
        render: (rd) => <p style={{ color: rd.likeCount > 10 ? colors.green['400'] : colors.red['400'] }}>{rd.likeCount}</p>
    },
    {
        title: 'نویسنده',
        render: (rd) => rd.author ? `${rd.author.firstName} ${rd.author.lastName}` : '-'
    },
    {
        title: 'وضعیت',
        render: (rd) => STAUS_OPTIONS.find(o => o.value === rd.status)?.label ?? '-'
    },
    {
        title: 'نصویر شاخص',
        render: (rd) => <Box display="flex" justifyContent="center">
            <Avatar src={rd.thumbnailId?.toString() ?? ''} alt={rd.title}>{rd.title[0]}</Avatar>
        </Box>
    },
    {
        title: 'تاریخ ایجاد',
        render: (rd) => parseDate(rd.createdAt)
    },
    {
        title: 'آخرین ویرایش',
        render: (rd) => parseDate(rd.updatedAt)
    },
]

export default columns;