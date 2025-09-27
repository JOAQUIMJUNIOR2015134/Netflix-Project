import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import SimpleCard from "../Components/SimpleCard";
import HeroCard from "../Components/HeroCard";

const API_KEY = "b7f24a66c3fb7e32c9e32c7dcb0faa45";
// const API_URL = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`;

function SeriesDetail() {
    const { id } = useParams();
    const API_CAST = `https://api.themoviedb.org/3/tv/${id}/aggregate_credits?api_key=${API_KEY}`;
    const [seriesDetails, setSeriesDetails] = useState(null);
    const [castFilter, setCastFilter] = useState([]);
    const [crewFilter, setCrewFilter] = useState([]);
    const [morelikeFilter, setMoreLikeFilter] = useState([]);
        
    
    
    useEffect(() => {
        const fetchSeriesDetails = async () => {
            const API_TV_ID = `https://api.themoviedb.org/3/tv/${id}?api_key=${API_KEY}`;
            const response = await fetch(API_TV_ID);
            const data = await response.json();
            setSeriesDetails(data);
        };
        fetchSeriesDetails();
    }, [id]);

    useEffect(() => {
        const fetchSerieCast = async () => {
            const response = await fetch(API_CAST);
            const data = await response.json();
            
            // Remove duplicatas do cast baseado no ID
            const uniqueCast = data.cast ? data.cast.filter((castMember, index, self) => 
                index === self.findIndex(c => c.id === castMember.id)
            ) : [];
            
            // Remove duplicatas da crew baseado no ID
            const uniqueCrew = data.crew ? data.crew.filter((crewMember, index, self) => 
                index === self.findIndex(c => c.id === crewMember.id)
            ) : [];
            
            setCastFilter(uniqueCast);
            setCrewFilter(uniqueCrew);
        };
        fetchSerieCast();
    }, [id]);

    // Buscar séries relacionadas com base nos gêneros da série atual
    useEffect(() => {
        const fetchMoreLike = async () => {
            if (!seriesDetails || !seriesDetails.genres || seriesDetails.genres.length === 0) return;
            // Pega o primeiro gênero da série para buscar similares
            const genreId = seriesDetails.genres[0].id;
            const API_MORE_LIKE = `https://api.themoviedb.org/3/discover/tv?api_key=${API_KEY}&with_genres=${genreId}&language=pt-BR`;
            const response = await fetch(API_MORE_LIKE);
            const data = await response.json();
            // Remove a série atual dos resultados
            const filtered = data.results
                ? data.results.filter(item => item.id !== seriesDetails.id)
                : [];
            setMoreLikeFilter(filtered.slice(0, 10)); // Limita para 10 resultados
        };
        fetchMoreLike();
    }, [seriesDetails]);

    if (!seriesDetails) {
        return <div> carregar...</div>;
    }

    return (
        <>
        <div>
            <div className="hero-card">
            <HeroCard
            backgroundImage={`https://image.tmdb.org/t/p/original${seriesDetails.backdrop_path}`}
            key={seriesDetails.id}
                id={seriesDetails.id}
                title={seriesDetails.name}
                posterImage={`https://image.tmdb.org/t/p/w500${seriesDetails.poster_path}`}
                type="series"
            />
            </div>
            <div className="overview">
                <h1 className="landing-title">OverView</h1>
            
            <SimpleCard
                key={seriesDetails.id}
                id={seriesDetails.id}
                description={seriesDetails.overview}
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
                            title={moreLikeMember.name}
                            image={`https://image.tmdb.org/t/p/w500${moreLikeMember.poster_path}`}
                            releasedate={moreLikeMember.first_air_date}
                            type="series"
                        />
                    ))
                ) : (
                    <div>Nenhuma série relacionada encontrada</div>
                )}
            </div>

        </div>
        </>
    );
}

export default SeriesDetail;