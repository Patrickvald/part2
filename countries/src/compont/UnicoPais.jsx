import LanguageList from "./LanguageList"
import conection from '../conection'
import { useState,useEffect } from "react"

const UnicoPais = ({pais}) => {
    
    const {languages, flags} = pais
    const photo = flags.png
    const [weatherCountry, setWeatherCountry] = useState(null)
    
    
    const ipKey = import.meta.env.VITE_API_KEY

    useEffect(()=>{
        const weather = ()=>{
            conection.capitalWeather(pais.capitalInfo.latlng[0], pais.capitalInfo.latlng[1], ipKey).then(clima =>{
                setWeatherCountry(clima)
            })
            }
        weather()
    },[])


    if(!weatherCountry){
        return null
    }


  return (
    <>
        <h1>{pais.name.common}</h1>
        <p>Capital: {pais.capital}</p>
        <p>{pais.area} square km</p>
        <h3>Languages</h3>
        <ul>
            <LanguageList languages={languages}/>
        </ul>
        <img src={photo}/>
        <h3>Weather in {pais.capital}</h3>
        <p>Temperature: {Math.floor(weatherCountry.main.temp -273)}º</p>
        <p>Wind: {weatherCountry.wind.speed}m/s</p>
    </>
  )
}

export default UnicoPais