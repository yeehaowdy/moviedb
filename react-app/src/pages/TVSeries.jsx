import React, { useState, useEffect } from 'react';
import { PageLayout } from '../components/PageLayout';
import { Grid } from '@mui/material';
import { getData } from '../../utils';
import { MyCard } from '../components/MyCard';
import { MySpinner } from '../components/MySpinner';
import he from 'he';

export const TVSeries = () => {
  const [page, setPage] = useState(1);
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [data, setData] = useState([]);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await getData({ queryKey: ['tv', 'discover/tv', page, selectedGenres] });
        if (!res.results) return;

        // Standardizálás: title, release_date, backdrop_path
        const standardized = res.results.map(item => {
          const title = he.decode(item.name || 'Unknown');
          const release_date = item.first_air_date || 'Unknown';
          const backdrop_path = item.backdrop_path || item.poster_path || '';
          return { ...item, title, release_date, backdrop_path };
        });

        // ABC sorrend
        standardized.sort((a, b) => (a.title || '').localeCompare(b.title || ''));

        setData(standardized);
      } catch (err) {
        console.error('TVSeries fetch error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
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
        {data.map(tv => (
          <MyCard key={tv.id} {...tv} />
        ))}
      </Grid>
    </PageLayout>
  );
};
