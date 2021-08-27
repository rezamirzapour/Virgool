import { useState, ChangeEvent } from 'react';
import { useEntity, useSubmitData } from 'hooks';
import { Page } from 'components';
import { Grid } from '@material-ui/core';
import { TextField, Button, CheckBoxGroup } from 'components/material';
import { useForm } from 'react-hook-form';
import { RolesServices } from 'services/roles'
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup'

const schema = yup.object().shape({
    title: yup.string()
        .required("عنوان اجباری می‌باشد")
        .max(128, "طول عنوان حداکثر ۱۲۸ کاراکتر می‌باشد"),
    label: yup.string()
        .required("برچسب اجباری می‌باشد")
        .max(128, "طول برچسب حداکثر ۱۲۸ کاراکتر می‌باشد"),
    permissions: yup.array().of(yup.number())
})

export default function RolesCreate() {
    const { control, handleSubmit, getValues } = useForm({ resolver: yupResolver(schema) })
    const permissions = useEntity('permissions');
    const { mutate, isSubmitting } = useSubmitData()
    const [selectedPermissions, setSelectedPermissions] = useState<Array<number>>([])

    const onSubmit = () => {
        const requestBody = {
            ...getValues(),
            permissions: selectedPermissions
        }
        return mutate(() => RolesServices.create(requestBody))
    }

    const onToggleBox = (ev: ChangeEvent<HTMLInputElement>) => {
        const { value } = ev.target;
        setSelectedPermissions(pre => pre.includes(+value)
            ? pre.filter(p => p !== +value)
            : [...pre, +value]
        )
    }

    return <Page title="ایجاد نقش">
        <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <TextField
                        name="title"
                        label="عنوان"
                        control={control}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        name="label"
                        label="برچسب"
                        control={control}
                    />
                </Grid>
                <Grid item xs={12}>
                    <CheckBoxGroup
                        label="دسترسی ها"
                        options={permissions.map((p: any) => ({ label: p.title, value: p.id }))}
                        onToggleBox={onToggleBox}
                        checkedValues={selectedPermissions}
                    />
                </Grid>
                <Grid item>
                    <Button
                        color="primary"
                        variant="contained"
                        loading={isSubmitting}
                        type="submit"
                    >
                        ایجاد تقش
                    </Button>
                </Grid>
            </Grid>
        </form>
    </Page>
}