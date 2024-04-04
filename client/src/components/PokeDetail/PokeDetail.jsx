import PokeCard from '../PokeList/PokeCard/PokeCard'
import style from './pokeDetail.module.css'

const pokeDetail = ({ pokeInfo }) => {

    return (
        <>
            { pokeInfo.specie ? (
                <div className={ style.detail_container }>
                    <div className={ style.card_container }>
                        <PokeCard
                            specie={ pokeInfo.specie.charAt(0).toUpperCase() + pokeInfo.specie.slice(1) }
                            id={ pokeInfo.id }
                            image={ pokeInfo.image }
                            seleccionada={ pokeDetail } />
                    </div>
                    <div className={ style.detail_wrapper }>
                        <p>Peso: { pokeInfo.weight } Kg</p>
                        { pokeInfo.height > 9 ? <p>Altura: { pokeInfo.height } M</p> : <p>Altura: 0,{ pokeInfo.height } M</p> }
                        <div className={ style.stats }>


                            <p>{ pokeInfo.stats[ 0 ].name }: { pokeInfo.stats[ 0 ].base_stat }</p>
                            <p> { pokeInfo.stats[ 1 ].name }: { pokeInfo.stats[ 1 ].base_stat }</p>
                            <p> { pokeInfo.stats[ 2 ].name }: { pokeInfo.stats[ 2 ].base_stat }</p>
                            <p> { pokeInfo.stats[ 5 ].name }: { pokeInfo.stats[ 5 ].base_stat }</p>

                        </div>

                        <div className={ style.types }>
                            <p>Tipos:</p>
                            { pokeInfo.types.map((type) => <p>{ type.name.charAt(0).toUpperCase() + type.name.slice(1) }</p>) }
                        </div>
                    </div>
                </div>

            ) : null }
        </>

    )
}

export default pokeDetail