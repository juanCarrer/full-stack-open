import React, { useState, Fragment } from 'react'

const Statistic = ({ text, value }) => {
	return (
		<tr>
			<td>{ text }</td>
			<td>{ value }</td>
		</tr>
	)
}

const Statistics = ({ good, neutral, bad, total }) => {

	const calculateAverage = () => {
		const score = good - bad
		return score / total 
	}

	const calculatePositive = () => {
		return good * 100 / total
	}

	return (
		<table>
			<tbody>
				<Statistic text='good' value={good}/>
				<Statistic text='neutral' value={neutral}/>
				<Statistic text='bad' value={bad}/>
				<Statistic text='average' value={calculateAverage()}/>
				<Statistic text='positive' value={`${calculatePositive()}%`}/>
			</tbody>
		</table>
	)
}

export const Button = ({ title, handelClick }) => {
	return (
		<button onClick={handelClick}>{title}</button>
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
				<Button title='good' handelClick={() => setGood(good + 1)} />
				<Button title='neutral' handelClick={() => setNeutral(neutral + 1)} />
				<Button title='bad' handelClick={() => setBad(bad + 1)} />
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
