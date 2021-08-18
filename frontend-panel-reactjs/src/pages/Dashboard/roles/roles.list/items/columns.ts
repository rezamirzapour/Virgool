import { IColumn } from 'components/AwesomeTable/items/interface';
import { RolesPayloadResponse } from 'services/roles';
import jMomemnt from 'moment-jalaali';

const columns: IColumn<RolesPayloadResponse>[] = [
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