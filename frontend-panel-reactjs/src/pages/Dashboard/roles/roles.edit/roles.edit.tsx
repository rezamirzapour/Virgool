import { useState, useEffect, ChangeEvent } from "react";
import { useParams } from "react-router-dom";
import {
  useGetPermissionsQuery,
  useUpdateRoleMutation,
  useGetRoleQuery,
} from "hooks";
import { Page } from "components";
import { Grid, Stack } from "@mui/material";
import { TextField, Button, CheckBoxGroup } from "components/material";
import { useForm } from "react-hook-form";
import type { UpdateRoleDto } from "types";
import { updateRoleSchema } from "validations";
import { yupResolver } from "@hookform/resolvers/yup";

export default function RolesEdit() {
  const { id } = useParams();
  const { data: role, isLoading } = useGetRoleQuery(id ? +id : -1);
  const { data: permissions } = useGetPermissionsQuery();
  const { mutate: updateRole, isLoading: isSubmitting } = useUpdateRoleMutation(
    id ? +id : -1
  );
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
    id && updateRole(requestBody);
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
    <Page title="ویرایش نقش" loading={isLoading} container>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={3}>
          <TextField name="title" label="عنوان" control={control} />
          <TextField name="label" label="برچسب" control={control} />
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
          <Button
            color="primary"
            variant="contained"
            loading={isSubmitting}
            type="submit"
            sx={{ width: "fit-content" }}
          >
            ویرایش نقش
          </Button>
        </Stack>
      </form>
    </Page>
  );
}
