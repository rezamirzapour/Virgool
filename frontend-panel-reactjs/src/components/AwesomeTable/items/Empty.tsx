import { Box, Typography } from "@mui/material";

export function Empty() {
  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      height="500px"
    >
      <Box display="flex" flexDirection="column" alignItems="center">
        {/* <img src={NoDataImage} width="200px" height="200px" /> */}
        <Typography sx={{ marginTop: "1em" }}>
          داده ای برای نمایش وجود ندارد.
        </Typography>
      </Box>
    </Box>
  );
}
