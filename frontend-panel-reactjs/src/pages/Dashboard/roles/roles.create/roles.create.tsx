import { useState, ChangeEvent } from 'react';
import { useEntity, useSubmitData } from 'hooks';
import { Page } from 'components';
import { Grid } from '@material-ui/core';
import { TextField, Button, CheckBoxGroup } from 'components/material';
import { useForm } from 'react-hook-form';
import { CreateRoleDto, RolesServices } from 'services/roles'

const defaultValues: CreateRoleDto = {
    title: "",
    label: "",
    permissions: []
}

export default function RolesCreate() {
    const methods = useForm({ defaultValues })
    const permissions = useEntity('permissions');
    const { mutate, isSubmitting } = useSubmitData()
    const [selectedPermissions, setSelectedPermissions] = useState<Array<number>>([])

    const onSubmit = () => {
        const requestBody = {
            ...methods.getValues(),
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
        <form onSubmit={methods.handleSubmit(onSubmit)}>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <TextField name="title" label="عنوان" methods={methods} />
                </Grid>
                <Grid item xs={12}>
                    <TextField name="label" label="برچسب" methods={methods} />
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