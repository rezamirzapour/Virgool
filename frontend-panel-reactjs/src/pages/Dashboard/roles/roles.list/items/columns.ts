import { IColumn } from 'components/AwesomeTable/items/interface';
import { RolesResult } from 'services/roles';
import { parseDate } from 'utils';

const columns: IColumn<RolesResult>[] = [
    {
        title: 'شناسه',
        field: 'id',
    },
    {
        title: 'عنوان',
        field: 'title',
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