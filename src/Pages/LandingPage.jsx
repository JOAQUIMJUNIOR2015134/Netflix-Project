import React, { useState, useEffect } from "react";
import SimpleCard from "../Components/SimpleCard";
import "../Styles/LandingPage.css";
import "../Styles/SimpleCard.css"

const API_KEY = "b7f24a66c3fb7e32c9e32c7dcb0faa45";
// const API_URL = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`;
const API_POPULAR = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`;
const API_NOWPLAYING = `https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}`;
const API_TOPRATED = `https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}`;
const AIRING_TODAY = `https://api.themoviedb.org/3/tv/on_the_air?api_key=${API_KEY}`;

function LandingPage() {
  // recolhe todos os filmes

//   const [movies, setMovies] = useState([]);

//   useEffect(() => {
//     const fetchMovies = async () => {
//       const response = await fetch(API_URL);
//       const data = await response.json();
//       setMovies(data.results);
//     };
//     fetchMovies();
//   }, []);

  // Popular Movies
  const [popularmovies, setPopularMovies] = useState([]);

  useEffect(() => {
    const fetchPopularMovies = async () => {
      const response = await fetch(API_POPULAR);
      const data = await response.json();
      setPopularMovies(data.results);
    };
    fetchPopularMovies();
  }, []);

  // nowplaying
  const [nowPlayingMovies, setNowPlayingMovies] = useState([]);

  useEffect(() => {
    const fetchNowPlayingMovies = async () => {
      const response = await fetch(API_NOWPLAYING);
      const data = await response.json();
      setNowPlayingMovies(data.results);
    };
    fetchNowPlayingMovies();
  }, []);

  // toprated
  const [topRatedMovies, setTopRatedMovies] = useState([]);

  useEffect(() => {
    const fetchTopRatedMovies = async () => {
      const response = await fetch(API_TOPRATED);
      const data = await response.json();
      setTopRatedMovies(data.results);
    };
    fetchTopRatedMovies();
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
        <h1 className="landing-title">Popular Movies</h1>
        <div className="popular-movies">
          {popularmovies.map((popularmovie) => (
            <SimpleCard
              key={popularmovie.id}
              title={popularmovie.title}
              image={`https://image.tmdb.org/t/p/w500${popularmovie.poster_path}`}
              releasedate={popularmovie.release_date}
            />
          ))}
        </div>

        <h1 className="landing-title">Now playing</h1>
        <div className="now-playing-movies">
          {nowPlayingMovies.map((nowPlayingMovie) => (
            <SimpleCard
              key={nowPlayingMovie.id}
              title={nowPlayingMovie.title}
              image={`https://image.tmdb.org/t/p/w500${nowPlayingMovie.poster_path}`}
              releasedate={nowPlayingMovie.release_date}
            />
          ))}
        </div>

        <h1 className="landing-title">TOP RATED</h1>
        <div className="top-rated-movies">
          {topRatedMovies.map((topRatedMovie) => (
            <SimpleCard
              key={topRatedMovie.id}
              title={topRatedMovie.title}
              image={`https://image.tmdb.org/t/p/w500${topRatedMovie.poster_path}`}
              releasedate={topRatedMovie.release_date}
            />
          ))}
        </div>

        <h1 className="landing-title">AIRING TODAY</h1>
        <div className="airing-today-movies">
          {airingTodayMovies.map((airingTodayMovie) => (
            <SimpleCard
              key={airingTodayMovie.id}
              image={`https://image.tmdb.org/t/p/w500${airingTodayMovie.poster_path}`}
            />
          ))}
        </div>
      </div>
    </>
  );
}
// airingTodayMovies, setAiringTodayMovies
export default LandingPage;