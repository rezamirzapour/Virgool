import { IColumn } from 'components/AwesomeTable/items/interface';
import { PermissionsPayload } from 'services';
import jMomemnt from 'moment-jalaali';

const columns: IColumn<PermissionsPayload>[] = [
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