import React from 'react'
import Card from '@mui/material/Card';
import Header from '../../components/Header/Header.js';
import useFavoritesStore from '../../app/favoritesStore.js';
function Favorites() {
    const removeFavorite=useFavoritesStore((state)=>state.removeFavorite)
    return (
        <div>
            <Header />
            <h1>Favorites</h1>
            <Card variant="outlined"><h2>card</h2></Card>
        </div>
    )
}

export default Favorites