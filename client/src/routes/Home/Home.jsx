import { useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'
import style from "./Home.module.css"
import PokeList from '../../components/PokeList/PokeList'
import PokeView from '../../components/PokeView/PokeView'
import { useDispatch, useSelector } from 'react-redux'
import pokeIcon from "../../assets/pokebolaBlack.svg"
import searchIcon from "../../assets/searchIcon.svg"
import { searchPokemon } from '../../redux/action'
import SearchBar from '../../components/SearchBar/SearchBar'
import PokeCard from '../../components/PokeList/PokeCard/PokeCard'


const Home = ({loading}) => {

  const pokemons = useSelector((state) => state.pokemons);
  const results = useSelector((state) => state.pokeDetail)
  const dispatch = useDispatch();

  const [ pokeView, setPokeView ] = useState({
    img: "", name: "", id: ""
  })
  const [ searchResults, setSearchResults ] = useState(false)
  const [ seleccionada, setSeleccionada ] = useState("");
  const [ searchActive, setSearchActive ] = useState(false);
  const [ search, setSearch ] = useState("")

  const handlerChange = (value) => {
    setSearch(value);
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(searchPokemon(search.toLowerCase()))
    setSearchResults(true)
  }

  useEffect(()=>{
    seleccionarPoke(results.id, results.name, results.imageAnimated)
    setSearch("")
  },[results])

  const seleccionarPoke = (id, name, img) => {
    setSeleccionada(id);
    setPokeView({ img, name, id })
  }

  const abrirBusqueda = () => {
    if (!searchActive) {
      setSearchActive(true);
    } else {
      setSearchActive(false);
      setSearch("")
    }
  }

  if (loading){
    return (
      <div className={ style.home_grid }>
         <h1>
          Cargando...
         </h1>
      </div>
    )
  }
  return (
    <div className={ style.home_grid }>
      <header className={ style.header }>
        <div className={ style.title_count }>
          <h1>Pokédex</h1>
          <button className={ style.search_container } onClick={ () => abrirBusqueda() }>
            <img className={ style.search_icon } src={ searchIcon } alt="icon" />
          </button>
          <div className={ style.counter_container }>
            <div className={ style.icon_container }>
              <img className={ style.pokeIcon } src={ pokeIcon } alt="icon" />
            </div>
            <p>{ pokemons.length }</p>
          </div>
        </div>
        <div className={ style.filter_info }></div>
      </header>
      { searchActive
        ?
        <>
          <SearchBar
            handleSubmit={ handleSubmit }
            handlerChange={ handlerChange }
            search={ search } />

          { searchResults
            ?
            (<div className={ style.results_container }>
              <PokeCard
                name={ results.name }
                id={ results.id }
                image={ results.image }
                seleccionada={ seleccionada }
              /> </div>)
            : false
  }




        </>
        :
        null }

      <PokeView pokeInfo={ pokeView } />
      <PokeList
        pokemons={ pokemons }
        pokeSelection={ setPokeView }
        onSelect={ seleccionarPoke }
        seleccionada={ seleccionada } />
      {/* <Outlet/> */ }
    </div>
  )
}

export default Home