const Total = (props) => {
  return (
    <p>total of {props.total} exercises</p>
  )
}
  
const Part = ({part}) => {
  return (
    <p>{part.name} {part.exercises}</p>
  )
}
  
const Content = (props) => {
  console.log("content")
  console.log(props)
  return (
    <div>
      {props.parts.map(part =>
        <Part key={part.id} part={part} />
      )}
      <Total total={props.parts.reduce((sum, part) => sum + part.exercises, 0)} />
    </div>
  )
}
  
const Header = (props) => {
  console.log("header")
  console.log(props)
  return (
    <h2>{props.header}</h2>
  )
}
  
const Course = ({ course }) => {
  console.log("course")
  console.log(course)
  return (
    <div>
      <Header header={course.name} />
      <Content parts={course.parts} />
    </div>
  )
}

export default Course;