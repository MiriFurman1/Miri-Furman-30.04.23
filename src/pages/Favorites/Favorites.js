import React from 'react'
import Card from '@mui/material/Card';
import Header from '../../components/Header/Header.js';
import useFavoritesStore from '../../app/favoritesStore.js';
import './favorites.css'
function Favorites() {
    const removeFavorite = useFavoritesStore((state) => state.removeFavorite)
    const favorites = useFavoritesStore(state => state.favorites);
    console.log(favorites);
    return (
        <div>
            <Header />
            <h1>Favorites</h1>
            <div className='favorites-cards'>
                {favorites.map((favorite, index) => (
                    <Card key={index} style={{ margin: '1rem',width: '200px', padding: '0.5rem', textAlign: 'center' }}>
                        <h3>{favorite.name}</h3>
                        {/* <p>{favorite.temperature}</p>
                            <p>{favorite.weatherText}</p>
                            <img src={favorite.weatherIcon} alt='weather-icon'></img> */}
                    </Card>
                ))}
            </div>


        </div>

    )
}

export default Favorites