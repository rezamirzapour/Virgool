import { useState, useEffect, ChangeEvent } from "react";
import { useParams } from "react-router-dom";
import {
  useGetPermissionsQuery,
  useUpdateRoleMutation,
  useGetRoleQuery,
} from "hooks";
import { Page } from "components";
import { Grid } from "@material-ui/core";
import { TextField, Button, CheckBoxGroup } from "components/material";
import { useForm } from "react-hook-form";
import type { UpdateRoleDto } from "types";
import { updateRoleSchema } from "validations";
import { yupResolver } from "@hookform/resolvers/yup";

export default function RolesEdit() {
  const { id } = useParams();
  const { data: role, isLoading } = useGetRoleQuery(id ? +id : -1);
  const { data: permissions } = useGetPermissionsQuery({});
  const [updateRole, { isLoading: isSubmitting }] = useUpdateRoleMutation();
  const { control, setValue, handleSubmit } = useForm({
    resolver: yupResolver(updateRoleSchema),
  });
  const [selectedPermissions, setSelectedPermissions] = useState<Array<number>>(
    []
  );

  const onSubmit = (data: UpdateRoleDto) => {
    const requestBody = {
      ...data,
      permissions: selectedPermissions,
    };
    id && updateRole({ id: +id, data: requestBody });
  };

  const onToggleBox = (ev: ChangeEvent<HTMLInputElement>) => {
    const { value } = ev.target;
    setSelectedPermissions((pre) =>
      pre.includes(+value) ? pre.filter((p) => p !== +value) : [...pre, +value]
    );
  };

  useEffect(() => {
    setValue("title", role?.title ?? "");
    setValue("label", role?.label ?? "");
    setValue("permissions", role?.permissions?.map((p: any) => p.id) ?? []);
    setSelectedPermissions(role?.permissions?.map((p: any) => p.id) ?? []);
  }, [role]);

  return (
    <Page title="ویرایش نقش" loading={isLoading}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField name="title" label="عنوان" control={control} />
          </Grid>
          <Grid item xs={12}>
            <TextField name="label" label="برچسب" control={control} />
          </Grid>
          <Grid item xs={12}>
            <CheckBoxGroup
              label="دسترسی ها"
              options={
                permissions?.map?.((p: any) => ({
                  label: p.title,
                  value: p.id,
                })) ?? []
              }
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
  );
}
