import React from 'react'
import Button from '@mui/material/Button';
import "./Header.css"
import useThemeStore from '../../app/themeStore';
import { RiCelsiusLine } from "react-icons/ri";
import { RiFahrenheitLine } from "react-icons/ri";
import { BsFillSunFill } from "react-icons/bs";
import { BsFillMoonFill } from "react-icons/bs";

function Header() {
  const toggleDarkMode = useThemeStore((state) => state.toggleDarkMode);
  const isDarkMode = useThemeStore((state) => state.darkMode);
  const toggleTempUnit = useThemeStore((state) => state.toggleTempUnit);
  const tempUnit = useThemeStore((state) => state.tempUnit);


  const headerClass = isDarkMode ? 'Header Header--dark' : 'Header Header--light';
  return (
    <div className={headerClass}>
      <a href="/"><h3>WeatherVision</h3></a>
      <div>
        <Button href="/">Home</Button>
        <Button href="/favorites">Favorites</Button>
        <Button onClick={toggleTempUnit}>
          {tempUnit === "Metric" ? <RiCelsiusLine size={15}/>: <RiFahrenheitLine size={15}/> }
        </Button>
        <Button onClick={toggleDarkMode}>
          {useThemeStore((state) => (state.darkMode ? <BsFillMoonFill size={20}/>: <BsFillSunFill size={20}/>))} 
        </Button>
      </div>
    </div>
  )
}

export default Header