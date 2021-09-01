import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useGetCategoryQuery, useUpdateCategoryMutation } from 'hooks';
import { Page } from 'components';
import { Grid } from '@material-ui/core';
import { TextField, Button } from 'components/material';
import { useForm } from 'react-hook-form';
import { UpdateCategoryDto } from 'services/categories'
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup'

const schema = yup.object().shape({
    title: yup.string()
        .required("عنوان اجباری می‌باشد")
        .max(128, "طول عنوان حداکثر ۱۲۸ کاراکتر می‌باشد")
})

export default function CategoriesEdit() {
    const { id } = useParams<{ id?: string }>()
    const { control, handleSubmit, setValue } = useForm({ resolver: yupResolver(schema) })
    const { data: category, isLoading } = useGetCategoryQuery(id ? +id : -1)
    const [updateCategory, { isLoading: isSubmitting }] = useUpdateCategoryMutation()

    const onSubmit = (data: UpdateCategoryDto) => {
        id && updateCategory({ id: +id, data })
    }

    useEffect(() => {
        category && setValue("title", category.title)
    }, [category, setValue])

    return <Page title="ویرایش دسته بندی" loading={isLoading}>
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