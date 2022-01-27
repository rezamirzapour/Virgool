import { useState, ChangeEvent } from "react";
import { useGetPermissionsQuery, useCreateRoleMutation } from "hooks";
import { Page } from "components";
import { Grid } from "@mui/material";
import { TextField, Button, CheckBoxGroup } from "components/material";
import { useForm } from "react-hook-form";
import type { CreateRoleDto } from "types";
import { createRoleSchema } from "validations";
import { yupResolver } from "@hookform/resolvers/yup";

export default function RolesCreate() {
  const { control, handleSubmit } = useForm({
    resolver: yupResolver(createRoleSchema),
  });
  const { data: permissions } = useGetPermissionsQuery();
  const { mutate: createRole, isLoading: isSubmitting } =
    useCreateRoleMutation();
  const [selectedPermissions, setSelectedPermissions] = useState<Array<number>>(
    []
  );

  const onSubmit = (data: CreateRoleDto) => {
    const requestBody = {
      ...data,
      permissions: selectedPermissions,
    };
    return createRole(requestBody);
  };

  const onToggleBox = (ev: ChangeEvent<HTMLInputElement>) => {
    const { value } = ev.target;
    setSelectedPermissions((pre) =>
      pre.includes(+value) ? pre.filter((p) => p !== +value) : [...pre, +value]
    );
  };

  return (
    <Page title="ایجاد نقش">
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
              ایجاد تقش
            </Button>
          </Grid>
        </Grid>
      </form>
    </Page>
  );
}
