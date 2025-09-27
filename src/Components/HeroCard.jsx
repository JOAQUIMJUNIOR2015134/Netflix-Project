import React from "react";

const HeroCard = ({
    backgroundImage,
    posterImage,
    year,
    duration,
    categories = [],
    onToggleCategory,
    activeCategories = [],
}) => {
    return (
        <div
            style={{
                position: "relative",
                width: "100%",
                minHeight: "400px",
                backgroundImage: `url(${backgroundImage})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                borderRadius: "16px",
                overflow: "hidden",
                boxShadow: "0 4px 24px rgba(0,0,0,0.4)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
            }}
        >
            {/* Overlay for dark effect */}
            <div
                style={{
                    position: "absolute",
                    inset: 0,
                    background: "rgba(0,0,0,0.5)",
                    zIndex: 1,
                }}
            />
            {/* Poster and Info */}
            <div
                style={{
                    position: "relative",
                    zIndex: 2,
                    display: "flex",
                    alignItems: "center",
                    gap: "32px",
                }}
            >
                {/* Poster Image */}
                <img
                    src={posterImage}
                    alt="Poster"
                    style={{
                        width: "200px",
                        height: "300px",
                        objectFit: "cover",
                        borderRadius: "12px",
                        boxShadow: "0 2px 16px rgba(0,0,0,0.7)",
                    }}
                />
                {/* Info */}
                <div style={{ color: "#fff" }}>
                    <div style={{ fontSize: "1.2rem", marginBottom: "8px" }}>
                        <strong>Ano:</strong> {year}
                    </div>
                    <div style={{ fontSize: "1.2rem", marginBottom: "16px" }}>
                        <strong>Duração:</strong> {duration}
                    </div>
                    <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
                        {categories.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => onToggleCategory && onToggleCategory(cat)}
                                style={{
                                    padding: "6px 16px",
                                    borderRadius: "20px",
                                    border: "none",
                                    background: activeCategories.includes(cat)
                                        ? "#ff9800"
                                        : "#333",
                                    color: "#fff",
                                    cursor: "pointer",
                                    fontWeight: "bold",
                                    transition: "background 0.2s",
                                }}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HeroCard;