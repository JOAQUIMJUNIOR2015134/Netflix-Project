import React, { useState } from 'react';
import "../Styles/SearchBar.css"

const SearchBar = ({ onSearch }) => {
    const [query, setQuery] = useState('');
    const API_KEY = "b7f24a66c3fb7e32c9e32c7dcb0faa45";

    const handleInputChange = (e) => {
        setQuery(e.target.value);
    };

    React.useEffect(() => {
        if (query.trim() === '') {
            if (onSearch) onSearch([]);
            return;
        }

        const controller = new AbortController();
        fetch(`https://api.themoviedb.org/3/search/multi?api_key=${API_KEY}&query=${encodeURIComponent(query)}`, {
            signal: controller.signal
        })
            .then(res => res.json())
            .then(data => {
                if (onSearch) {
                    onSearch(data.results || []);
                }
            })
            .catch(error => {
                if (error.name !== 'AbortError') {
                    console.error('Erro ao buscar filmes/séries:', error);
                    if (onSearch) {
                        onSearch([]);
                    }
                }
            });

        return () => controller.abort();
    }, [query, onSearch]);

    return (
        <div className="search-bar-container">
        <form className="search-bar-form" onSubmit={e => e.preventDefault()}>
            <input
                className="search-bar-input"
                type="text"
                placeholder="Pesquisar..."
                value={query}
                onChange={handleInputChange}
            />
        </form>
        </div>
    );
};

export default SearchBar;