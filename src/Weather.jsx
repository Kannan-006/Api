import React, { useState } from 'react'
import axios from 'axios'

 const Weather = () => {

    const [city,setcity]=useState('')
    const [weather,setweather]=useState('')
    const [temp,settemp]=useState('')
    const [desc,setdesc]=useState('')

    function handle(evt){
        setcity(evt.target.value)
    }

    function getData(){
       var weathers = axios(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=a3baaaa10227c8f53d2822485a515c12`) 

        weathers.then(function(success){
            // console.log(success.data.weather[0].main)
            setweather(success.data.weather[0].main)
            settemp(success.data.main.temp)
            setdesc(success.data.weather[0].description)
        }).catch(function(err){
            console.log('err')
        })
    }
  return (
    <div className=' p-10 flex flex-col items-center  text-center'>
        <div className='p-10 bg-black rounded-lg mt-32 '>
        <div className='flex flex-col '>
            <h1  className='text-white'>Weather App</h1>
            <p className='text-white'>Enter City's Name</p>
            <input onChange={handle} type='text' placeholder='Enter city'className='relative left-5 outline-none  rounded-lg mt-5 mr-10'/>
            <button onClick={getData} className='bg-blue-400 p-2 rounded-2xl  mt-5'>Get Report</button>
            <p className='text-white mt-10'><b>Weather :</b>{weather}</p>
            <p className='text-white'><b>Temperature :</b>{temp}</p>
            <p className='text-white'><b>Description :</b>{desc}</p>
        </div>
    </div>
    </div>
  )
}
export default Weather;