//https://api.openweathermap.org/data/2.5/weather?q=seattle&appid=5a1d5675ec11ac425b327df41ea4c238


import React, { useEffect, useState } from 'react';
import "./style.css";
import WeatherCard from './weatherCard';

const Temp = () => {
    const [searchValue, setSearchValue] = useState("seattle");
    const [tempInfo, setTempInfo] = useState({});
    const getWeatherInfo = async () => {
        try {
           let url = `https://api.openweathermap.org/data/2.5/weather?q=${searchValue}&units=metric&appid=e0659785ba90724ca804d1bc2f663089`;
      // &units=metric for temperature in celsius

           const res = await fetch(url)
            const data = await res.json();

            const {temp, humidity, pressure} = data.main;
            const {main: weathermood} = data.weather[0]; 
            // changed the name "main " to "weathermood" in above sentence
            const {name} = data;
            const {speed } = data.wind;
            const { country, sunset} = data.sys;

            const myNewWeatherInfo = {
                temp,
                humidity,
                pressure,
                weathermood,
                name,
                speed,
                country,
                sunset,
            };

            setTempInfo(myNewWeatherInfo);

        } catch (error) {
            console.log(error);
            
        }
    };

    useEffect(() => {
        getWeatherInfo();
    }, []);
    return (
        <>
            <div className='wrap'>
                <div className='search'>
                    <input type="search"
                        placeholder='search...'
                        autoFocus
                        id='search'
                        className='searchTerm'
                        value={ searchValue }
                        onChange={(e) => setSearchValue(e.target.value) }
                    />
                    <button type="button" className='searchButton' onClick={getWeatherInfo}>Search</button>
                </div>
            </div>
        <WeatherCard tempInfo={tempInfo} />
        </>
    )
}

export default Temp;