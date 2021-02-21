const Header = ({ title }) => {
	return <h2>{title}</h2>
}

const CoursePart = ({ name, exercises }) => {
	return <p>{name} {exercises}</p>
}

export Course = ({ course = {} }) => {
	const { parts = [], name } = course

	const totalExercises = parts.reduce((a,b) => {
		if (a.exercises) {
			return a.exercises + b.exercises
		}
		return a + b.exercises  
	})

	return (
		<div>
			<Header title={name} />
			<section>
				{
					parts && parts.map(item => {
						return <CoursePart key={item.id} name={item.name} exercises={item.exercises} />
					})
				}
				<p><b>total of {totalExercises} exercises</b></p>
			</section>
		</div>
	)
}