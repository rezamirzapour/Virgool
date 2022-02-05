import { useState, useEffect, useRef, forwardRef } from "react";
import type {
  FC,
  Dispatch,
  SetStateAction,
  ChangeEvent,
  Ref,
  ReactElement,
} from "react";
import {
  Button,
  Dialog,
  AppBar,
  Toolbar,
  IconButton,
  Slide,
  Grid,
  Avatar,
  Box,
  Stack,
  Typography,
} from "@mui/material";
import {
  Close as CloseIcon,
  CloudUpload as CloudUploadIcon,
} from "@mui/icons-material";
import type { TransitionProps } from "@mui/material/transitions";
import { Skeleton } from "@mui/lab";
import { useGetPhotosQuery, useUploadPhotoMutation } from "hooks";
import type { PhotosResult } from "types";
import { LinearWithValueLabel } from "./items";

const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: ReactElement;
  },
  ref: Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

interface IProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  onAcceptImage: (photo: PhotosResult) => void;
  defaultSelected?: PhotosResult;
}

const FileExplorer: FC<IProps> = ({
  open,
  setOpen,
  onAcceptImage,
  defaultSelected,
}) => {
  useEffect(() => {
    if (!!defaultSelected?.id) setSelectedImage(defaultSelected);
  }, [defaultSelected, open]);
  const [progress, setProgress] = useState(0);
  const {
    mutate,
    // data: uploadedPhoto,
    isLoading: isUploading,
  } = useUploadPhotoMutation(setProgress);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleClose = () => {
    setOpen(false);
  };

  const handleFileChange = (ev: ChangeEvent<HTMLInputElement>) => {
    const file = ev.target.files?.[0];
    const reader = new FileReader();
    reader.onload = function (event) {
      console.log(event.target?.result);
    };
    if (file) {
      reader.readAsDataURL(file);
      const formData = new FormData();
      formData.append("file", file);
      mutate(formData);
    }
  };

  const [selectedImage, setSelectedImage] = useState<PhotosResult>(
    {} as PhotosResult
  );
  const { data, isLoading } = useGetPhotosQuery();
  const handleOkImage = () => {
    onAcceptImage(selectedImage);
    setOpen(false);
  };

  const showSkeleton = () =>
    [...Array(8)].map(() => (
      <Grid lg={3} sx={{ p: 1 }}>
        <Skeleton
          width={"100%"}
          height={"200px"}
          sx={{ transform: "scale(1, 1)" }}
        />
      </Grid>
    ));
  const showData = () =>
    data?.map((item) => (
      <Grid lg={3}>
        <Button
          sx={{ position: "relative" }}
          fullWidth
          onClick={() => setSelectedImage(item)}
        >
          <Avatar
            sx={{
              width: "100%",
              height: "150px",
              ":hover": { opacity: "0.6" },
              filter:
                selectedImage.id === item.id ? "brightness(0.3)" : "unset",
              border:
                selectedImage.id === item.id ? "1px dashed white" : "unset",
            }}
            variant="rounded"
            src={item.fullPath}
          />
          {selectedImage.id === item.id && (
            <Typography
              sx={{
                color: "white",
                position: "absolute",
                top: "75px",
                left: "35%",
              }}
            >
              انتخاب شده
            </Typography>
          )}
        </Button>
      </Grid>
    ));

  return (
    <Dialog
      fullScreen
      open={open}
      onClose={handleClose}
      TransitionComponent={Transition}
    >
      <AppBar sx={{ position: "relative" }}>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            onClick={handleClose}
            aria-label="close"
          >
            <CloseIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Box>
        <Grid container>
          <Grid lg={9} sx={{ maxHeight: "500px", overflowY: "auto" }} container>
            {isLoading ? showSkeleton() : showData()}
            {/* {showData()} */}
          </Grid>
          <Grid sx={{ p: 1 }} lg={3}>
            <Stack>
              <Avatar
                sx={{ width: "100%", height: "200px" }}
                variant="rounded"
                src={selectedImage.fullPath}
              />
              <Button
                variant="contained"
                color="primary"
                disabled={!selectedImage.id}
                onClick={handleOkImage}
                sx={{ mt: 1 }}
              >
                تایید
              </Button>
            </Stack>
          </Grid>
          <Grid lg={9}>
            <Stack mt={1}>
              {isUploading ? (
                <LinearWithValueLabel progress={progress} />
              ) : (
                <Button
                  sx={{
                    px: 3,
                    py: 2,
                    border: "1px dashed",
                  }}
                  color="secondary"
                  onClick={() => inputRef.current?.click()}
                >
                  آپلود تصویر جدید
                  <CloudUploadIcon sx={{ ml: 1 }} />
                </Button>
              )}

              <input
                type="file"
                ref={inputRef}
                onChange={handleFileChange}
                hidden
              />
            </Stack>
          </Grid>
        </Grid>
      </Box>
    </Dialog>
  );
};

export default FileExplorer;
