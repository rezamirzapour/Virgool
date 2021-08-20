import { useSubmitData } from 'hooks';
import { Page } from 'components';
import { Grid } from '@material-ui/core';
import { TextField, Button } from 'components/material';
import { useForm } from 'react-hook-form';
import { CreateCategoryDto, CategoriesServices } from 'services/categories'
import { ValidationRule } from 'types';

const defaultValues: CreateCategoryDto = {
    title: "",
}

const RULES: ValidationRule<CreateCategoryDto> = {
    title: {
        required: 'عنوان اجباری می‌باشد',
        maxLength: 128
    },
}

export default function CategoriesCreate() {
    const methods = useForm({ defaultValues })
    const { mutate, isSubmitting } = useSubmitData()

    const onSubmit = () => {
        return mutate(() => CategoriesServices.create(methods.getValues()))
    }

    return <Page title="ایجاد دسته بندی">
        <form onSubmit={methods.handleSubmit(onSubmit)}>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <TextField
                        name="title"
                        label="عنوان"
                        methods={methods}
                        rules={RULES.title}
                    />
                </Grid>
                <Grid item>
                    <Button
                        color="primary"
                        variant="contained"
                        loading={isSubmitting}
                        type="submit"
                    >
                        ایجاد دسته بندی
                    </Button>
                </Grid>
            </Grid>
        </form>
    </Page>
}