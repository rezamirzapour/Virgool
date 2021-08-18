import { useEffect } from 'react';
import { Grid } from '@material-ui/core';
import { Edit as EditIcon } from '@material-ui/icons';
import { UsersServices, UsersResponse } from 'services/users';
import { AwesomeTable, useAwesomeTable } from 'components/AwesomeTable'
import { AwesomeFilter, useAwesomeFilter } from 'components/AwesomeFilter';
import { Page } from 'components'
import { useRouter } from 'hooks';
import { initialFilterOptions, columns } from './items'

export default function UsersList() {
    const { fetchData, loading, pagination, response, setPage, setSize } = useAwesomeTable<UsersResponse>();
    const { getValues, onFilterChange, filterOptions } = useAwesomeFilter(initialFilterOptions);
    const { navigate } = useRouter();
    const onApplyFiler = () => fetchData(() => UsersServices.findAll({ offset: pagination.offset, size: pagination.size, ...getValues() }))

    useEffect(() => {
        onApplyFiler()
    }, [pagination])

    return <Page title="لیست کاریران" >
        <Grid spacing={3} container alignItems="center">
            <Grid lg={6} item>
                <AwesomeFilter
                    filterOptions={filterOptions}
                    onFilterChange={onFilterChange}
                    onApplyFilter={onApplyFiler}
                />
            </Grid>
        </Grid>
        <AwesomeTable
            columns={columns}
            loading={loading}
            page={pagination.page}
            query={{ data: response.result, totalCount: response.count }}
            setPage={setPage}
            setSize={setSize}
            size={pagination.size}
            actions={[
                {
                    icon: <EditIcon color="primary" />,
                    onClick: (rd) => navigate('users.edit', { params: { id: rd.id } }),
                    tooltip: 'ویرایش',
                }
            ]}
        />
    </Page>
}