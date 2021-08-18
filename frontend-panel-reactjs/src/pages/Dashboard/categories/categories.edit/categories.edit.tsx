import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSubmitData, useFetchDetails } from 'hooks';
import { Page } from 'components';
import { Grid } from '@material-ui/core';
import { TextField, Button } from 'components/material';
import { useForm } from 'react-hook-form';
import { UpdateCategoryDto, CategoriesServices, CategoryResponse } from 'services/categories'

const defaultValues: UpdateCategoryDto = {
    title: "",
}

export default function CategoriesEdit() {
    const methods = useForm({ defaultValues })
    const { mutate, isSubmitting } = useSubmitData()
    const { id } = useParams<{ id?: string }>()
    const { fetchData, loading, response } = useFetchDetails<CategoryResponse>()

    const onSubmit = () => {
        if (id)
            return mutate(() => CategoriesServices.update(+id, methods.getValues()))
    }

    useEffect(() => {
        if (id)
            fetchData(() => CategoriesServices.findOne(+id))
    }, [])

    useEffect(() => {
        methods.setValue("title", response.result?.title)
    }, [response])

    return <Page title="ویرایش دسته بندی" loading={loading}>
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
                        ویرایش دسته بندی
                    </Button>
                </Grid>
            </Grid>
        </form>
    </Page>
}