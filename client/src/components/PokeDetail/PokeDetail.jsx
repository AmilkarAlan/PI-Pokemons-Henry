import PokeCard from '../PokeList/PokeCard/PokeCard'
import style from './pokeDetail.module.css'

const pokeDetail = ({ pokeInfo }) => {

    return (
        <>
            { pokeInfo.name ? (
                <div className={ style.detail_container }>
                    <div className={ style.card_container }>
                        <PokeCard
                            name={ pokeInfo.name.charAt(0).toUpperCase() + pokeInfo.name.slice(1) }
                            id={ pokeInfo.id }
                            image={ pokeInfo.image }
                            seleccionada={ pokeDetail } />
                    </div>
                    <div className={ style.detail_wrapper }>
                        <p>Peso: { pokeInfo.weight } Kg</p>
                        { pokeInfo.height > 9 ? <p>Altura: { pokeInfo.height } M</p> : <p>Altura: 0,{ pokeInfo.height } M</p> }
                        <div className={ style.stats }>
                            <p>Hp base: { pokeInfo.base_hp }</p>
                            <p>Ataque base: { pokeInfo.base_attack }</p>
                            <p>Defensa base: { pokeInfo.base_defense }</p>
                            <p>Velocidad base: { pokeInfo.base_speed }</p>
                        </div>
                        <div className={ style.types }>
                            <p>Tipos:</p>
                            { pokeInfo.type.map((type) => <p>{ type.name.charAt(0).toUpperCase() + type.name.slice(1) }</p>) }
                        </div>
                    </div>
                </div>

            ) : null }
        </>

    )
}

export default pokeDetail