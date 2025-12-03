import React, { useState } from 'react'
import { PageLayout } from '../components/PageLayout'
import { Grid } from '@mui/material'

export const TVSeries = () => {
  const [page, setPage] = useState(1)
  const [selectedGenres, setSelectedGenres] = useState([])

  return (
    <PageLayout 
      title="TV Series"
      type="tv"
      page={page}
      setPage={setPage}
      selectedGenres={selectedGenres}
      setSelectedGenres={setSelectedGenres}
    >
      <Grid>{'...adatok'}</Grid>
    </PageLayout>
  )
}
