import { IColumn } from 'components/AwesomeTable/items/interface';
import { CategoriesResult } from 'services/categories';
import { parseDate } from 'utils';

const columns: IColumn<CategoriesResult>[] = [
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