import * as React from 'react';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import { MdOutlineRadioButtonChecked, MdOutlineRadioButtonUnchecked } from "react-icons/md";

export const SingleChip = ({ id, name, selectedGenres = [], setSelectedGenres }) => {

    const isSelected = selectedGenres.includes(id);

    const handleClick = () => {
        if (isSelected) {
            setSelectedGenres(prev => prev.filter(g => g !== id));
        } else {
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
                  variant="filled"
                  color="primary"
                  sx={{
                    cursor: "pointer",
                    fontSize: "14px",
                    color: "white",          
                    background: isSelected 
                      ? "#0284c7"            
                      : "#334155",           
                    border: "1px solid #475569",
                    "&:hover": {
                      background: isSelected ? "#0369a1" : "#475569",
                    }
                  }}
            />

        </Stack>
    );
};
