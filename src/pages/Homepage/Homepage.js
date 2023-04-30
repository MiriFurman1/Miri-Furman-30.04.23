import React, { useEffect, useState } from 'react'
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import Header from '../../components/Header/Header.js';
import useFavoritesStore from '../../app/favoritesStore.js';
import './Homepage.css'
import axios from 'axios';
import dayjs from 'dayjs';
function Homepage() {
    const addFavorite = useFavoritesStore((state) => state.addFavorite)
    const removeFavorite = useFavoritesStore((state) => state.removeFavorite)
    const [currentWeather, setCurrentWeather] = useState("")
    const [currentLocation, setCurrentLocation] = useState("Tel Aviv")
    const [daysForecasts, setDaysForecasts] = useState("")

    useEffect(() => {
        // axios.get(`http://dataservice.accuweather.com/currentconditions/v1/215854?apikey=${process.env.REACT_APP_API_KEY}`)
        // .then((response)=>{
        //     setCurrentWeather(response.data)
        //     localStorage.setItem("currentWeather",JSON.stringify(response.data))
        //     console.log(response.data);
        // })
        // axios.get(`http://dataservice.accuweather.com/forecasts/v1/daily/5day/215854?apikey=${process.env.REACT_APP_API_KEY}&metric=true`)
        //         .then((response)=>{
        //             setDaysForecasts(response.data)
        //         localStorage.setItem("daysForecasts",JSON.stringify(response.data))
        //         console.log(response.data);
        //     })
    }, [])


    useEffect(() => {
        setCurrentWeather(JSON.parse(localStorage.getItem("currentWeather")))
        setDaysForecasts(JSON.parse(localStorage.getItem("daysForecasts")))
        console.log(currentLocation);

    }, [])
    return (
        <div className='Homepage'>
            <Header />
            <input></input>
            <Container>
                <div className='topContainer'>
                    <Card style={{ width: '200px' }}>
                        {currentLocation && <h3>{currentLocation}</h3>}
                        {currentWeather[0] && <h3>{currentWeather[0].Temperature.Metric.Value}{currentWeather[0].Temperature.Metric.Unit}</h3>}
                        {currentWeather[0] && <h3>{currentWeather[0].WeatherText}</h3>}
                        {currentWeather[0] && <img src={`/weather icons/${currentWeather[0].WeatherIcon}-s.png`} alt='day-icon'></img>}
                    </Card>
                    <Button>Add to favorites</Button>
                </div>
                {currentLocation && <h3>{currentLocation}</h3>}
                <div className='DaysWeather'>
                    {daysForecasts && daysForecasts.DailyForecasts.map((forecast, i) => {
                        return (
                            <Card key={i} style={{ width: '200px' }}>
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