import React,{useEffect, useState} from 'react'
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import Header from '../../components/Header/Header.js';
import useFavoritesStore from '../../app/favoritesStore.js';
import './Homepage.css'
import axios from 'axios';

function Homepage() {
    const addFavorite=useFavoritesStore((state)=>state.addFavorite)
    const removeFavorite=useFavoritesStore((state)=>state.removeFavorite)
    const [currentTLVWeather,setCurrentTLVWeather]=useState("")


    // useEffect(()=>{
    //     axios.get(`http://dataservice.accuweather.com/currentconditions/v1/215854?apikey=${process.env.REACT_APP_API_KEY}`)
    //     .then((response)=>{
    //         setCurrentTLVWeather(response.data)
    //         localStorage.setItem("currentTLVWeather",JSON.stringify(response.data))
    //         console.log(response.data);
    //     })
    // },[])


    useEffect(()=>{
        setCurrentTLVWeather(JSON.parse(localStorage.getItem("currentTLVWeather")))
    },[])
    return (
        <div className='Homepage'>
            <Header/>
            <input></input>
            <Container>
                <div className='topContainer'>
                    <Card>
                        <h3>current location</h3>
                        {currentTLVWeather&&<h3>{currentTLVWeather[0].WeatherText}</h3>}
                    </Card>
                    <Button>Add to favorites</Button>
                </div>
                <div className='DaysWeather'>
                    <Card>Day</Card>
                    <Card>Day</Card>
                    <Card>Day</Card>
                    <Card>Day</Card>
                    <Card>Day</Card>
                </div>
            </Container>
        </div>
    )
}

export default Homepage