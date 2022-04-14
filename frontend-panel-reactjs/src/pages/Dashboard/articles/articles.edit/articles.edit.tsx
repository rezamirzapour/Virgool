import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import type { UpdateArticleDto, PhotosResult } from "types";
import { Grid, Stack, Avatar } from "@mui/material";
import {
  PhotoCamera as PhotoCameraIcon,
  CloudUpload as CloudUploadIcon,
} from "@mui/icons-material";
import {
  TextField,
  Select as SelectField,
  Button,
  RadioGroupField,
} from "components/material";
import { TextEditor, useTextEditor } from "components/TextEditor";
import { Page, ImageExplorer } from "components";
import {
  useGetArticleQuery,
  useUpdateArticleMutation,
  useGetCategoriesQuery,
} from "hooks";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { updateArticleSchema } from "validations";
import { yupResolver } from "@hookform/resolvers/yup";
import { LoadingButton } from "@mui/lab";

export default function ArticlesEdit() {
  const [open, setOpen] = useState(false);
  const [selectedImaeg, setSelectedImage] = useState<PhotosResult>(
    {} as PhotosResult
  );
  const { id } = useParams();
  const { data: categories } = useGetCategoriesQuery();
  const { data: article, isLoading: loadingArticle } = useGetArticleQuery(
    id ? +id : -1
  );
  const { isLoading: isSubmitting, mutate: updateArticle } =
    useUpdateArticleMutation(id ? +id : -1);

  const { control, handleSubmit, setValue } = useForm({
    resolver: yupResolver(updateArticleSchema),
  });

  const { editorState, getHtmlContent, setEditorState } = useTextEditor(
    article?.content ?? ""
  );
  const navigate = useNavigate();

  useEffect(() => {
    setValue("title", article?.title ?? "");
    setValue("categories", article?.categories?.map?.((c: any) => c.id) ?? []);
    setValue("status", article?.status ?? "");
    setSelectedImage(article?.thumbnail ?? ({} as PhotosResult));
  }, [article]);

  const onSubmit = (data: UpdateArticleDto) => {
    const requestBody: UpdateArticleDto = {
      ...data,
      content: getHtmlContent(),
      thumbnailId: selectedImaeg.id,
    };
    id && updateArticle(requestBody);
  };
  return (
    <Page loading={loadingArticle} title="ویرایش مقاله">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container>
          <Grid xs={12} lg={6}>
            <Stack spacing={3}>
              <TextField
                name="title"
                label="عنوان"
                defaultValue={article?.title ?? ""}
                control={control}
              />

              <TextEditor
                label="محتوا"
                editorState={editorState}
                setEditorState={setEditorState}
              />

              <Grid item lg={12}>
                <LoadingButton
                  variant="contained"
                  color="primary"
                  loading={isSubmitting}
                  type="submit"
                >
                  ثبت
                </LoadingButton>
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
                    value: "published",
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
        defaultSelected={selectedImaeg}
      />
    </Page>
  );
}
