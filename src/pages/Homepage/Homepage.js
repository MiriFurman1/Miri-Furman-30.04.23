import React from 'react'
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import Header from '../../components/Header/Header.js';
import './Homepage.css'
function Homepage() {
    return (
        <div className='Homepage'>
            <Header/>
            <input></input>
            <Container>
                <div className='topContainer'>
                    <Card>
                        <h3>current location</h3>
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