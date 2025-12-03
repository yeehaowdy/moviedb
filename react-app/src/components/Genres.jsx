import React from 'react'
import { useQuery } from '@tanstack/react-query'
import { getGenres } from '../../utils'
import { Stack } from '@mui/material'
import { SingleChip } from './SingleChip'

export const Genres = ({ type, selectedGenres, setSelectedGenres }) => {

    const { data, isLoading, error } = useQuery({
        queryKey: ['genres', type],
        queryFn: getGenres
    });

    if (isLoading) return <p>Loading genres...</p>;
    if (error) return <p>Error loading genres</p>;

    return (
        <Stack direction='row' flexWrap='wrap' justifyContent='center'>
            {data.genres.map(obj =>
                <SingleChip
                  key={obj.id}
                  id={obj.id}
                  name={obj.name}
                  selectedGenres={selectedGenres}
                  setSelectedGenres={setSelectedGenres}
                />

            )}
        </Stack>
    );
};
