import { yupResolver } from "@hookform/resolvers/yup";
import { Stack } from "@mui/material";
import { Page } from "components";
import { Button, CheckBoxGroup, TextField } from "components/material";
import {
  useGetPermissionsQuery,
  useGetRoleQuery,
  useUpdateRoleMutation,
} from "hooks";
import { ChangeEvent, useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { updateRoleSchema } from "validations";
import type { UpdateRoleDto } from "types";

export default function RolesEdit() {
  const { id } = useParams();
  const { data: role, isLoading } = useGetRoleQuery(+id!);
  const { data: permissions } = useGetPermissionsQuery();
  const { mutate: updateRole, isLoading: isSubmitting } = useUpdateRoleMutation(
    +id!
  );
  const { control, handleSubmit, reset } = useForm<UpdateRoleDto>({
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
    updateRole(requestBody);
  };

  const onToggleBox = (ev: ChangeEvent<HTMLInputElement>) => {
    const { value } = ev.target;
    setSelectedPermissions((pre) =>
      pre.includes(+value) ? pre.filter((p) => p !== +value) : [...pre, +value]
    );
  };

  useEffect(() => {
    if (role) {
      const permissions = role?.permissions?.map((p: any) => p.id) || [];
      reset({ ...role, permissions });
      setSelectedPermissions(role?.permissions?.map((p: any) => p.id) || []);
    }
  }, [role, reset]);

  const permissionsOptions = useMemo(
    () =>
      permissions?.map?.((p: any) => ({
        label: p.title,
        value: p.id,
      })) || [],
    [permissions]
  );

  return (
    <Page title="ویرایش نقش" loading={isLoading} container>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={3}>
          <TextField name="title" label="عنوان" control={control} />
          <TextField name="label" label="برچسب" control={control} />
          <CheckBoxGroup
            label="دسترسی ها"
            options={permissionsOptions}
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
