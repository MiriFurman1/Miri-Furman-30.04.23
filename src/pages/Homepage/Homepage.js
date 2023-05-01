import React, { useEffect, useState } from 'react'
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import Header from '../../components/Header/Header.js';
import useFavoritesStore from '../../app/favoritesStore.js';
import './Homepage.css'
import axios from 'axios';
import dayjs from 'dayjs';
import { AiOutlineSearch } from "react-icons/ai";
import { AiOutlineHeart } from "react-icons/ai";
import { AiFillHeart } from "react-icons/ai";

function Homepage() {
    const favorites = useFavoritesStore(state => state.favorites);
    const addFavorite = useFavoritesStore((state) => state.addFavorite)
    const removeFavorite = useFavoritesStore((state) => state.removeFavorite)
    const [currentWeather, setCurrentWeather] = useState("")
    const [currentLocation, setCurrentLocation] = useState("Tel Aviv")
    const [daysForecasts, setDaysForecasts] = useState("")
    const [citySearch, setCitySearch] = useState("")
    const [cityData, setCityData] = useState("")
    const [isFavorite, setIsFavorite] = useState(false)

    useEffect(() => {
        axios.get(`http://dataservice.accuweather.com/currentconditions/v1/215854?apikey=${process.env.REACT_APP_API_KEY}`)
            .then((response) => {
                setCurrentWeather(response.data)
                localStorage.setItem("currentWeather", JSON.stringify(response.data))
                // console.log(response.data);
            })
        axios.get(`http://dataservice.accuweather.com/forecasts/v1/daily/5day/215854?apikey=${process.env.REACT_APP_API_KEY}&metric=true`)
            .then((response) => {
                setDaysForecasts(response.data)
                localStorage.setItem("daysForecasts", JSON.stringify(response.data))
                // console.log(response.data);
            })
    }, [])


    useEffect(() => {
        setCurrentWeather(JSON.parse(localStorage.getItem("currentWeather")))
        setDaysForecasts(JSON.parse(localStorage.getItem("daysForecasts")))

    }, [])

    const searchCity = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.get(
                `http://dataservice.accuweather.com/locations/v1/cities/autocomplete?apikey=${process.env.REACT_APP_API_KEY}&q=${citySearch}`
            );
            let cityDataVar = response.data[0];
            setCityData(cityDataVar);
            setCitySearch('');
            setCurrentLocation(cityDataVar.LocalizedName)
            console.log(cityDataVar);
            const currentWeatherResponse = await axios.get(
                `http://dataservice.accuweather.com/currentconditions/v1/${cityDataVar.Key}?apikey=${process.env.REACT_APP_API_KEY}`
            );
            const currentWeatherData = currentWeatherResponse.data;
            setCurrentWeather(currentWeatherData);
            localStorage.setItem('currentWeather', JSON.stringify(currentWeatherData));
            const daysForecastsResponse = await axios.get(
                `http://dataservice.accuweather.com/forecasts/v1/daily/5day/${cityDataVar.Key}?apikey=${process.env.REACT_APP_API_KEY}&metric=true`
            );
            const daysForecastsData = daysForecastsResponse.data;
            console.log(daysForecastsData)
            setDaysForecasts(daysForecastsData);
            localStorage.setItem('daysForecasts', JSON.stringify(daysForecastsData));

        } catch (error) {
            console.log(error.message);
        }
    };


    return (
        <div className='Homepage' >
            <Header />
            <Container >
                <form className='search' onSubmit={searchCity}>
                    <input
                        value={citySearch}
                        onChange={(e) => setCitySearch(e.target.value)}>
                    </input>
                    <Button type='submit' style={{ backgroundColor: 'white', padding: '0.5rem' }}><AiOutlineSearch /></Button>
                </form>

                <div className='topContainer' >
                    <Card style={{ width: '200px', padding: '0.5rem', textAlign: 'center' }}>
                        {currentLocation && <h3>{currentLocation}</h3>}
                        {currentWeather[0] && <h3>{currentWeather[0].Temperature.Metric.Value}{currentWeather[0].Temperature.Metric.Unit}</h3>}
                        {currentWeather[0] && <h3>{currentWeather[0].WeatherText}</h3>}
                        {currentWeather[0] && <img src={`/weather icons/${currentWeather[0].WeatherIcon}-s.png`} alt='day-icon'></img>}
                    </Card>
                    <Button
                        style={{ backgroundColor: 'white', padding: '0.5rem' }}
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
                            <Card key={i} style={{ width: '200px', padding: '0.5rem', textAlign: 'center' }}>
                                <p>{dayjs(forecast.Date).format(' DD-MM-YYYY')}</p>
                                <p>{forecast.Temperature.Maximum.Value}{forecast.Temperature.Maximum.Unit}</p>
                                <img src={`/weather icons/${forecast.Day.Icon}-s.png`} alt='day-icon'></img>
                                <p>{forecast.Temperature.Minimum.Value}{forecast.Temperature.Minimum.Unit}</p>
                                <img src={`/weather icons/${forecast.Night.Icon}-s.png`} alt='day-icon'></img>
                            </Card>
                        )
                    })}
                </div>
            </Container>
        </div>
    )
}

export default Homepage