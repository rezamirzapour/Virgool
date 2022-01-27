import { useCreatePermissionMutation } from "hooks";
import { Page } from "components";
import { Grid } from "@mui/material";
import { TextField, Button } from "components/material";
import { useForm } from "react-hook-form";
import { createPermissoinSchema } from "validations";
import { yupResolver } from "@hookform/resolvers/yup";

export default function PermissionsCreate() {
  const { handleSubmit, control } = useForm({
    resolver: yupResolver(createPermissoinSchema),
  });
  const [onSubmit, { isLoading: isSubmitting }] = useCreatePermissionMutation();

  return (
    <Page title="ایجاد دسترسی">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField name="title" label="عنوان" control={control} />
          </Grid>
          <Grid item>
            <Button
              color="primary"
              variant="contained"
              loading={isSubmitting}
              type="submit"
            >
              ایجاد دسترسی
            </Button>
          </Grid>
        </Grid>
      </form>
    </Page>
  );
}
