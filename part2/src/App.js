import React, { useState, useEffect, Fragment } from 'react'
import axios from 'axios'

const Countries = ({ countries }) => {

	if (countries.length > 10) {
		return <p>Too many countries, specify another filter</p>
	}

	if (countries.length > 1 && countries.length <= 10) {
		return (
			<div>
			{
				countries.map(item => {
					return <p key={item.name}>{item.name}</p>
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
				find contries <input onChange={handleFindChange} />
			</div>
			<Countries countries={filteredCountries} />
		</Fragment>
	)
}

export default App
