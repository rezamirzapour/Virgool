import { useState, useEffect, ChangeEvent } from 'react';
import { useParams } from 'react-router-dom';
import { useEntity, useSubmitData, useFetchDetails } from 'hooks';
import { Page } from 'components';
import { Grid } from '@material-ui/core';
import { TextField, Button, CheckBoxGroup } from 'components/material';
import { useForm } from 'react-hook-form';
import { RolesServices, RoleResponse } from 'services/roles'
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
    const { control, setValue, getValues, handleSubmit } = useForm({ resolver: yupResolver(schema) })
    const permissions = useEntity('permissions');
    const { mutate, isSubmitting } = useSubmitData()
    const { fetchData, loading, response } = useFetchDetails<RoleResponse>()
    const [selectedPermissions, setSelectedPermissions] = useState<Array<number>>([])

    const onSubmit = () => {
        const requestBody = {
            ...getValues(),
            permissions: selectedPermissions
        }
        id && mutate(() => RolesServices.update(+id, requestBody))
    }

    const onToggleBox = (ev: ChangeEvent<HTMLInputElement>) => {
        const { value } = ev.target;
        setSelectedPermissions(pre => pre.includes(+value)
            ? pre.filter(p => p !== +value)
            : [...pre, +value]
        )
    }

    useEffect(() => {
        id && fetchData(() => RolesServices.findOne(+id))
    }, [id])

    useEffect(() => {
        setValue("title", response.result?.title ?? '')
        setValue("label", response.result?.label ?? '')
        setValue("permissions", response.result?.permissions?.map(p => p.id) ?? [])
        setSelectedPermissions(response.result?.permissions?.map(p => p.id) ?? [])
    }, [response])

    return <Page title="ویرایش نقش" loading={loading}>
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
                        ویرایش نقش
                    </Button>
                </Grid>
            </Grid>
        </form>
    </Page>
}