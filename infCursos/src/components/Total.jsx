const Total = ({course}) => {
    const array = course.parts;
    const sum = array.reduce((sum,part)=> sum + part.exercises,0)
  return (
    <>
        <p><strong>Total of exercises: {sum}</strong></p>
    </>

  )
}

export default Total