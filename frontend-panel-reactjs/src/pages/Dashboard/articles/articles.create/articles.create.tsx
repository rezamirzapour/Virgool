import { useState } from "react";
import { useNavigate } from "react-router-dom";
import type { CreateArticleDto, PhotosResult } from "types";
import { Button } from "components/material";
import {
  TextField,
  Select as SelectField,
  RadioGroupField,
} from "components/material";
import { TextEditor, useTextEditor } from "components/TextEditor";
import { Page, ImageExplorer } from "components";
import { Grid, Stack, Avatar } from "@mui/material";
import {
  PhotoCamera as PhotoCameraIcon,
  CloudUpload as CloudUploadIcon,
} from "@mui/icons-material";
import { useCreateArticleMutation, useGetCategoriesQuery } from "hooks";
import { useForm } from "react-hook-form";
import { createArticleSchema } from "validations";
import { yupResolver } from "@hookform/resolvers/yup";

export default function ArticlesCreate() {
  const [open, setOpen] = useState(false);
  const [selectedImaeg, setSelectedImage] = useState<PhotosResult>(
    {} as PhotosResult
  );
  const { control, handleSubmit } = useForm<CreateArticleDto>({
    resolver: yupResolver(createArticleSchema),
  });
  const { data: categories } = useGetCategoriesQuery();
  const { mutate: createArticle, isLoading: isSubmitting } =
    useCreateArticleMutation();
  const { editorState, getHtmlContent, setEditorState } = useTextEditor();
  const navigate = useNavigate();

  const onSubmit = (data: CreateArticleDto) => {
    const requestBody: CreateArticleDto = {
      ...data,
      content: getHtmlContent(),
      thumbnailId: selectedImaeg.id ?? null,
    };
    createArticle(requestBody);
  };

  return (
    <Page title="ایجاد مقاله">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container>
          <Grid xs={12} lg={6}>
            <Stack spacing={3}>
              <TextField name="title" label="عنوان" control={control} />
              <TextEditor
                label="محتوا"
                editorState={editorState}
                setEditorState={setEditorState}
              />

              <Grid item lg={12}>
                <Button
                  variant="contained"
                  color="primary"
                  loading={isSubmitting}
                  type="submit"
                >
                  ثبت
                </Button>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => navigate("articles.list")}
                  sx={{ marginLeft: ".25em" }}
                >
                  انصراف
                </Button>
              </Grid>
            </Stack>
          </Grid>
          <Grid xs={12} lg={6} display={"flex"} justifyContent={"flex-end"}>
            <Stack width={"90%"} spacing={3}>
              <SelectField
                options={
                  categories?.map?.((c: any) => ({
                    label: c.title,
                    value: c.id,
                  })) ?? []
                }
                multiple
                name="categories"
                label="دسته بندی"
                control={control}
              />
              <RadioGroupField
                options={[
                  {
                    label: "منتشر شود",
                    value: "publsihed",
                  },
                  {
                    label: "بعنوان پیش‌نویس ذخیره شود",
                    value: "unpublished",
                  },
                ]}
                name="status"
                label="وضعیت انتشار"
                control={control}
              />
              <Stack alignItems={"center"} sx={{ width: "100%" }}>
                <Avatar
                  variant="rounded"
                  src={selectedImaeg.fullPath}
                  sx={{ width: "100%", height: "200px" }}
                >
                  <PhotoCameraIcon sx={{ width: "100px", height: "100px" }} />
                </Avatar>
                <Button
                  variant="contained"
                  sx={{ mt: 1, px: 3, py: 1, justifySelf: "center" }}
                  color="secondary"
                  onClick={() => setOpen(true)}
                >
                  آپلود تصویر
                  <CloudUploadIcon sx={{ ml: 1 }} />
                </Button>
              </Stack>
            </Stack>
          </Grid>
        </Grid>
      </form>
      <ImageExplorer
        open={open}
        setOpen={setOpen}
        onAcceptImage={setSelectedImage}
      />
    </Page>
  );
}
