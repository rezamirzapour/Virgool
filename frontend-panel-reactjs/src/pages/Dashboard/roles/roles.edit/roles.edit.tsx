import { useState, useEffect, ChangeEvent } from 'react';
import { useParams } from 'react-router-dom';
import { useEntity, useSubmitData, useFetchDetails } from 'hooks';
import { Page } from 'components';
import { Grid } from '@material-ui/core';
import { TextField, Button, CheckBoxGroup } from 'components/material';
import { useForm } from 'react-hook-form';
import { UpdateRoleDto, RolesServices, RoleResponse } from 'services/roles'
import { ValidationRule } from 'types';

const defaultValues: UpdateRoleDto = {
    title: "",
    label: "",
    permissions: []
}

const RULES: ValidationRule<UpdateRoleDto> = {
    title: {
        required: 'عنوان اجباری می‌باشد',
        maxLength: 128
    },
    label: {
        required: 'برچسب اجباری می‌باشد',
        maxLength: 128
    },
}

export default function RolesEdit() {
    const { id } = useParams<{ id: string | undefined }>();
    const methods = useForm({ defaultValues })
    const permissions = useEntity('permissions');
    const { mutate, isSubmitting } = useSubmitData()
    const { fetchData, loading, response } = useFetchDetails<RoleResponse>()
    const [selectedPermissions, setSelectedPermissions] = useState<Array<number>>([])

    const onSubmit = () => {
        const requestBody = {
            ...methods.getValues(),
            permissions: selectedPermissions
        }
        if (id)
            return mutate(() => RolesServices.update(+id, requestBody))
    }

    const onToggleBox = (ev: ChangeEvent<HTMLInputElement>) => {
        const { value } = ev.target;
        setSelectedPermissions(pre => pre.includes(+value)
            ? pre.filter(p => p !== +value)
            : [...pre, +value]
        )
    }

    useEffect(() => {
        if (id)
            fetchData(() => RolesServices.findOne(+id))
    }, [id])

    useEffect(() => {
        methods.setValue("title", response.result?.title ?? '')
        methods.setValue("label", response.result?.label ?? '')
        methods.setValue("permissions", response.result?.permissions?.map(p => p.id) ?? [])
        setSelectedPermissions(response.result?.permissions?.map(p => p.id) ?? [])
    }, [response])

    return <Page title="ویرایش نقش" loading={loading}>
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
                <Grid item xs={12}>
                    <TextField
                        name="label"
                        label="برچسب"
                        methods={methods}
                        rules={RULES.label}
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
                        ویرایش تقش
                    </Button>
                </Grid>
            </Grid>
        </form>
    </Page>
}