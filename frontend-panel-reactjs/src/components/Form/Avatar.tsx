import React from 'react'
import { Avatar } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { CameraAltOutlined as CameraAltOutlinedIcon } from "@material-ui/icons";

interface AvatarProps {
  size?: number,
  src?: string,
  children?: React.ReactNode
}
export default function CustomAvatar({ children, size = 100, ...rest }: AvatarProps) {
  return (
    <Avatar style={{ width: size, height: size }} {...rest}>
      {children ? (
        <>{children}</>
      ) : (
          <CameraAltOutlinedIcon style={{ width: size / 2, height: size / 2 }} />
        )}
    </Avatar>
  );
}

const useStyle = makeStyles(() => ({
  avatar: {
    height: 100,
    width: 100,
  },
}));