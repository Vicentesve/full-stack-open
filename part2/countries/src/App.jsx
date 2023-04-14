import { useState } from 'react'
import axios from 'axios'
import { useEffect } from 'react'

const Country = ({ name, capital, popultation, languages, flag }) => {
  const [weather, setWeather] = useState({
    temperature: '',
    wind: '',
    windDir: '',
    icon: null
  })
  useEffect(() => {
    axios
      .get(
        `http://api.weatherapi.com/v1/current.json?key=${
          import.meta.env.VITE_WEATHER_API_KEY
        }&q=${name}`
      )
      .then((response) => {
        setWeather({
          temperature: response.data.current.temp_c,
          wind: response.data.current.wind_kph,
          windDir: response.data.current.wind_dir,
          icon: response.data.current.condition.icon
        })
      })
  }, [])

  return (
    <div>
      <h1>{name}</h1>
      <p>Capital: {capital}</p>
      <p>Population: {popultation}</p>

      <h2>Languages</h2>
      <ul>
        {languages.map((lenguage, i) => (
          <li key={i}>{lenguage}</li>
        ))}
      </ul>
      <img
        style={{ width: '100px' }}
        src={flag}
        alt={`Flag of the country ${name}`}
      />
      <h2>Weather in {name}</h2>
      <p>
        <strong>Temperature: </strong>
        {weather.temperature} C°
      </p>
      <img src={`https:${weather.icon}`} style={{ width: '100px' }} alt="" />
      <p>
        <strong>Wind: </strong>
        {weather.wind} kph direction {weather.windDir}
      </p>
    </div>
  )
}

const CountryList = ({ country }) => {
  const [showDetails, setShowDetails] = useState(false)
  return (
    <li>
      <span>{country.name}</span>
      <button onClick={() => setShowDetails(!showDetails)}>
        {showDetails ? 'Hide details' : 'Show details'}
      </button>

      {showDetails ? (
        <Country
          name={country.name}
          capital={country.capital}
          flag={country.flag}
          languages={country.languages}
          popultation={country.population}
        />
      ) : null}
    </li>
  )
}

function App() {
  const [countries, setContries] = useState([])
  const [countryFilter, setCountryFilter] = useState('')

  const onFilterChange = (e) => {
    setCountryFilter(e.target.value)
  }

  const countriesToShow =
    countryFilter.length > 0
      ? countries.filter((country) =>
          country.name.toLowerCase().includes(countryFilter.toLowerCase())
        )
      : []

  useEffect(() => {
    axios.get('https://restcountries.com/v3.1/all').then((response) => {
      const countries = response.data.map((country) => ({
        name: country.name.common,
        capital: country.capital,
        population: country.population,
        languages: Object.values(country?.languages ?? {}),
        flag: country.flags.svg
      }))

      setContries(countries)
    })
  }, [])

  return (
    <div>
      <>
        <label htmlFor="country">Find Countries</label>
        <input
          type="text"
          id="country"
          value={countryFilter}
          onChange={onFilterChange}
          style={{ marginLeft: '10px' }}
        />
      </>

      <ul>
        {countryFilter.length === 0 ? null : countriesToShow.length > 10 ? (
          'Too many matches, specifiy another filter'
        ) : countriesToShow.length <= 10 && countriesToShow.length > 1 ? (
          countriesToShow.map((country, i) => (
            <CountryList key={`${country.name}_${i}`} country={country} />
          ))
        ) : countriesToShow.length === 1 ? (
          <Country
            name={countriesToShow[0].name}
            capital={countriesToShow[0].capital}
            languages={countriesToShow[0].languages}
            popultation={countriesToShow[0].population}
            flag={countriesToShow[0].flag}
          />
        ) : (
          'No country found'
        )}
      </ul>
    </div>
  )
}

export default App
