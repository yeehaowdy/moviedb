import React from 'react';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

export const ContentPagination = ({ page, setPage, count = 10 }) => {
  const handleChange = (event, value) => {
    setPage(value);
  };

  return (
    <Stack spacing={2} alignItems="center">
      <Pagination count={count} page={page} onChange={handleChange} color="primary" />
    </Stack>
  );
};
