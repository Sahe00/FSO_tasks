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

const Total = ({ totalParts }) => {
    var calculateTotal = totalParts.reduce( (s, p) => {
        console.log('what is happening', s, p)
        return s + p.exercises
    }, 0)

    
    return (
    <p><b>Number of exercises {calculateTotal}</b></p>
    );
}

const Course = (props) => {
    return (
        <div>
            <Header course={props.course.name} />
            <Content parts={props.course.parts} />
            <Total totalParts={props.course.parts}/>
        </div>
    )
}

export default Course;