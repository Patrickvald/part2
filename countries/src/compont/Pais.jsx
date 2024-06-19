import { useState } from 'react'
import LanguageList from './LanguageList'

const Pais = ({pais}) => {

  const [show, setShow] = useState(false)

  const {languages, flags} = pais
  const photo = flags.png
  
  const handleShowCountry = ()=>{
    console.log('Clickaste para ver: ',pais.name.common)
    setShow(true)
    /* const nombrePais = pais.name.common
    const paisSelected = pais.filter(p => p.name.common ===) */

  }

  return (
    <>
        {show?  
        <>
          <h1>{pais.name.common}</h1>
          <p>{pais.capital}</p>
          <p>{pais.area} square km</p>
          <h3>Languages</h3>
          <ul>
              <LanguageList languages={languages}/>
          </ul>
          <img src={photo}/>
        </>
        : <p>{pais.name.common} <button onClick={handleShowCountry}>show</button></p>}
 
        
    </>
  )
}

export default Pais
