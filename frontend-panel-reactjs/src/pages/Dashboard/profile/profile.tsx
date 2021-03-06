import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import type { UpdateProfileDto, PhotosResult } from "types";
import { Grid, Stack, Avatar } from "@mui/material";
import {
  Person as PersonIcon,
  CloudUpload as CloudUploadIcon,
} from "@mui/icons-material";
import { TextField, Button } from "components/material";
import { Page, ImageExplorer } from "components";
import { useGetProfileQuery, useUpdateProfileMutation } from "hooks";
import { useForm } from "react-hook-form";
import { updateProfileSchema } from "validations";
import { yupResolver } from "@hookform/resolvers/yup";
import { LoadingButton } from "@mui/lab";

export default function Profile() {
  const [open, setOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<PhotosResult>(
    {} as PhotosResult
  );
  const { isLoading: isSubmitting, mutate: updateProfile } =
    useUpdateProfileMutation();
  const { data: profile, isLoading } = useGetProfileQuery();
  const { control, handleSubmit, reset } = useForm<UpdateProfileDto>({
    resolver: yupResolver(updateProfileSchema),
  });
  const navigate = useNavigate();

  const onSubmit = (data: UpdateProfileDto) => {
    const requestBody: UpdateProfileDto = {
      ...data,
      avatarId: selectedImage.id,
    };
    updateProfile(requestBody);
  };

  useEffect(() => {
    if (profile) {
      reset({ ...profile });
      setSelectedImage(profile.avatar || ({} as PhotosResult));
    }
  }, [profile, reset]);

  return (
    <Page loading={isLoading} title="ویرایش پروفایل">
      <form style={{ width: "100%" }} onSubmit={handleSubmit(onSubmit)}>
        <Grid container>
          <Grid pr={2} lg={6}>
            <TextField
              name="firstName"
              label="نام"
              defaultValue={profile?.firstName ?? ""}
              control={control}
            />
          </Grid>
          <Grid pl={2} lg={6}>
            <TextField
              name="lastName"
              label="نام خانوادگی"
              defaultValue={profile?.lastName ?? ""}
              control={control}
            />
          </Grid>
          <Grid pt={2} pr={2} lg={6}>
            <TextField
              name="email"
              label="ایمیل"
              defaultValue={profile?.email ?? ""}
              control={control}
            />
          </Grid>
          <Grid pt={2} pl={2} lg={6}>
            <TextField
              name="description"
              label="توضیحات"
              defaultValue={profile?.description ?? ""}
              control={control}
              rows={4}
            />
          </Grid>
          <Grid pt={2} pr={2} lg={6}>
            <Stack alignItems={"center"} sx={{ width: "100%" }}>
              <Avatar
                variant="circular"
                src={selectedImage.fullPath}
                sx={{ width: "200px", height: "200px" }}
              >
                <PersonIcon sx={{ width: "100px", height: "100px" }} />
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
          </Grid>
          <Grid mt={2} item lg={12}>
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
              sx={{ ml: ".25em" }}
            >
              انصراف
            </Button>
          </Grid>
        </Grid>
      </form>
      <ImageExplorer
        open={open}
        setOpen={setOpen}
        onAcceptImage={setSelectedImage}
        defaultSelected={selectedImage}
      />
    </Page>
  );
}
