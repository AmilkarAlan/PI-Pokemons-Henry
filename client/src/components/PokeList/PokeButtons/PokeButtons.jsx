import style from './PokeButtons.module.css'

const PokeButtons = ({changePage, hasNextPage, hasPrevPage, setFilter,createPoke}) => {
    return (
        <div className={style.buttons_container}>
            <button
                disabled={ !hasPrevPage }
                onClick={ () => changePage(false) }>
                Anterior
            </button>
            <button onClick={()=> setFilter(true)}>
                Filtros
            </button>
            <button onClick={()=> createPoke(true)}>
                Crear Poke
            </button>
            <button
                disabled={ !hasNextPage }
                onClick={ () => changePage(true) }>
                Siguiente
            </button>
        </div>
    )
}

export default PokeButtons