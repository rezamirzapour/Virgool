import { CircularProgress, Box } from "@mui/material";

export default function Loading() {
  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      height="100vh"
      width="100%"
    >
      <CircularProgress className="text-pink-600" />
    </Box>
  );
}
