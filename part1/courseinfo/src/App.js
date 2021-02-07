import { Header } from './components/Header'
import { Content } from './components/Content'
import { Total } from './components/Total'

export const App = () => {
  const course = 'Half Stack application development'
  const part1 = {
    name: 'Fundamentals of React',
    exercises: 10
  }
  const part2 = {
    name: 'Using props to pass data',
    exercises: 7
  }
  const part3 = {
    name: 'State of a component',
    exercises: 14
  }

  return (
    <div>
      <Header course={course} />
      <Content partList={[part1, part2, part3]} />
      <Total
      	text='Number of exercises'
      	exercisesList={[part1.exercises, part1.exercises, part1.exercises]}
      />
    </div>
  )
}