import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSubmitData, useFetchDetails } from 'hooks';
import { Page } from 'components';
import { Grid } from '@material-ui/core';
import { TextField, Button } from 'components/material';
import { useForm } from 'react-hook-form';
import { UpdatePermissionDto, PermissionsServices, PermissionResponse } from 'services'
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup'

const schema = yup.object().shape({
    title: yup.string()
        .required("عنوان اجباری می‌باشد")
        .max(128, "طول عنوان حداکثر ۱۲۸ کاراکتر می‌باشد")
})

export default function PermissionsEdit() {
    const { control, setValue, handleSubmit } = useForm({ resolver: yupResolver(schema) })
    const { mutate, isSubmitting } = useSubmitData()
    const { id } = useParams<{ id?: string }>()
    const { fetchData, loading, response } = useFetchDetails<PermissionResponse>()

    const onSubmit = (data: UpdatePermissionDto) => {
        id && mutate(() => PermissionsServices.update(+id, data))
    }

    useEffect(() => {
        id && fetchData(() => PermissionsServices.findOne(+id))
    }, [id])

    useEffect(() => {
        setValue("title", response.result?.title)
    }, [response])

    return <Page title="ویرایش دسترسی" loading={loading}>
        <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <TextField
                        name="title"
                        label="عنوان"
                        control={control}
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