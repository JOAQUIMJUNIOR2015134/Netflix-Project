import React, { useState, useEffect } from "react";
import SimpleCard from "../Components/SimpleCard";
import "../Styles/LandingPage.css";
import "../Styles/Navbar.css"
import "../Styles/SimpleCard.css"



const API_KEY = "b7f24a66c3fb7e32c9e32c7dcb0faa45";
// const API_URL = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`;
const API_POPULAR = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`;
const API_NOWPLAYING = `https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}`;
const API_TOPRATED = `https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}`;
const API_UPCOMING = `https://api.themoviedb.org/3/movie/upcoming?api_key=${API_KEY}`;



function MoviesPage() {

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
    
      // upcoming
      const [upcomingMovies, setUpcomingMovies] = useState([]);
    
      useEffect(() => {
        const fetchUpcomingMovies = async () => {
          const response = await fetch(API_UPCOMING);
          const data = await response.json();
          setUpcomingMovies(data.results);
        };
        fetchUpcomingMovies();
      }, []);
    
      return (
        <>
          <div className="landing-page">
            <h1 className="landing-title">Popular Movies</h1>
            <div className="popular-movies">
              {popularmovies.map((popularmovie) => (
                <SimpleCard
                  key={popularmovie.id}
                  id={popularmovie.id}
                  title={popularmovie.title}
                  image={`https://image.tmdb.org/t/p/w500${popularmovie.poster_path}`}
                  releasedate={popularmovie.release_date}
                  type="movie"
                />
              ))}
            </div>
    
            <h1 className="landing-title">Now playing</h1>
            <div className="now-playing-movies">
              {nowPlayingMovies.map((nowPlayingMovie) => (
                <SimpleCard
                  key={nowPlayingMovie.id}
                  id={nowPlayingMovie.id}
                  title={nowPlayingMovie.title}
                  image={`https://image.tmdb.org/t/p/w500${nowPlayingMovie.poster_path}`}
                  releasedate={nowPlayingMovie.release_date}
                  type="movie"
                />
              ))}
            </div>
    
            <h1 className="landing-title">TOP RATED</h1>
            <div className="top-rated-movies">
              {topRatedMovies.map((topRatedMovie) => (
                <SimpleCard
                  key={topRatedMovie.id}
                  id={topRatedMovie.id}
                  title={topRatedMovie.title}
                  image={`https://image.tmdb.org/t/p/w500${topRatedMovie.poster_path}`}
                  releasedate={topRatedMovie.release_date}
                  type="movie"
                />
              ))}
            </div>
    
            <h1 className="landing-title">UPCOMING</h1>
            <div className="upcoming-movies">
              {upcomingMovies.map((upcomingMovie) => (
                <SimpleCard
                  key={upcomingMovie.id}
                  id={upcomingMovie.id}
                  title={upcomingMovie.title}
                  image={`https://image.tmdb.org/t/p/w500${upcomingMovie.poster_path}`}
                  releasedate={upcomingMovie.release_date}
                  type="movie"
                />
              ))}
            </div>
          </div>
        </>
      );
    }

export default MoviesPage;