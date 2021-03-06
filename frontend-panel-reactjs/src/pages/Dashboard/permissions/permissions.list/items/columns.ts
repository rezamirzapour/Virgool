import { IColumn } from 'components/AwesomeTable/items/interface';
import { PermissionsResult } from 'types';

const columns: IColumn<PermissionsResult>[] = [
    {
        title: 'شناسه',
        field: 'id',
    },
    {
        title: 'عنوان',
        field: 'title',
    }
]

export default columns;