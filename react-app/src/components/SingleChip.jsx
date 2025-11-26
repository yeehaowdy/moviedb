import * as React from 'react';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import { useState } from 'react';
import { MdOutlineRadioButtonChecked, MdOutlineRadioButtonUnchecked } from "react-icons/md";

export const SingleChip = ({ id, name, selectedGenres, setSelectedGenres }) => {
    const isAlreadySelected = selectedGenres.includes(id);
    const [isSelected, setIsSelected] = useState(isAlreadySelected);

    const handleClick = () => {
        setIsSelected(!isSelected);

        if (!isSelected) {
            // hozzáadás
            setSelectedGenres(prev => [...prev, id]);
        } else {
            // eltávolítás
            setSelectedGenres(prev => prev.filter(item => item !== id));
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

