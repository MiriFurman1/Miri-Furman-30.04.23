import React from 'react'
import Button from '@mui/material/Button';
import "./Header.css"
import useThemeStore from '../../app/themeStore';

function Header() {
  const toggleDarkMode = useThemeStore((state) => state.toggleDarkMode);
  const isDarkMode = useThemeStore((state) => state.darkMode);
  const headerClass = isDarkMode ? 'Header Header--dark' : 'Header Header--light';
  return (
    <div  className={headerClass}>
      <a href="/"><h3>Weather App</h3></a>
      <div>
        <Button href="/">Home</Button>
        <Button href="/favorites">Favorites</Button>
        <Button onClick={toggleDarkMode}>
          {useThemeStore((state) => (state.darkMode ? 'Light' : 'Dark'))} mode
        </Button>
      </div>
    </div>
  )
}

export default Header