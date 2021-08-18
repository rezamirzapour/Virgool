import { useEffect, useState } from 'react';
import { Grid, useTheme } from '@material-ui/core';
import { Edit as EditIcon, Add as AddIcon, DeleteForever as DeleteIcon, VerifiedUser as VerifiedUserIcon } from '@material-ui/icons';
import { RolesServices, RolesResponse } from 'services/roles';
import { AwesomeTable, useAwesomeTable } from 'components/AwesomeTable'
import { AwesomeFilter, useAwesomeFilter } from 'components/AwesomeFilter';
import { Page } from 'components'
import { useRouter, useMutate } from 'hooks';
import { initialFilterOptions, columns } from './items'
import { Button } from 'components/material';

export default function RolesList() {
    const [isOpenDialog, setIsOpenDialog] = useState(false)
    const { fetchData, loading, pagination, response, setPage, setSize } = useAwesomeTable<RolesResponse>();
    const { getValues, onFilterChange, filterOptions } = useAwesomeFilter(initialFilterOptions);
    const { navigate } = useRouter();
    const { mutate, isSubmitting } = useMutate()
    const theme = useTheme()

    const onApplyFiler = () => fetchData(
        () => RolesServices.findAll({
            offset: pagination.offset,
            size: pagination.size,
            ...getValues()
        })
    )

    const onDelete = async (rd: any) => {
        await mutate(() => RolesServices.remove(rd.id))
        onApplyFiler()
    }

    useEffect(() => {
        onApplyFiler()
    }, [pagination])

    return <Page title="لیست نقش ها" meta={
        <Button
            variant="contained"
            color="primary"
            startIcon={<AddIcon />}
            onClick={() => navigate("roles.create")}>
            افزودن نقش
        </Button>}
    >
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
                    onClick: (rd) => navigate('roles.edit', { params: { id: rd.id } }),
                    tooltip: 'ویرایش',
                },
                {
                    icon: <DeleteIcon color="secondary" />,
                    onClick: onDelete,
                    tooltip: 'حذف',
                    loading: isSubmitting
                },
                {
                    icon: <VerifiedUserIcon style={{ color: theme.palette.success.main }} />,
                    onClick: (rd) => setIsOpenDialog(true),
                    tooltip: 'مشاهده دسترسی ها',
                },
            ]}
        />
    </Page>
}