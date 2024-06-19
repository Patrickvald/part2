import { useState, useEffect } from 'react'
import conexions from './conection'
import Pais from './compont/Pais'
import UnicoPais from './compont/UnicoPais'


function App() {
  const [targetCountry, setTargetCountry] = useState('')
  const [data, setData] = useState(null)


  useEffect (()=>{
    
      const fetchAllCountries =  ()=>{
        conexions.searchAll().then(countriesList =>{
          setData(countriesList)
        })
    }
    fetchAllCountries()
  },[])

  if (!data) { 
    return null 
  }
  
  const Resultado = data.filter(pais => pais.name.common.toLowerCase().startsWith(targetCountry.toLowerCase()))


  const handleSearchCountry = (e)=>{
  setTargetCountry(e.target.value)
  }

  //Resultado.length > 10? (Resultado.length <= 10 && Resultado.length > 1) ?
  return (
    <>
      <div>
        find countries : <input value ={targetCountry} onChange={handleSearchCountry}/>
        <div>
          {Resultado.length > 10? 'Too many countries' : (Resultado.length <= 10 && Resultado.length > 1) ? 
           Resultado.map((pais,index)=><Pais key={index} pais={pais}/>)
          :Resultado.map((pais,index)=><UnicoPais key={index} pais={pais}/>) }
      
        </div>
      </div>
    </>
  )
}

export default App
