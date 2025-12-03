import React from 'react';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { logAction } from '../utils/logAction';

export const ContentPagination = ({ page, setPage }) => {
  const handleChange = (event, value) => {
    setPage(value);
    logAction("page-change", value); // 🔥 Netlify log hívás
  };

  return (
    <Stack spacing={2}>
      <Pagination
        count={500}
        color="primary"
        page={page}
        onChange={handleChange}
      />
    </Stack>
  );
};
