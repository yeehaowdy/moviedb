import React, { useEffect, useState } from 'react'
import { getGenres } from '../../utils.js'
import { Stack } from '@mui/material'
import { SingleChip } from './SingleChip'

export const Genres = ({ type, selectedGenres, setSelectedGenres }) => {
    const [data, setData] = useState(null)

    useEffect(() => {
        getGenres(type).then(result => {
            setData(result)    
        })
    }, [type])

    return (
        <Stack direction='row' flexWrap='wrap' justifyContent='center'>
            {data &&
                data.genres.map(genreObj => (
                    <SingleChip
                        key={genreObj.id}
                        id={genreObj.id}
                        name={genreObj.name}
                        selectedGenres={selectedGenres}
                        setSelectedGenres={setSelectedGenres}
                    />
                ))
            }
        </Stack>
    )
}
