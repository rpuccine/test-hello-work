import {Pagination, Stack, Typography} from "@mui/material";

export default function MyPagination({currentPage, setCurrentPage, jobCount, clickHandler}) {
  const pageCount = Math.ceil(jobCount / 5);

  const handleChange = (event, value) => {
    setCurrentPage(value);
    clickHandler({page: value});
  };

  return (
    <Stack spacing={2} sx={{paddingY: 2}}>
      <Pagination count={pageCount} page={currentPage} onChange={handleChange} sx={{marginX: "auto"}} />
    </Stack>
  );
}