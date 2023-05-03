import React, { useEffect, useState } from 'react'
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import Header from '../../components/Header/Header.js';
import useFavoritesStore from '../../app/favoritesStore.js';
import useThemeStore from '../../app/themeStore.js';
import './Homepage.css'
import axios from 'axios';
import dayjs from 'dayjs';
import { AiOutlineSearch } from "react-icons/ai";
import { AiOutlineHeart } from "react-icons/ai";
import { AiFillHeart } from "react-icons/ai";
import { toast } from 'react-toastify';
import weatherBackgrounds from '../../app/weatherBackgrounds.js'

function Homepage() {
    const favorites = useFavoritesStore(state => state.favorites);
    const addFavorite = useFavoritesStore((state) => state.addFavorite)
    const removeFavorite = useFavoritesStore((state) => state.removeFavorite)
    const selectedCity = useFavoritesStore((state) => state.selectedCity);
    const setSelectedCity = useFavoritesStore((state) => state.setSelectedCity);
    const [currentWeather, setCurrentWeather] = useState("")
    const [currentLocation, setCurrentLocation] = useState("Tel Aviv")
    const [daysForecasts, setDaysForecasts] = useState("")
    const [citySearch, setCitySearch] = useState("")
    const [cityData, setCityData] = useState({ LocalizedName: "Tel Aviv", Key: 215854 })
    const [isFavorite, setIsFavorite] = useState(false)
    const darkMode = useThemeStore(state => state.darkMode)
    const tempUnit = useThemeStore((state) => state.tempUnit);


    useEffect(() => {
        const fetchData = async () => {
            try {
                const currentWeatherResponse = await axios.get(`https://dataservice.accuweather.com/currentconditions/v1/215854?apikey=${process.env.REACT_APP_API_KEY}`);
                setCurrentWeather(currentWeatherResponse.data);
                localStorage.setItem("currentWeather", JSON.stringify(currentWeatherResponse.data));
                const iconCode = currentWeatherResponse.data[0].WeatherIcon;
                document.body.style.backgroundImage = `url(${weatherBackgrounds[iconCode] || '/default.jpg'})`;
                const isMetric = tempUnit === 'Metric';
                const daysForecastsResponse = await axios.get(`https://dataservice.accuweather.com/forecasts/v1/daily/5day/215854?apikey=${process.env.REACT_APP_API_KEY}&metric=${isMetric}`);
                setDaysForecasts(daysForecastsResponse.data);
                localStorage.setItem("daysForecasts", JSON.stringify(daysForecastsResponse.data));
            } catch (error) {
                toast(error.message);
            }
        };

        fetchData();
    }, [tempUnit]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (selectedCity !== null && Object.keys(selectedCity).length !== 0) {
                    const currentWeatherResponse = await axios.get(
                        `https://dataservice.accuweather.com/currentconditions/v1/${selectedCity.cityKey}?apikey=${process.env.REACT_APP_API_KEY}`
                    );
                    setCurrentWeather(currentWeatherResponse.data);
                    const iconCode = currentWeatherResponse.data[0].WeatherIcon;

                document.body.style.backgroundImage = `url(${weatherBackgrounds[iconCode] || '/default.jpg'})`;

                    localStorage.setItem("currentWeather", JSON.stringify(currentWeatherResponse.data));

                    const daysForecastsResponse = await axios.get(
                        `https://dataservice.accuweather.com/forecasts/v1/daily/5day/${selectedCity.cityKey}?apikey=${process.env.REACT_APP_API_KEY}&metric=true`
                    );
                    setDaysForecasts(daysForecastsResponse.data);
                    localStorage.setItem("daysForecasts", JSON.stringify(daysForecastsResponse.data));
                    setCurrentLocation(selectedCity.cityName);
                    setSelectedCity(null);
                }
            } catch (error) {
                toast(error.message);
            }
        };
        fetchData();
    }, [selectedCity]);


    useEffect(() => {
        setCurrentWeather(JSON.parse(localStorage.getItem("currentWeather")))
        setDaysForecasts(JSON.parse(localStorage.getItem("daysForecasts")))

    }, [])

    useEffect(() => {
        const isCurrentLocationFavorite = favorites.some(
            (favorite) => favorite.name === cityData.LocalizedName
        );
        setIsFavorite(isCurrentLocationFavorite);
    }, [favorites, cityData]);

    const searchCity = async (e) => {
        e.preventDefault();
        if (citySearch.length === 0) {
            toast("Can't search an empty field")
        }
        else {
            // Detect the language of the input
            function isEnglish(str) {
                return /^[A-Za-z\s]+$/.test(str);
            }
            if (!isEnglish(citySearch)) {
                toast('Please enter a city name in English');
                setCitySearch("");
                return;
            }
            try {
                const response = await axios.get(
                    `https://dataservice.accuweather.com/locations/v1/cities/autocomplete?apikey=${process.env.REACT_APP_API_KEY}&q=${citySearch}`
                );
                let cityDataVar = response.data[0];
                if (!cityDataVar) {
                    setCitySearch('');
                    throw Error("city not found")
                }
                setCityData(cityDataVar);
                setCitySearch('');
                setCurrentLocation(cityDataVar.LocalizedName)
                const currentWeatherResponse = await axios.get(
                    `https://dataservice.accuweather.com/currentconditions/v1/${cityDataVar.Key}?apikey=${process.env.REACT_APP_API_KEY}`
                );
                const currentWeatherData = currentWeatherResponse.data;
                setCurrentWeather(currentWeatherData);

                const iconCode = currentWeatherResponse.data[0].WeatherIcon;
                document.body.style.backgroundImage = `url(${weatherBackgrounds[iconCode] || '/default.jpg'})`;

                localStorage.setItem('currentWeather', JSON.stringify(currentWeatherData));
                
                const daysForecastsResponse = await axios.get(
                    `https://dataservice.accuweather.com/forecasts/v1/daily/5day/${cityDataVar.Key}?apikey=${process.env.REACT_APP_API_KEY}&metric=true`
                );
                const daysForecastsData = daysForecastsResponse.data;
                setDaysForecasts(daysForecastsData);
                localStorage.setItem('daysForecasts', JSON.stringify(daysForecastsData));
            } catch (error) {
                setCitySearch('');
                toast(error.message);
            }
        }
    };



    return (
        <div className='Homepage' >
            <Header />
            <Container >
                <form className='search' onSubmit={searchCity}>
                    <input
                        value={citySearch}
                        onChange={(e) => setCitySearch(e.target.value)}
                        style={{ backgroundColor: darkMode ? '#333' : 'white', color: darkMode ? 'white' : 'black' }}
                    />
                    <Button type='submit' style={{ backgroundColor: darkMode ? '#333' : 'white', color: darkMode ? "white" : "black", padding: '0.5rem', }}><AiOutlineSearch /></Button>

                </form>

                <div className='topContainer' >

                    <Card className="card" style={{ backgroundColor: darkMode ? '#333' : 'white', color: darkMode ? "white" : "black" }}>
                        {currentLocation && <h3>{currentLocation}</h3>}
                        {(currentWeather && currentWeather[0]) && <h3>{currentWeather[0].Temperature[tempUnit]?.Value}{currentWeather[0].Temperature[tempUnit].Unit}</h3>}
                        {(currentWeather && currentWeather[0]) && <h3>{currentWeather[0]?.WeatherText}</h3>}
                        {(currentWeather && currentWeather[0]) && <img src={`/weather icons/${currentWeather[0].WeatherIcon}-s.png`} alt='day-icon'></img>}
                    </Card>
                    <Button
                        style={{ backgroundColor: darkMode ? '#333' : 'white', color: darkMode ? "white" : "black", padding: '0.5rem' }}
                        onClick={() => {
                            const isAlreadyFavorite = favorites.some((favorite) => favorite.key === cityData.Key);
                            if (isAlreadyFavorite) {
                                removeFavorite(cityData.Key);
                            } else {
                                addFavorite({ name: cityData.LocalizedName, key: cityData.Key });
                            }
                            setIsFavorite(!isFavorite);
                        }}
                    >
                        {isFavorite ? <><AiFillHeart size={25} /> Remove from favorites</> : <><AiOutlineHeart size={25} /> Add to favorites</>}
                    </Button>
                </div>
                <div className='DaysWeather'>
                    {daysForecasts && daysForecasts.DailyForecasts.map((forecast, i) => {
                        return (
                            <Card className="card" key={i} style={{ backgroundColor: darkMode ? '#333' : 'white', color: darkMode ? "white" : "black" }}>
                                <h3>{dayjs(forecast.Date).format('dddd')}</h3>
                                <p>{dayjs(forecast.Date).format(' DD-MM-YYYY')}</p>
                                {forecast&&<p>{forecast.Temperature.Maximum.Value}{forecast.Temperature.Maximum.Unit}</p>}
                                {forecast&&<img src={`/weather icons/${forecast.Day.Icon}-s.png`} alt='day-icon'></img>}
                                {forecast&&<p>{forecast.Temperature.Minimum.Value}{forecast.Temperature.Minimum.Unit}</p>}
                                {forecast&&<img src={`/weather icons/${forecast.Night.Icon}-s.png`} alt='day-icon'></img>}
                            </Card>
                        )
                    })}
                </div>
            </Container>
        </div>
    )
}

export default Homepage