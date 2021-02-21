
const Header = ({ title }) => {
	return <h1>{title}</h1>
}

const CoursePart = ({ name, exercises }) => {
	return <p>{name} {exercises}</p>
}

const Course = ({ course = {} }) => {

	const totalExercises = course.parts.reduce((a,b) => {
		if (a.exercises) {
			return a.exercises + b.exercises
		}
		return a + b.exercises  
	})

	return (
		<div>
			<Header title={course.name} />
			<section>
				{
					course.parts && course.parts.map(item => {
						return <CoursePart key={item.id} name={item.name} exercises={item.exercises} />
					})
				}
				<p>total of {totalExercises} exercises</p>
			</section>
		</div>
	)
}

const App = () => {
	const course = {
		id: 1,
		name: 'Half Stack application development',
		parts: [
			{
				name: 'Fundamentals of React',
				exercises: 10,
				id: 1
			},
			{
				name: 'Using props to pass data',
				exercises: 7,
				id: 2
			},
			{
				name: 'State of a component',
				exercises: 14,
				id: 3
			},
			{
				name: 'Redux',
				exercises: 11,
				id: 4
			}
		]
	}

	return <Course course={course} />
} 


export default App