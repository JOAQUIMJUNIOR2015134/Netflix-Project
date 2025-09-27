import { Link } from "react-router-dom";
import SearchBar from "./SearchBar";

function Navbar() {
    const handleSearch = (results) => {
        console.log('Search results:', results);
        // Aqui você pode implementar a lógica de busca
    };

    return (
        <nav className="navbar">
            <div className="navbar-logo">
                <Link to="/" className="navbar-logo-btn">
                    <img src="./Logo_Netflix.png" alt="Logo" />
                </Link>
            </div>
            <div className="navbar-links">
                <Link to="/movies">
                    <button className="navbar-item-blue">Movies</button>
                </Link>
                <Link to="/series">
                    <button className="navbar-item-red">Series</button>
                </Link>
            </div>
            <SearchBar onSearch={handleSearch} />
        </nav>
    );
}

export default Navbar;
/*
Adicione navegação para MoviesPage e SeriesPage usando react-router-dom.
*/
