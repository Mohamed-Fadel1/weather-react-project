import React, { useEffect, useState } from 'react'
import "./Weather.css"
import search from "../assets/image/search.png"
import cloud from "../assets/image/cloud.png"
import humidity from "../assets/image/humidity.png"
import wind from "../assets/image/wind.png"
import clear from "../assets/image/clear.png"
import drizzle from "../assets/image/drizzle.png"
import rain from "../assets/image/rain.png"
import snow from "../assets/image/snow.png"
import  axios  from 'axios'

export default function Weather() {
  const key_api = "259d298419bf1c46e2f4a3f75a1fdfa0"



 const iconMappings = {
     "01d":clear,
     "01n":clear,
     "02d": cloud,
     "02n":cloud,
     "03d": drizzle,
     "03n": drizzle,
     "04d": drizzle,
     "04n": drizzle,
     "09d": rain,
     "09n": rain,
     "10d": rain,
     "10n": rain,
     "13d": snow,
     "13n": snow,
   };





 const [city , setCity] = useState('') 
 const [dataWheather , setDataWeather] = useState('')
 const [icon , setIcon] = useState('')
 const [error , setError] = useState('')


 const getWeather = async () => {


  if ( !city  ){
    setError(" Enter City Name ")
    return ;
  } else {
  const { data } = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key_api}&units=metric`);
  console.log(data);
  setDataWeather(data);
  setError("")
  }


}




      useEffect(() => {
        const iconKey = dataWheather  ? dataWheather.weather[0].icon : '';
        setIcon(iconMappings[iconKey]);
      }, [dataWheather]);
      


  return (
 <>
 <div className="containerr">
  <div className="weather">
    <div className="search">
      <input type="text" placeholder='Enter City Name' onChange={e=> setCity(e.target.value) } />
      <button onClick={()=>{getWeather()}}> <img src={search} alt="" />  </button>
  
    </div>
    <h4 className='text-warning mt-1'  > { error }  </h4>
    <div className="weatherInfo">
      <img src={icon} alt="weather " className='icon' />
      <h1>{dataWheather ? Math.floor(dataWheather.main.temp) + '°c' : ''}</h1>



      <h2 >{dataWheather ? dataWheather.name : ''}</h2>

<div className="detailes">
  <div className="col1">
    <img src={humidity} alt="" />
  <div className='humidity'>
  <p > { dataWheather ? Math.floor(dataWheather.main.humidity) : ""  } %</p>
    <p>humidity</p>
  </div>
  </div>
 
  <div className="col2">
    <img src={wind} alt="" />
   <div className='wind'>
   <p>{dataWheather ? Math.floor(dataWheather.wind.speed) : ''} km/h</p>

    <p>wind</p>
   </div>
  </div>
  </div>
</div>
    </div>
    
  </div>

 
 </>
  )
}
