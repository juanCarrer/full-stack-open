import React, { useState, Fragment } from 'react'

const Statistics = ({ good, neutral, bad, total }) => {

	const calculateAverage = () => {
		const score = good - bad
		return score / total 
	}

	const calculatePositive = () => {
		return good * 100 / total
	}

	return (
		<div>
			<p>good {good}</p>
			<p>neutral {neutral}</p>
			<p>bad {bad}</p>
			<p>all {total}</p>
			<p>average {calculateAverage()}</p>
			<p>positive {calculatePositive()}%</p>
		</div>
	)
}


export const App = () => {
	const [good, setGood] = useState(0)
	const [neutral, setNeutral] = useState(0)
	const [bad, setBad] = useState(0)

	const total = good + neutral + bad

	return (
		<Fragment>
			<div>
				<h1>Give Feedback</h1>
				<button onClick={() => setGood(good + 1)}>good</button>
				<button onClick={() => setNeutral(neutral + 1)}>neutral</button>
				<button onClick={() => setBad(bad + 1)}>bad</button>
			</div>
			<h1>Statics</h1>
			{
				total !== 0
				? <Statistics good={good} neutral={neutral} bad={bad} total={total}/>	
				: <p>no Feedback given</p>
			}
					
		</Fragment>
	)
}
