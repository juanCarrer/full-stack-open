import { deletePerson } from '../../services/phonebook'

export const Persons = ({ persons = [], updatePersons}) => {

	const handleClick = (id, name) => {
		if (window.confirm(`delete ${name} ?`)) {
			deletePerson(id)
				.then(response => {
					updatePersons(persons.filter(item => item.id !== id))
				})
				.catch(err => {
					console.error(err)
				})
		}
 	}

	if (persons.length === 0) {
		return <h3>no persons Found...</h3>
	}

	return (
		<div>
		{
			persons.map(item => (
				<div key={item.id}>
					{item.name} {item.number}
					<button onClick={() => { handleClick(item.id, item.name) }}>
						delete
					</button>
				</div>
			))
		}
		</div>
	)
}