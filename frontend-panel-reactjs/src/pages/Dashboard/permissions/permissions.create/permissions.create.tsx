import { useSubmitData } from 'hooks';
import { Page } from 'components';
import { Grid } from '@material-ui/core';
import { TextField, Button } from 'components/material';
import { useForm } from 'react-hook-form';
import { CreatePermissionDto, PermissionsServices } from 'services'

const defaultValues: CreatePermissionDto = {
    title: "",
}

export default function PermissionsCreate() {
    const methods = useForm({ defaultValues })
    const { mutate, isSubmitting } = useSubmitData()

    const onSubmit = (data: CreatePermissionDto) => {
        return mutate(() => PermissionsServices.create(data))
    }

    return <Page title="ایجاد دسترسی">
        <form onSubmit={methods.handleSubmit(onSubmit)}>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <TextField name="title" label="عنوان" methods={methods} />
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