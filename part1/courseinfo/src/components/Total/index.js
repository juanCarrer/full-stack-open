export const Total = ({ text, exercisesList }) => {
	return (
		<p>
			{text} {exercisesList.reduce((accumulator, currentValue) => accumulator + currentValue)}
		</p>
	)
}