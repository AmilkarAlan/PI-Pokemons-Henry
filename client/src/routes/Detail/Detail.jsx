import { useEffect, useState } from 'react';
import style from './Detail.module.css'
import { useSelector } from 'react-redux'

import { useParams } from 'react-router-dom';
import PokeView from '../../components/PokeView/PokeView';
import PokeDetail from '../../components/PokeDetail/PokeDetail';
import Loading from "../../components/Loading/Loading"

const Detail = () => {
    const [ detail, setDetail ] = useState({});
    const [ pokeView, setPokeView ] = useState({
        img: "", specie: ""
    });
    const pokemons = useSelector(state => state.pokemons);
    const { id } = useParams();
    useEffect(() => {
        setDetail(pokemons[ id - 1 ])
        if (detail) {
            setPokeView({ img: detail.gifImage, specie: detail.specie })
        }
    }, [ detail, pokemons ])
    return (
        <div className={ style.detail_main }>
            { detail
                ?
                (
                    <>
                        <PokeView pokeInfo={ pokeView } />
                        <PokeDetail pokeInfo={ detail } />
                    </>
                )
                :
                <Loading /> }
        </div>
    )
}

export default Detail