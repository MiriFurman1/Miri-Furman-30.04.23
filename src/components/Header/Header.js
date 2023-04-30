import React from 'react'
import Button from '@mui/material/Button';
import "./Header.css"
function Header() {
  return (
    <div className='Header'>
      <h3>Weather App</h3>
      <div>
        <Button href="/">Home</Button>
        <Button href="/favorites">Favorites</Button>
      </div>
    </div>
  )
}

export default Header