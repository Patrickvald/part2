import axios from "axios";
const baseURL = 'https://studies.cs.helsinki.fi/restcountries/api/all'


const searchAll = async ()=>{
    const response = await axios(baseURL)
    
    const result = await response.data
    
    return  result
}

const capitalWeather = async (lat, lon, apiKey)=>{
    const response = await axios(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`)
    const result = await response.data
    return result
}

export default {searchAll, capitalWeather}
