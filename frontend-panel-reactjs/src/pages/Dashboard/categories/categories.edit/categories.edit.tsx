import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSubmitData, useFetchDetails } from 'hooks';
import { Page } from 'components';
import { Grid } from '@material-ui/core';
import { TextField, Button } from 'components/material';
import { useForm } from 'react-hook-form';
import { CategoriesServices, CategoryResponse } from 'services/categories'
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup'

const schema = yup.object().shape({
    title: yup.string()
        .required("عنوان اجباری می‌باشد")
        .max(128, "طول عنوان حداکثر ۱۲۸ کاراکتر می‌باشد")
})

export default function CategoriesEdit() {
    const { control, handleSubmit, getValues, setValue } = useForm({ resolver: yupResolver(schema) })
    const { mutate, isSubmitting } = useSubmitData()
    const { id } = useParams<{ id?: string }>()
    const { fetchData, loading, response } = useFetchDetails<CategoryResponse>()

    const onSubmit = () => {
        if (id)
            return mutate(() => CategoriesServices.update(+id, getValues()))
    }

    useEffect(() => {
        if (id)
            fetchData(() => CategoriesServices.findOne(+id))
    }, [])

    useEffect(() => {
        setValue("title", response.result?.title)
    }, [response, setValue])

    return <Page title="ویرایش دسته بندی" loading={loading}>
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
                        ویرایش دسته بندی
                    </Button>
                </Grid>
            </Grid>
        </form>
    </Page>
}