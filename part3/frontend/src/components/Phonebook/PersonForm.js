export const PersonForm = ({ handleSubmit, handleName, name, handleNumber, number }) => {
	return (
		<form onSubmit={handleSubmit}>
			<div>
				name: <input onChange={handleName} value={name}/>
			</div>
			<div>
				number: <input onChange={handleNumber} value={number}/>
			</div>
			<div>
				<button type='submit'>add</button>
			</div>
		</form>
	)
}