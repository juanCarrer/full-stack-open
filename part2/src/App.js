import React, { useState, useEffect, Fragment } from 'react'
import axios from 'axios'

const Weather = ({ capital }) => {
	const [weatherData, setWeatherData] = useState({})
	let isMounted = true

	useEffect(() => {
		axios.get(`http://api.weatherstack.com/current?access_key=${process.env.REACT_APP_WEATHER_ACCESS_KEY}&query=${capital}`)
			.then(response => {
				isMounted && setWeatherData(response.data)
			})
			.catch(err => {
				console.error(err.message)
			})

			return () => {
				isMounted = false
			}
	}, [capital])

	if (Object.keys(weatherData).length === 0) {
		return <h2>loading Weather...</h2>
	}

	return (
		<div>
			<h2>Weather in {capital}</h2>
			<p>
				<b>temperature: </b>
				{weatherData.current.temperature} Celcius
			</p>
			<img src={weatherData.current.weather_icons[0]} alt='weather_icons' />
			<p>
				<b>wind: </b>
				{weatherData.current.wind_speed} mph direction {weatherData.current.wind_dir}
			</p>
		</div>
	)
}


const Countries = ({ countries, setFilter }) => {
	const handleShowButton = (countryName) => {
		setFilter(countryName)
	}

	if (countries.length > 10) {
		return <p>Too many countries, specify another filter</p>
	}

	if (countries.length > 1 && countries.length <= 10) {
		return (
			<div>
			{
				countries.map(item => {
					return (
						<div key={item.name}>
							{item.name}
							<button onClick={() => { handleShowButton(item.name) }}>show</button>
						</div>
					)
				})
			}
			</div>
		)
	}

	if (countries.length === 1) {
		return (
			<div>
				<h1>{countries[0].name}</h1>
				 <p>capital {countries[0].capital}</p>
				  <p>population {countries[0].population}</p>
				  <h2>languages</h2>
				  <ul>
				  {
				  	countries[0].languages.map(item => {
				  		return <li key={item.name} >{item.name}</li>
				  	})
				  }
				  </ul>
				  <img src={countries[0].flag} alt={`${countries[0].name} flag`} width={125}/>
				  <Weather capital={countries[0].capital}/>
			</div>
		)
	}

	if (countries.length === 0 ) {
		return <p>Country not found</p>
	}
}



const App = () => {
	const [searchCountry, setSearchCountry] = useState('')
	const [listOfCountries, setListOfCountries] = useState([])
	const [filteredCountries, setFilteredCountries] = useState([])

	const handleFindChange = (event) => {
		setSearchCountry(event.target.value)
	}

	useEffect(() => {
		axios.get('https://restcountries.eu/rest/v2/all')
			.then(response => {
				setListOfCountries(response.data)
			}) 
	}, [])

	useEffect(() => {
		const filtered = listOfCountries.filter(item => {
			return item.name.includes(searchCountry)
		})
		setFilteredCountries(filtered)
	}, [listOfCountries, searchCountry])

	return (
		<Fragment>
			<div>
				find contries <input onChange={handleFindChange} value={searchCountry}/>
			</div>
			<Countries countries={filteredCountries} setFilter={setSearchCountry}/>
		</Fragment>
	)
}

export default App
