import React, { useState, useEffect } from "react"; 
import SimpleCard from "../Components/SimpleCard";

const API_KEY = "b7f24a66c3fb7e32c9e32c7dcb0faa45";
// const API_URL = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`;
const API_POPULAR_TV = `https://api.themoviedb.org/3/tv/popular?api_key=${API_KEY}`;
const API_NOWPLAYING_TV = `https://api.themoviedb.org/3/tv/now_playing?api_key=${API_KEY}`;
const API_TOPRATED_TV = `https://api.themoviedb.org/3/tv/top_rated?api_key=${API_KEY}`;
const AIRING_TODAY = `https://api.themoviedb.org/3/tv/on_the_air?api_key=${API_KEY}`;

function SeriesPage() {
  const [popularTVShows, setPopularTVShows] = useState([]);

  useEffect(() => {
    const fetchPopularTVShows = async () => {
      const response = await fetch(API_POPULAR_TV);
      const data = await response.json();
      setPopularTVShows(data.results);
    };
    fetchPopularTVShows();
  }, []);

  // toprated
  const [topRatedTv, setTopRatedTv] = useState([]);

  useEffect(() => {
    const fetchTopRatedTv = async () => {
      const response = await fetch(API_TOPRATED_TV);
      const data = await response.json();
      setTopRatedTv(data.results);
    };
    fetchTopRatedTv();
  }, []);

  // airing today
  const [airingTodayMovies, setAiringTodayMovies] = useState([]);

  useEffect(() => {
    const fetchAiringTodayMovies = async () => {
      const response = await fetch(AIRING_TODAY);
      const data = await response.json();
      setAiringTodayMovies(data.results);
    };
    fetchAiringTodayMovies();
  }, []);

  return (
    <>
      <div className="landing-page">
        <h1 className="landing-title">Popular TV Shows</h1>
        <div className="popular-movies">
          {popularTVShows.map((popularTVShow) => (
            <SimpleCard
              key={popularTVShow.id}
              id={popularTVShow.id}
              title={popularTVShow.name}
              image={`https://image.tmdb.org/t/p/w500${popularTVShow.poster_path}`}
              type="series"
            />
          ))}
        </div>

        <h1 className="landing-title">TOP RATED</h1>
        <div className="top-rated-movies">
          {topRatedTv.map((topRatedShow) => (
            <SimpleCard
              key={topRatedShow.id}
              id={topRatedShow.id}
              title={topRatedShow.name}
              image={`https://image.tmdb.org/t/p/w500${topRatedShow.poster_path}`}
              type="series"
            />
          ))}
        </div>

        <h1 className="landing-title">AIRING TODAY</h1>
        <div className="airing-today-movies">
          {airingTodayMovies.map((airingTodayMovie) => (
            <SimpleCard
              key={airingTodayMovie.id}
              id={airingTodayMovie.id}
              title={airingTodayMovie.name}
              image={`https://image.tmdb.org/t/p/w500${airingTodayMovie.poster_path}`}
              type="series"
            />
          ))}
        </div>
      </div>
    </>
  );
}

export default SeriesPage;
