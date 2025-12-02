// PageLayout.jsx
import { Box, Container, Typography } from "@mui/material";
import React from "react";
import { ContentPagination } from "./ContentPagination";
import { Genres } from "./Genres";

export const PageLayout = ({ title, page, setPage, type = "movie", selectedGenres, setSelectedGenres, children }) => {
  return (
    <Container
      maxWidth={false}
      sx={{
        background: "linear-gradient(to right, #082f49, #075985)",
        color: "white",
        minHeight: "100vh",
        paddingBottom: "80px", // hely a bottom nav-nek
      }}
    >
      <Typography
        variant="h4"
        sx={{
          textTransform: "uppercase",
          fontWeight: "bold",
          letterSpacing: 2,
          textAlign: "center",
          background: "linear-gradient(to right, #e24dc9ff, #d6f36cff)",
          p: "1rem",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}
      >
        {title}
      </Typography>

      {/* Műfajok */}
      <Box sx={{ mt: 2 }}>
        <Genres type={type} selectedGenres={selectedGenres} setSelectedGenres={setSelectedGenres} />
      </Box>

      {/* Gyermek tartalom (pl. film grid) */}
      <Box sx={{ mt: 2 }}>{children}</Box>

      {/* Oldallapozó */}
      <Box display="flex" justifyContent="center" sx={{ paddingBottom: "60px", mt: 4 }}>
        <ContentPagination page={page} setPage={setPage} />
      </Box>
    </Container>
  );
};
