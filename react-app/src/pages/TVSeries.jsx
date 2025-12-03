import React, { useState, useEffect } from 'react';
import { PageLayout } from '../components/PageLayout';
import { Grid } from '@mui/material';
import { getData } from '../../utils';
import { MyCard } from '../components/MyCard';
import { MySpinner } from '../components/MySpinner';

export const TVSeries = () => {
  const [page, setPage] = useState(1);
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [data, setData] = useState(null);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getData({
      queryKey: ["tv", "tv", page, selectedGenres]
    })
      .then(result => setData(result))
      .catch(err => {
        console.error("getData error:", err);
        setData(null);
      })
      .finally(() => setLoading(false));
  }, [page, selectedGenres]);

  return (
    <PageLayout
      title="TV Series"
      type="tv"
      page={page}
      setPage={setPage}
      selectedGenres={selectedGenres}
      setSelectedGenres={setSelectedGenres}
    >
      {isLoading && <MySpinner />}
      <Grid container spacing={2} justifyContent="center">
        {data && data.results?.length > 0
          ? data.results.map(tv => <MyCard key={tv.id} {...tv} />)
          : !isLoading && <p style={{ textAlign: "center" }}>Nincs megjeleníthető tartalom</p>
        }
      </Grid>
    </PageLayout>
  );
};
