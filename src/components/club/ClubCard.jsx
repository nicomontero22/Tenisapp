import React, { useState } from 'react';
import './ClubCard.css';

const ClubCard = ({ club, onViewDetails }) => {
    const [isFavorite, setIsFavorite] = useState(false);

    const {
        id,
        name,
        image,
        rating,
        reviewCount,
        distance,
        courts,
        courtTypes,
        pricePerHour,
        availability,
        amenities,
        promocion
    } = club;

    const handleFavoriteClick = (e) => {
        e.stopPropagation();
        setIsFavorite(!isFavorite);
    };

    const formatPrice = (price) => {
        return new Intl.NumberFormat('es-AR', {
            style: 'currency',
            currency: 'ARS',
            minimumFractionDigits: 0
        }).format(price);
    };

    return (
        <div className="club-card" onClick={() => onViewDetails(club)}>
            {/* Imagen */}
            <div className="club-card-image">
                <img src={image} alt={name} />

                {/* Badge de disponibilidad */}
                <div className={`availability-badge ${availability > 0 ? 'available' : 'full'}`}>
                    {availability > 0 ? (
                        <>
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                                <path d="M10.97 4.97a.235.235 0 0 0-.02.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05z" />
                            </svg>
                            {availability} disponibles
                        </>
                    ) : (
                        <>
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                                <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
                            </svg>
                            Completo
                        </>
                    )}
                </div>

                {/* Badge de promoción */}
                {promocion && (
                    <div className="promo-badge">
                        <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor">
                            <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288L8 2.223l1.847 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.565.565 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z" />
                        </svg>
                        {promocion}
                    </div>
                )}

                {/* Botón favorito */}
                <button
                    className={`favorite-btn ${isFavorite ? 'active' : ''}`}
                    onClick={handleFavoriteClick}
                >
                    <svg width="20" height="20" viewBox="0 0 20 20" fill={isFavorite ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2">
                        <path d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" />
                    </svg>
                </button>
            </div>

            {/* Contenido */}
            <div className="club-card-content">
                {/* Header */}
                <div className="club-card-header">
                    <h3 className="club-name">{name}</h3>
                    <div className="club-rating">
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                            <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                        </svg>
                        <span>{rating}</span>
                        <span className="review-count">({reviewCount})</span>
                    </div>
                </div>

                {/* Info */}
                <div className="club-info">
                    <div className="info-item">
                        <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor">
                            <path fillRule="evenodd" d="M8 1a3 3 0 1 0 0 6 3 3 0 0 0 0-6zM4 4a4 4 0 1 1 4.5 3.969V13.5a.5.5 0 0 1-1 0V7.97A4 4 0 0 1 4 3.999z" />
                        </svg>
                        <span>{distance}</span>
                    </div>

                    <div className="info-item">
                        <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor">
                            <circle cx="8" cy="8" r="6" />
                        </svg>
                        <span>{courts} canchas</span>
                    </div>

                    <div className="info-item court-types">
                        {courtTypes.map((type, index) => (
                            <span key={index} className="court-type-tag">{type}</span>
                        ))}
                    </div>
                </div>

                {/* Amenities */}
                {amenities && amenities.length > 0 && (
                    <div className="club-amenities">
                        {amenities.slice(0, 4).map((amenity, index) => (
                            <span key={index} className="amenity-tag">
                                {amenity}
                            </span>
                        ))}
                        {amenities.length > 4 && (
                            <span className="amenity-tag more">+{amenities.length - 4}</span>
                        )}
                    </div>
                )}

                {/* Footer con precio */}
                <div className="club-card-footer">
                    <div className="price-info">
                        <span className="price-label">Desde</span>
                        <span className="price-value">{formatPrice(pricePerHour)}<small>/hora</small></span>
                    </div>
                    <button className="view-details-btn">
                        Ver disponibilidad
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                            <path fillRule="evenodd" d="M4 8a.5.5 0 0 1 .5-.5h5.793L8.146 5.354a.5.5 0 1 1 .708-.708l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L10.293 8.5H4.5A.5.5 0 0 1 4 8z" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ClubCard;