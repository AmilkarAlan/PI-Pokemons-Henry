import style from './SearchBar.module.css'

const SearchBar = ({handleSubmit, handlerChange, search}) => {
  return (
    <form className={ style.searchbar_container }
    onSubmit={ (e) => handleSubmit(e) }>
    <input className={ style.input }
      type="search"
      value={ search }
      onChange={ (e) => handlerChange(e.target.value) } />
  </form>
  )
}

export default SearchBar