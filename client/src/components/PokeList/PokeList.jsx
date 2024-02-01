import { useState } from 'react'
import style from "./PokeList.module.css"
import PokeCard from './PokeCard/PokeCard';
import PokeButtons from './PokeButtons/PokeButtons';
import PokeForm from '../PokeForm/PokeForm';

import FilterContainer from "../Filters/FilterContainer/FilterContainer"


const PokeList = ({ pokemons, pokeSelection, onSelect, seleccionada }) => {
  const [ page, setPages ] = useState(1);
  const [ pokemonsPerPage, setPokemonsPerPage ] = useState(12);
  const [ filterActive, setFilterActive ] = useState(false);
  const [ createPoke, setCreatePoke ] = useState(false)

  const totalPages = Math.ceil(pokemons.length / pokemonsPerPage);

  const changePage = (next) => {
    if (next) {
      setPages(page + 1);
    } else {
      setPages(page - 1);
    }
  }
  
  const activeFilters = () => {
    if (filterActive) {
      setFilterActive(false)
    } else {
      setFilterActive(true)
    }
  }

  const activeCreate = () => {
    if (createPoke) {
      setCreatePoke(false)
    } else {
      setCreatePoke(true)
    }
  }
  const indexFirst = (page - 1) * pokemonsPerPage;
  const indexLast = indexFirst + pokemonsPerPage;
  const currentPokemons = pokemons.slice(indexFirst, indexLast);
  const hasPrevPage = page > 1;
  const hasNextPage = page < totalPages;

  return (
    <div className={ style.list_container }>
      <div className={ style.list_wrapper }>
        <div className={ style.list_box }>
          { createPoke ? <PokeForm /> : (
            <ul className={ style.list }>
              { currentPokemons.map((poke, i) => {
                let name = poke.name.charAt(0).toUpperCase() + poke.name.slice(1);
                return (

                  <PokeCard
                    key={ i }
                    id={ poke.id }
                    name={ name }
                    image={ poke.image }
                    animatedImg={ poke.imageAnimated }
                    select={ pokeSelection }
                    seleccionada={ poke.id === seleccionada }
                    onSelect={ () => onSelect(poke.id, poke.name, poke.imageAnimated) } />



                )
              }) }
            </ul>
          ) }

        </div>
        { filterActive ? <FilterContainer /> : null }
        <PokeButtons changePage={ changePage } hasNextPage={ hasNextPage } hasPrevPage={ hasPrevPage } setFilter={ activeFilters } createPoke={activeCreate}/>
      </div>

    </div>

  )
}

export default PokeList