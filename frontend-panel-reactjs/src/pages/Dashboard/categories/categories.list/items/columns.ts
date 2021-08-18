import { IColumn } from 'components/AwesomeTable/items/interface';
import { CategoriesPayloadResponse } from 'services/categories';
import jMomemnt from 'moment-jalaali';

const columns: IColumn<CategoriesPayloadResponse>[] = [
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
        render: (rd) => jMomemnt(rd.createdAt).format("jYYYY/jMM/jDD")
    },
    {
        title: 'آخرین ویرایش',
        render: (rd) => jMomemnt(rd.updatedAt).format("jYYYY/jMM/jDD")
    },
]

export default columns;