import { Header } from './components/Header'
import { Content } from './components/Content'
import { Total } from './components/Total'

export const App = () => {
  const course = 'Half Stack application development'
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14

  return (
    <div>
      <Header course={course} />
      <Content
      	partList={[part1, part2, part3]}
      	exerciseList={[exercises1, exercises2, exercises3]}
      />
      <Total
      	text='Number of exercises'
      	exercisesList={[exercises1, exercises2, exercises3]}
      />
    </div>
  )
}