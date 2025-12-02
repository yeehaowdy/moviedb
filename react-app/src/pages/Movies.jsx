// Movies.jsx
import React, { useEffect, useState } from "react";
import { PageLayout } from "../components/PageLayout";
import { Grid } from "@mui/material";
import { getData } from "../../utils";
import { MyCard } from "../components/MyCard";
import { MySpinner } from "../components/MySpinner";

export const Movies = (props) => {
  const [page, setPage] = useState(1);
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [data, setData] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const type = "movie";

  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      setLoading(true);
      try {
        const result = await getData({ queryKey: ["data", type, page, selectedGenres] });
        if (!cancelled) setData(result);
      } catch (err) {
        console.error("getData error:", err);
        if (!cancelled) setData(null);
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    load();

    return () => {
      cancelled = true;
    };
  }, [page, selectedGenres]);

  return (
    <PageLayout
      title="Movies"
      page={page}
      setPage={setPage}
      type={type}
      selectedGenres={selectedGenres}
      setSelectedGenres={setSelectedGenres}
    >
      {isLoading && <MySpinner />}
      <Grid container spacing={2} justifyContent="center" sx={{ paddingTop: 2 }}>
        {data &&
          data.results?.map((obj) => <MyCard key={obj.id} {...obj} />)}
      </Grid>
    </PageLayout>
  );
};
