import React, { useState } from 'react';
import axios from 'axios';

const Weather = () => {
    const [city, setCity] = useState('');
    const [weather, setWeather] = useState('');
    const [temp, setTemp] = useState('');
    const [desc, setDesc] = useState('');
    const [icon, setIcon] = useState('');

    function handle(evt) {
        setCity(evt.target.value);
    }

    function getData() {
        var weathers = axios(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=a3baaaa10227c8f53d2822485a515c12`);

        weathers.then(function (success) {
            setWeather(success.data.weather[0].main);
            setTemp(Math.round(success.data.main.temp - 273.15)); // Convert Kelvin to Celsius
            setDesc(success.data.weather[0].description);
            setIcon(`http://openweathermap.org/img/wn/${success.data.weather[0].icon}.png`); // Get weather icon
        }).catch(function (err) {
            console.log('Error:', err);
        });
    }

    return (
        <div className='w-full h-screen bg-gradient-to-r from-blue-400 to-blue-800 flex flex-col justify-center items-center'>
            <div className='p-10 bg-white bg-opacity-80 rounded-xl shadow-lg'>
                <h1 className='text-3xl text-center text-gray-800 font-semibold mb-5'>Weather App</h1>
                <p className='text-center text-gray-700 mb-5'>Enter a city's name to get the weather report</p>
                <div className='flex justify-center'>
                    <input
                        onChange={handle}
                        type='text'
                        placeholder='Enter city'
                        className='p-2 rounded-lg border-2 border-gray-300 shadow-md outline-none text-gray-800'
                    />
                    <button
                        onClick={getData}
                        className='bg-blue-500 text-white px-6 py-2 rounded-lg ml-3 transition duration-300 ease-in-out transform hover:scale-105'
                    >
                        Get Report
                    </button>
                </div>

                <div className='mt-10'>
                    {weather && (
                        <div className='text-center'>
                            <img src={icon} alt='Weather Icon' className='mx-auto' />
                            <p className='text-lg text-gray-800 mt-5'>
                                <b>Weather:</b> {weather}
                            </p>
                            <p className='text-lg text-gray-800'>
                                <b>Temperature:</b> {temp}°C
                            </p>
                            <p className='text-lg text-gray-800'>
                                <b>Description:</b> {desc}
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Weather;
