import { useCreatePermissionMutation } from 'hooks';
import { Page } from 'components';
import { Grid } from '@material-ui/core';
import { TextField, Button } from 'components/material';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup'

const schema = yup.object().shape({
    title: yup.string()
        .required("عنوان اجباری می‌باشد")
        .max(128, "طول عنوان حداکثر ۱۲۸ کاراکتر می‌باشد")
})


export default function PermissionsCreate() {
    const { handleSubmit, control } = useForm({ resolver: yupResolver(schema) })
    const [onSubmit, { isLoading: isSubmitting }] = useCreatePermissionMutation()

    return <Page title="ایجاد دسترسی">
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
                        ایجاد دسترسی
                    </Button>
                </Grid>
            </Grid>
        </form>
    </Page>
}