import React, { useState, useEffect } from "react";
import { PageLayout } from "../components/PageLayout";
import { Grid } from "@mui/material";
import { searchData } from "../../utils";
import { MyCard } from "../components/MyCard";
import { MySpinner } from "../components/MySpinner";
import he from "he";

export const SearchPage = () => {
  const [page, setPage] = useState(1);
  const [data, setData] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [query, setQuery] = useState("");

  useEffect(() => {
    const fetchSearch = async () => {
      setLoading(true);
      try {
        const res = await searchData(query, page);
        if (!res.results) return;

        const standardized = res.results
          .filter(item => item.media_type === "movie" || item.media_type === "tv")
          .map(item => {
            const title = he.decode(item.title || item.name || "Unknown");
            const release_date = item.release_date || item.first_air_date || "Unknown";
            const backdrop_path = item.backdrop_path || item.poster_path || "";
            return { ...item, title, release_date, backdrop_path };
          })
          .sort((a, b) => (a.title || "").localeCompare(b.title || ""));

        setData(standardized);
      } catch (err) {
        console.error("Search fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchSearch();
  }, [query, page]);

  const filteredData = query
    ? data.filter(item => (item.title || "").toLowerCase().includes(query.toLowerCase()))
    : data;

  return (
    <PageLayout title="Search Movies" page={page} setPage={setPage} showGenres={false}>
      <input
        type="text"
        placeholder="Search Movies"
        value={query}
        onChange={e => setQuery(e.target.value)}
        style={{ width: "100%", padding: "0.5rem 1rem", marginBottom: "1rem", fontSize: "16px" }}
      />
      {isLoading && <MySpinner />}
      <Grid container spacing={2} justifyContent="center">
        {filteredData.map(item => (
          <MyCard key={item.id} {...item} />
        ))}
      </Grid>
    </PageLayout>
  );
};
