import { Header } from './components/Header'
import { Content } from './components/Content'
import { Total } from './components/Total'

export const App = () => {
  const course = 'Half Stack application development'
  const parts = [
    {
      name: 'Fundamentals of React',
      exercises: 10
    },
    {
      name: 'Using props to pass data',
      exercises: 7
    },
    {
      name: 'State of a component',
      exercises: 14
    }
  ]

  return (
    <div>
      <Header course={course} />
      <Content partsList={parts} />
      <Total text='Number of exercises' partsList={parts} />
    </div>
  )
}