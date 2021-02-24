export const Persons = ({ persons = []}) => {

	if (persons.length === 0) {
		return <h3>no persons Found...</h3>
	}

	return (
		<div>
		{
			persons.map(item => ( 
				<p key={item.id}>{item.name} {item.number}</p>
			))
		}
		</div>
	)
}