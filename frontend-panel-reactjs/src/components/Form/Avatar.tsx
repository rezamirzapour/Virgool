import React from "react";
import { Avatar } from "@mui/material";
import { CameraAltOutlined as CameraAltOutlinedIcon } from "@mui/icons-material";

interface AvatarProps {
  size?: number;
  src?: string;
  children?: React.ReactNode;
}
export default function CustomAvatar({
  children,
  size = 100,
  ...rest
}: AvatarProps) {
  return (
    <Avatar sx={{ width: size, height: size }} {...rest}>
      {children ? (
        <>{children}</>
      ) : (
        <CameraAltOutlinedIcon sx={{ width: size / 2, height: size / 2 }} />
      )}
    </Avatar>
  );
}
