import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import SimpleCard from "../Components/SimpleCard";
import HeroCard from "../Components/HeroCard";

const API_KEY = "b7f24a66c3fb7e32c9e32c7dcb0faa45";

function MovieDetail() {
    const { id } = useParams();
    const API_CAST = `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${API_KEY}`;
    const [movieDetails, setMovieDetails] = useState(null);
    const [castFilter, setCastFilter] = useState([]);
    const [crewFilter, setCrewFilter] = useState([]);
    const [morelikeFilter, setMoreLikeFilter] = useState([]);

    useEffect(() => {
        const fetchMovieDetails = async () => {
            const API_MOVIE_ID = `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}`;
            console.log('Fetching movie details from:', API_MOVIE_ID);
            const response = await fetch(API_MOVIE_ID);
            const data = await response.json();
            console.log('Movie details response:', data);
            setMovieDetails(data);
        };
        fetchMovieDetails();
    }, [id]);

    useEffect(() => {
        const fetchMovieCast = async () => {
            console.log('Fetching movie cast from:', API_CAST);
            const response = await fetch(API_CAST);
            const data = await response.json();
            console.log('Cast response:', data);
            
            // Remove duplicatas do cast baseado no ID
            const uniqueCast = data.cast ? data.cast.filter((castMember, index, self) => 
                index === self.findIndex(c => c.id === castMember.id)
            ) : [];
            
            // Remove duplicatas da crew baseado no ID
            const uniqueCrew = data.crew ? data.crew.filter((crewMember, index, self) => 
                index === self.findIndex(c => c.id === crewMember.id)
            ) : [];
            
            console.log('Unique cast length:', uniqueCast.length);
            console.log('Unique crew length:', uniqueCrew.length);
            
            setCastFilter(uniqueCast);
            setCrewFilter(uniqueCrew);
        };
        fetchMovieCast();
    }, [id]);

    // Buscar filmes relacionados com base nos gêneros do filme atual
    useEffect(() => {
        const fetchMoreLike = async () => {
            if (!movieDetails || !movieDetails.genres || movieDetails.genres.length === 0) return;
            // Pega o primeiro gênero do filme para buscar similares
            const genreId = movieDetails.genres[0].id;
            const API_MORE_LIKE = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_genres=${genreId}&language=pt-BR`;
            const response = await fetch(API_MORE_LIKE);
            const data = await response.json();
            // Remove o filme atual dos resultados
            const filtered = data.results
                ? data.results.filter(item => item.id !== movieDetails.id)
                : [];
            setMoreLikeFilter(filtered.slice(0, 10)); // Limita para 10 resultados
        };
        fetchMoreLike();
    }, [movieDetails]);

    if (!movieDetails) {
        return <div>Carregando...</div>;
    }

    return (
        <>
        <div>
            <div className="hero-card">
            <HeroCard
            backgroundImage={`https://image.tmdb.org/t/p/original${movieDetails.backdrop_path}`}
            key={movieDetails.id}
                id={movieDetails.id}
                title={movieDetails.title}
                posterImage={`https://image.tmdb.org/t/p/w500${movieDetails.poster_path}`}
                type="movie"
            />
            </div>
            <div className="overview">
                <h1 className="landing-title">OverView</h1>
            
            <SimpleCard
                key={movieDetails.id}
                id={movieDetails.id}
                description={movieDetails.overview}
            />

            </div>
             <h1 className="landing-title">Cast</h1>
            <div className="filter-cast">
                          {castFilter.map((castMember, index) => (
                            <SimpleCard
                              key={`cast-${castMember.id}-${index}`}
                              title={castMember.name}
                              image={`https://image.tmdb.org/t/p/w500${castMember.profile_path}`}
                              releasedate={castMember.release_date}
                            />

                          ))}
            </div>

            <h1 className="landing-title">Crew</h1>
            <div className="filter-cast">
                {crewFilter && crewFilter.length > 0 ? (
                    crewFilter.map((crewMember, index) => (
                        <SimpleCard
                            key={`crew-${crewMember.id}-${index}`}
                            title={crewMember.name}
                        />
                    ))
                ) : (
                    <div>Nenhuma informação de crew disponível</div>
                )}
            </div>

            <h1 className="landing-title">More Like This</h1>
            <div className="more-like">
                {morelikeFilter.length > 0 ? (
                    morelikeFilter.map((moreLikeMember) => (
                        <SimpleCard
                            key={moreLikeMember.id}
                            title={moreLikeMember.title}
                            image={`https://image.tmdb.org/t/p/w500${moreLikeMember.poster_path}`}
                            releasedate={moreLikeMember.release_date}
                            type="movie"
                        />
                    ))
                ) : (
                    <div>Nenhum filme relacionado encontrado</div>
                )}
            </div>

        </div>
        </>
    );
}

export default MovieDetail;