import DefaultLayout from "../components/layouts/default";
import Head from "next/head";
import { TextField, Grid, Button,Item } from "@mui/material";
import { SearchOutlined } from "@mui/icons-material";
import { useState } from "react";
import MangaCard from "../components/Cards/MangaCard";

export default function Index() {
  const [keyword, setKeyword] = useState("naruto");
  const [results, setResults] = useState([]);
  const searchManag = async () => {
    const url = `https://api.jikan.moe/v3/search/manga?q=${keyword}`;
    const resp = await fetch(url);
    const json = await resp.json();
    setResults(json.results);
  };
  return (
    <DefaultLayout>
      <Head>
        <title>Index Page</title>
      </Head>
      <div>
        <h1>Index Page</h1>
        <br />
        <TextField
          id="search-manga"
          label="Search Keyword"
          variant="standard"
          fullWidth
          value={keyword}
          onChange={(e) => {
            setKeyword[e.target.value];
          }}
        ></TextField>

        <Grid container justifyContent="center" style={{ marginTop: "10px" }}>
          <Button
            onClick={searchManag}
            variant="outlined"
            startIcon={<SearchOutlined />}
          >
            Search
          </Button>
        </Grid>

        <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }} justifyContent="center" style={{ marginTop: "20px" }}>
          
          {results.map((manga) => {
           return <Grid item xs={2} sm={4} md={4} key={manga.mal_id}>
            <MangaCard manga={manga} />
           </Grid>;
          })}
        </Grid>
      </div>
    </DefaultLayout>
  );
}
