import React, { useState, useEffect } from 'react';
import { PageLayout } from '../components/PageLayout';
import { Grid, TextField, InputAdornment } from '@mui/material';
import { MyCard } from '../components/MyCard';
import { MySpinner } from '../components/MySpinner';
import { getData } from '../../utils';
import { FaSearch } from 'react-icons/fa';

export const SearchPage = () => {
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [data, setData] = useState(null);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    if (!query) {
      setData(null);
      return;
    }

    setLoading(true);

    getData({
      queryKey: ["search", "movie", page, selectedGenres, query]
    })
      .then(result => setData(result))
      .catch(err => {
        console.error("Search getData error:", err);
        setData(null);
      })
      .finally(() => setLoading(false));
  }, [query, page, selectedGenres]);

  return (
    <PageLayout
      title="Search Movies"
      type="movie"
      page={page}
      setPage={setPage}
      selectedGenres={selectedGenres}
      setSelectedGenres={setSelectedGenres}
    >
      {/* Keresőmező */}
      <TextField
        fullWidth
        variant="outlined"
        placeholder="Search Movies"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <FaSearch />
            </InputAdornment>
          ),
          sx: {
            color: "white",
            '& .MuiInputBase-input::placeholder': {
              color: "white",
              opacity: 0.7
            },
          },
        }}
        sx={{ mb: 3 }}
      />

      {isLoading && <MySpinner />}

      <Grid container spacing={2} justifyContent="center">
        {data && data.results?.length > 0
          ? data.results.map(movie => <MyCard key={movie.id} {...movie} />)
          : query && !isLoading && <p style={{ textAlign: "center" }}>Nincs találat</p>
        }
      </Grid>
    </PageLayout>
  );
};
