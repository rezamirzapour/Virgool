import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSubmitData, useFetchDetails } from 'hooks';
import { Page } from 'components';
import { Grid } from '@material-ui/core';
import { TextField, Button } from 'components/material';
import { useForm } from 'react-hook-form';
import { UpdatePermissionDto, PermissionsServices, PermissionResponse } from 'services'

const defaultValues: UpdatePermissionDto = {
    title: "",
}

export default function PermissionsEdit() {
    const methods = useForm({ defaultValues })
    const { mutate, isSubmitting } = useSubmitData()
    const { id } = useParams<{ id?: string }>()
    const { fetchData, loading, response } = useFetchDetails<PermissionResponse>()

    const onSubmit = (data: UpdatePermissionDto) => {
        if (id)
            return mutate(() => PermissionsServices.update(+id, data))
    }

    useEffect(() => {
        if (id)
            fetchData(() => PermissionsServices.findOne(+id))
    }, [])

    useEffect(() => {
        methods.setValue("title", response.result?.title)
    }, [response])

    return <Page title="ویرایش دسترسی" loading={loading}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <TextField
                        name="title"
                        label="عنوان"
                        methods={methods}
                    />
                </Grid>
                <Grid item>
                    <Button
                        color="primary"
                        variant="contained"
                        loading={isSubmitting}
                        type="submit"
                    >
                        ویرایش دسترسی
                    </Button>
                </Grid>
            </Grid>
        </form>
    </Page>
}