import Part from "./Part";
const Content = ({course}) => {
    const courseParts = course.parts;
  return (
    <div>  
        {courseParts.map((part)=>(
            <Part key={part.id} part={part.name} exercises={part.exercises}/>
        ))}
    </div>
  )
}

export default Content