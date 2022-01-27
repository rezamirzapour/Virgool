import { useCreatePermissionMutation } from "hooks";
import { Page } from "components";
import { Stack } from "@mui/material";
import { TextField, Button } from "components/material";
import { useForm } from "react-hook-form";
import { createPermissoinSchema } from "validations";
import { yupResolver } from "@hookform/resolvers/yup";
import type { CreateArticleDto } from "types";

export default function PermissionsCreate() {
  const { handleSubmit, control } = useForm({
    resolver: yupResolver(createPermissoinSchema),
  });
  const { mutate: onSubmit, isLoading: isSubmitting } =
    useCreatePermissionMutation();

  return (
    <Page title="ایجاد دسترسی" container>
      <form onSubmit={handleSubmit((data: CreateArticleDto) => onSubmit(data))}>
        <Stack spacing={3}>
          <TextField name="title" label="عنوان" control={control} />
          <Button
            color="primary"
            variant="contained"
            loading={isSubmitting}
            type="submit"
            sx={{ width: "fit-content" }}
          >
            ایجاد دسترسی
          </Button>
        </Stack>
      </form>
    </Page>
  );
}
