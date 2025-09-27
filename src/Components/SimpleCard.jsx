import React from "react";
import { Link } from 'react-router-dom';


function SimpleCard({ id, title, image, description, releaseDate, className, type = 'movie' }) {

    const linkTo = type === 'series' ? `/series/${id}` : `/movies/${id}`;
    
    return (
        <Link to={linkTo}>
            <div className={`simple-card ${className}`}>
                {image && (
                    <img src={image} alt={title} className="simple-card-image" />
                )}
                <h2 className="simple-card-title">{title}</h2>
                <p className="simple-card-description">{description}</p>
                <p className="simple-card-release-date">{releaseDate}</p>
            </div>
        </Link>
    );
}
export default SimpleCard;