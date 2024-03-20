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
        <Part part={props.parts[3]} />
    </div>
    );
}

const Total = (props) => {
    return (
    <p><b>Number of exercises {props.exercises1 + props.exercises2 + props.exercises3 + props.exercises4}</b></p>
    );
}

const Course = (props) => {
    return (
        <div>
            <Header course={props.course.name} />
            <Content parts={props.course.parts} />
            <Total exercises1={props.course.parts[0].exercises} exercises2={props.course.parts[1].exercises} exercises3={props.course.parts[2].exercises} exercises4={props.course.parts[3].exercises}/>
        </div>
    )
}

export default Course;