

const LanguageList = ({languages}) => {

    const languageItems = Object.entries(languages).map(([code, name]) => (
        <li key={code}>{name}</li>
    ));
  return (
    <ol>
        {languageItems}
    </ol>
  )
}

export default LanguageList