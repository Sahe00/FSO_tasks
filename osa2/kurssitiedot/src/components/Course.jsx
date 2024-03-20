const Header = (props) => {
    return (
      <>
    <h1>{props.course}</h1>
      </>
    );
}
  
const Part = (props) => {
    return (
    <p>
    {props.part.name} {props.part.exercises}
    </p>
    );
}
  
const Content = (props) => {
    return (
    <div>
        <Part part={props.parts[0]} />
        <Part part={props.parts[1]} />
        <Part part={props.parts[2]} />
    </div>
    );
}

const Total = (props) => {
    return (
    <p>Number of exercises {props.exercises1 + props.exercises2 + props.exercises3}</p>
    );
}

const Course = (props) => {
    return (
        <div>
            <Header course={props.course.name} />
            <Content parts={props.course.parts} />
        </div>
    )
}

export default Course;