export default function AlphabetCard ({ letter, filter }) {
  const renderLetter = () => {
    switch (filter) {
      case 'maiusculas':
        return letter.maiuscula
      case 'minusculas':
        return letter.minuscula
      default:
        return `${letter.maiuscula} ${letter.minuscula}`
    }
  }

  return (
    <div className='letra-card'>
      <div className='letra-cirilica'>{renderLetter()}</div>
      <div className='letra-latin'>{letter.latin || '-'}</div>
      <div className='pronuncia'>{letter.pronuncia}</div>
      <div className='exemplo'>{letter.exemplo}</div>
    </div>
  )
}
