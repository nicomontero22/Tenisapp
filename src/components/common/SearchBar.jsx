import React, { useState } from 'react';
import './SearchBar.css';

const SearchBar = () => {
    const [searchType, setSearchType] = useState('clubs'); // 'clubs' o 'players'
    const [searchQuery, setSearchQuery] = useState('');
    const [filters, setFilters] = useState({
        courtType: '',
        priceRange: '',
        distance: ''
    });
    const [showFilters, setShowFilters] = useState(false);

    const courtTypes = [
        { value: 'clay', label: 'Polvo de ladrillo' },
        { value: 'hard', label: 'Cemento' },
        { value: 'grass', label: 'Césped' },
        { value: 'carpet', label: 'Sintético' }
    ];

    const priceRanges = [
        { value: '0-2000', label: 'Hasta $2,000' },
        { value: '2000-4000', label: '$2,000 - $4,000' },
        { value: '4000-6000', label: '$4,000 - $6,000' },
        { value: '6000+', label: 'Más de $6,000' }
    ];

    const distances = [
        { value: '1', label: 'Hasta 1 km' },
        { value: '3', label: 'Hasta 3 km' },
        { value: '5', label: 'Hasta 5 km' },
        { value: '10', label: 'Hasta 10 km' },
        { value: 'any', label: 'Cualquier distancia' }
    ];

    const handleSearch = (e) => {
        e.preventDefault();
        console.log('Buscando:', { searchType, searchQuery, filters });
        // Aquí iría la lógica de búsqueda
    };

    const handleMapSearch = () => {
        console.log('Abriendo mapa...');
        // Aquí se abriría Google Maps
    };

    return (
        <div className="search-bar-container">
            <div className="search-bar-wrapper">
                {/* Toggle de tipo de búsqueda */}
                <div className="search-toggle">
                    <button
                        className={`toggle-btn ${searchType === 'clubs' ? 'active' : ''}`}
                        onClick={() => setSearchType('clubs')}
                    >
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" />
                        </svg>
                        Buscar Clubes
                    </button>
                    <button
                        className={`toggle-btn ${searchType === 'players' ? 'active' : ''}`}
                        onClick={() => setSearchType('players')}
                    >
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
                        </svg>
                        Buscar Jugadores
                    </button>
                </div>

                {/* Barra de búsqueda principal */}
                <form onSubmit={handleSearch} className="search-form">
                    <div className="search-input-wrapper">
                        <svg className="search-icon" width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                        </svg>

                        <input
                            type="text"
                            className="search-input"
                            placeholder={
                                searchType === 'clubs'
                                    ? 'Buscar clubes por nombre o ubicación...'
                                    : 'Buscar jugadores por nombre...'
                            }
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />

                        {searchType === 'clubs' && (
                            <>
                                <button
                                    type="button"
                                    className="map-button"
                                    onClick={handleMapSearch}
                                    title="Buscar en mapa"
                                >
                                    <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                                    </svg>
                                </button>

                                <button
                                    type="button"
                                    className="filter-button"
                                    onClick={() => setShowFilters(!showFilters)}
                                >
                                    <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                                        <path d="M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3z" />
                                    </svg>
                                    Filtros
                                    {(filters.courtType || filters.priceRange || filters.distance) && (
                                        <span className="filter-badge"></span>
                                    )}
                                </button>
                            </>
                        )}

                        <button type="submit" className="search-submit">
                            Buscar
                        </button>
                    </div>

                    {/* Panel de filtros */}
                    {showFilters && searchType === 'clubs' && (
                        <div className="filters-panel">
                            <div className="filter-group">
                                <label className="filter-label">
                                    <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                                        <circle cx="8" cy="8" r="6" />
                                    </svg>
                                    Tipo de cancha
                                </label>
                                <select
                                    className="filter-select"
                                    value={filters.courtType}
                                    onChange={(e) => setFilters({ ...filters, courtType: e.target.value })}
                                >
                                    <option value="">Todas</option>
                                    {courtTypes.map(type => (
                                        <option key={type.value} value={type.value}>{type.label}</option>
                                    ))}
                                </select>
                            </div>

                            <div className="filter-group">
                                <label className="filter-label">
                                    <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                                        <path d="M8.5 1a.5.5 0 00-1 0v1.293l-1.146-1.147a.5.5 0 00-.708.708L7.293 3.5H6a.5.5 0 000 1h1.293L5.646 6.146a.5.5 0 00.708.708L8 5.207l1.646 1.647a.5.5 0 00.708-.708L8.707 4.5H10a.5.5 0 000-1H8.707l1.647-1.646a.5.5 0 00-.708-.708L8.5 2.293V1z" />
                                    </svg>
                                    Precio por hora
                                </label>
                                <select
                                    className="filter-select"
                                    value={filters.priceRange}
                                    onChange={(e) => setFilters({ ...filters, priceRange: e.target.value })}
                                >
                                    <option value="">Cualquier precio</option>
                                    {priceRanges.map(range => (
                                        <option key={range.value} value={range.value}>{range.label}</option>
                                    ))}
                                </select>
                            </div>

                            <div className="filter-group">
                                <label className="filter-label">
                                    <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                                        <path fillRule="evenodd" d="M8 1a7 7 0 100 14A7 7 0 008 1zM8 9a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                                    </svg>
                                    Distancia
                                </label>
                                <select
                                    className="filter-select"
                                    value={filters.distance}
                                    onChange={(e) => setFilters({ ...filters, distance: e.target.value })}
                                >
                                    <option value="">Cualquier distancia</option>
                                    {distances.map(dist => (
                                        <option key={dist.value} value={dist.value}>{dist.label}</option>
                                    ))}
                                </select>
                            </div>

                            <button
                                type="button"
                                className="clear-filters"
                                onClick={() => setFilters({ courtType: '', priceRange: '', distance: '' })}
                            >
                                Limpiar filtros
                            </button>
                        </div>
                    )}
                </form>
            </div>
        </div>
    );
};

export default SearchBar;