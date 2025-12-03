import React, { useState, useEffect } from "react";
import { PageLayout } from "../components/PageLayout";
import { Grid } from "@mui/material";
import { MyCard } from "../components/MyCard";
import { MySpinner } from "../components/MySpinner";

const BACKEND = import.meta.env.VITE_BACKEND_URL || "http://localhost:3333";

export const SearchPage = () => {
  const [page, setPage] = useState(1);
  const [data, setData] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const fetchMovies = async (query = "") => {
    setLoading(true);
    try {
      const url = query
        ? `${BACKEND}/search?query=${encodeURIComponent(query)}&page=${page}`
        : `${BACKEND}/movies?type=movie&page=${page}&genres=`;
      const resp = await fetch(url);
      const json = await resp.json();

      if (json.results) {
        json.results.sort((a, b) => {
          const titleA = (a.title || a.name || "").toLowerCase();
          const titleB = (b.title || b.name || "").toLowerCase();
          return titleA.localeCompare(titleB);
        });
      }

      setData(json);
    } catch (err) {
      console.error("Fetch error:", err);
      setData({ results: [] });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, [page]);


  useEffect(() => {
    fetchMovies(searchQuery);
  }, [searchQuery, page]);

  return (
    <PageLayout
      title="Search Movies"
      page={page}
      setPage={setPage}
    >
      <input
        type="text"
        placeholder="Search Movies"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        style={{
          width: "100%",
          padding: "0.5rem",
          marginBottom: "1rem",
          borderRadius: "4px",
          border: "1px solid #ccc",
          fontSize: "16px",
        }}
      />

      {isLoading && <MySpinner />}

      <Grid container spacing={2} justifyContent="center">
        {data?.results?.map((item) => (
          <MyCard key={item.id} {...item} />
        ))}
      </Grid>
    </PageLayout>
  );
};
