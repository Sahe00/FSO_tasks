const Header = (props) => {
    return (
      <>
    <h2>{props.course}</h2>
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
        {props.parts.map(part => {
            return (
                <div key={part.id}>
                    {console.log("this is in content", {part})} 
                    <Part part={part} />
                </div>
                );
            })}
    </div>
    );
}

const Total = ({ totalParts }) => {
    var calculateTotal = totalParts.reduce( (s, p) => {
        // console.log('what is happening', s, p)
        return s + p.exercises
    }, 0)

    
    return (
    <p><b>Total of exercises {calculateTotal}</b></p>
    );
}

const Course = (props) => {
    return (
    <>
        <h1> Web development curriculum </h1>
        <div>
            {props.course.map(course => {
                return (
                    <div key={course.id}> 
                        <Header course={course.name} />
                        <Content parts={course.parts} />
                        <Total totalParts={course.parts}/>
                    </div>
                );
            })}
        </div>
    </>
    )
}

export default Course;