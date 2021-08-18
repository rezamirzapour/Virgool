import { IColumn } from 'components/AwesomeTable/items/interface';
import { PermissionsPayload } from 'services';

const columns: IColumn<PermissionsPayload>[] = [
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