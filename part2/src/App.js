
const Header = ({ title }) => {
	return <h1>{title}</h1>
}

const CoursePart = ({ name, exercises }) => {
	return <p>{name} {exercises}</p>
}

const Course = ({ course = {} }) => {
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

const App = () => {
	const courses = [
		{
			name: 'Half Stack application development',
			id: 1,
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
		}, 
		{
			name: 'Node.js',
			id: 2,
			parts: [
				{
					name: 'Routing',
					exercises: 3,
					id: 1
				},
				{
					name: 'Middlewares',
					exercises: 7,
					id: 2
				}
			]
		}
	]

	return (
		<div>
			{
				courses && courses.map(item => {
					return <Course key={item.id} course={item}/>
				}) 
			}
		</div>
	)
} 


export default App