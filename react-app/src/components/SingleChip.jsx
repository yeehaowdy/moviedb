import * as React from 'react';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import { MdOutlineRadioButtonChecked, MdOutlineRadioButtonUnchecked } from "react-icons/md";

export const SingleChip = ({ id, name, selectedGenres = [], setSelectedGenres }) => {

    const isSelected = selectedGenres.includes(id);

    const handleClick = () => {
        if (isSelected) {
            // eltávolítás
            setSelectedGenres(prev => prev.filter(g => g !== id));
        } else {
            // hozzáadás
            setSelectedGenres(prev => [...prev, id]);
        }
    };

    return (
        <Stack direction="row" spacing={1} sx={{ padding: '5px' }}>
            <Chip
                label={name}
                onClick={handleClick}
                icon={
                    isSelected
                        ? <MdOutlineRadioButtonChecked size={20} />
                        : <MdOutlineRadioButtonUnchecked size={20} />
                }
                variant={isSelected ? "filled" : "outlined"}
                color={isSelected ? "primary" : "default"}
                sx={{
                    cursor: "pointer",
                    fontSize: "14px",
                }}
            />
        </Stack>
    );
};
