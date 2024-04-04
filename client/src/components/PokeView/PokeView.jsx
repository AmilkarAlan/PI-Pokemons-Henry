import { Link, useParams } from 'react-router-dom';
import style from "./PokeView.module.css"

const PokeView = ({ pokeInfo }) => {
    const { id } = useParams();
    return (
        <div className={ style.view_container }>
            <div className={ style.link_container }>

                { !id ? <Link className={style.link}to={ `/detail/${pokeInfo.id}` }>Ver detalles</Link> : <Link to={ "/pokemons" }>Regresar</Link> }
            </div>
            <div className={ style.image_container }>
                <img src={ pokeInfo.img } alt={ pokeInfo.specie } />
            </div>
        </div>
    )
}

export default PokeView