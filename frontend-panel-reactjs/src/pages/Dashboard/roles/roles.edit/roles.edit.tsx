import { useState, useEffect, ChangeEvent } from 'react';
import { useParams } from 'react-router-dom';
import { useGetPermissionsQuery, useUpdateRoleMutation, useGetRoleQuery } from 'hooks';
import { Page } from 'components';
import { Grid } from '@material-ui/core';
import { TextField, Button, CheckBoxGroup } from 'components/material';
import { useForm } from 'react-hook-form';
import { UpdateRoleDto } from 'services/roles'
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

export default function RolesEdit() {
    const { id } = useParams<{ id: string | undefined }>();
    const { data: role, isLoading } = useGetRoleQuery(id ? +id : -1)
    const { data: permissions } = useGetPermissionsQuery({})
    const [updateRole, { isLoading: isSubmitting }] = useUpdateRoleMutation()
    const { control, setValue, handleSubmit } = useForm({ resolver: yupResolver(schema) })
    const [selectedPermissions, setSelectedPermissions] = useState<Array<number>>([])

    const onSubmit = (data: UpdateRoleDto) => {
        const requestBody = {
            ...data,
            permissions: selectedPermissions
        }
        id && updateRole({ id: +id, data: requestBody })
    }

    const onToggleBox = (ev: ChangeEvent<HTMLInputElement>) => {
        const { value } = ev.target;
        setSelectedPermissions(pre => pre.includes(+value)
            ? pre.filter(p => p !== +value)
            : [...pre, +value]
        )
    }


    useEffect(() => {
        setValue("title", role?.title ?? '')
        setValue("label", role?.label ?? '')
        setValue("permissions", role?.permissions?.map(p => p.id) ?? [])
        setSelectedPermissions(role?.permissions?.map(p => p.id) ?? [])
    }, [role])

    return <Page title="ویرایش نقش" loading={isLoading}>
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
                        options={permissions?.map?.((p: any) => ({ label: p.title, value: p.id })) ?? []}
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
                        ویرایش نقش
                    </Button>
                </Grid>
            </Grid>
        </form>
    </Page>
}