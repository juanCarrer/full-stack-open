export const Total = ({ text, partsList }) => {

	const calculateTotal = (list) => {
		return list.reduce((accumulator, { exercises }) => accumulator + exercises, 0)
	}

	return (
		<p>
			{text} {calculateTotal(partsList)}
		</p>
	)
}