import {Box, CircularProgress} from "@mui/material";

export default function MyLoader() {
  return (
    <Box sx={{ display: 'flex' }}>
      <CircularProgress />
    </Box>
  );
}