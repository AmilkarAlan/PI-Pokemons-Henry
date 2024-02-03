import style from './Loading.module.css'
import loadingIcon from "../../assets/loadingIcon.gif"
import pokeIcon from "../../assets/pokebolaBlack.svg"


const Loading = () => {
    return (
        <div className={ style.loading_container }>
            <div className={ style.loading_icon_container }>
                <img className={ style.iconLoading } src={ loadingIcon } alt="icon" />
            </div>
            <div className={ style.text_loading_container }>
                <h2>Cargando </h2>
                <img className={ style.pokeIcon_loading } src={ pokeIcon } alt="" />
                <img className={ style.pokeIcon_loading } src={ pokeIcon } alt="" />
                <img className={ style.pokeIcon_loading } src={ pokeIcon } alt="" />
            </div>
        </div>

    )
}

export default Loading