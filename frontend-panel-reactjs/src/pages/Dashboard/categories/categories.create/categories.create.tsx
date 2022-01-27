import { useCreateCategoryMutation } from "hooks";
import { Page } from "components";
import { Stack } from "@mui/material";
import { TextField, Button } from "components/material";
import { useForm } from "react-hook-form";
import { createCategorySchema } from "validations";
import { yupResolver } from "@hookform/resolvers/yup";
import type { CreateCategoryDto } from "types";

export default function CategoriesCreate() {
  const { control, handleSubmit } = useForm({
    resolver: yupResolver(createCategorySchema),
  });
  const { mutate: onSubmit, isLoading: isSubmitting } =
    useCreateCategoryMutation();

  return (
    <Page title="ایجاد دسته بندی" container>
      <form
        onSubmit={handleSubmit((data: CreateCategoryDto) => onSubmit(data))}
      >
        <Stack spacing={3}>
          <TextField name="title" label="عنوان" control={control} />
          <Button
            color="primary"
            variant="contained"
            loading={isSubmitting}
            type="submit"
            sx={{ width: "fit-content" }}
          >
            ایجاد دسته بندی
          </Button>
        </Stack>
      </form>
    </Page>
  );
}
