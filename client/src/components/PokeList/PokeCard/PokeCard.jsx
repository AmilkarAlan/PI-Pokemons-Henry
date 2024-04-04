import React from 'react'
import style from './PokeCard.module.css'
import pokeIcon from "../../../assets/pokebolaBlack.svg"
import pokeIconW from "../../../assets/pokebolaWhite.svg"

const PokeCard = ({ specie, id, image, select, animatedImg, onSelect, seleccionada  }) => {
    return (
        <li className={ style.card_container } onClick={onSelect}>

            <img className={ style.mini_image } src={ image } alt={ name } />
            <div className={  seleccionada ? (style.active_left + " " + style.card_left_side): style.card_left_side }>

                <p> N.° { id > 9 ? "00" + id : "000" + id }</p>
            </div>

            <div className={ seleccionada ? (style.active + " " + style.card_rigth_side): style.card_rigth_side}>

                <p>{ specie }</p>
                <div className={ style.icon_container }>
                     {seleccionada ? <img className={ style.poke_icon } src={ pokeIconW } alt="icon" /> : <img className={ style.poke_icon } src={ pokeIcon } alt="icon" /> }

                </div>
            </div>


        </li>
    )
}

export default PokeCard