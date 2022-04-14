import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useGetCategoryQuery, useUpdateCategoryMutation } from "hooks";
import { Page } from "components";
import { Stack } from "@mui/material";
import { TextField, Button } from "components/material";
import { useForm } from "react-hook-form";
import type { UpdateCategoryDto } from "types";
import { updateCategorySchema } from "validations";
import { yupResolver } from "@hookform/resolvers/yup";

export default function CategoriesEdit() {
  const { id } = useParams();
  const { control, handleSubmit, reset } = useForm<UpdateCategoryDto>({
    resolver: yupResolver(updateCategorySchema),
  });
  const { data: category, isLoading } = useGetCategoryQuery(+id!);
  const { mutate: updateCategory, isLoading: isSubmitting } =
    useUpdateCategoryMutation(+id!);

  const onSubmit = (data: UpdateCategoryDto) => {
    updateCategory(data);
  };

  useEffect(() => {
    category && reset({ ...category });
  }, [category, reset]);

  return (
    <Page title="ویرایش دسته بندی" loading={isLoading} container>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={3}>
          <TextField name="title" label="عنوان" control={control} />
          <Button
            color="primary"
            variant="contained"
            loading={isSubmitting}
            type="submit"
            sx={{ width: "fit-content" }}
          >
            ویرایش دسته بندی
          </Button>
        </Stack>
      </form>
    </Page>
  );
}
