import { useEffect, useState } from 'react';
import style from './Detail.module.css'
import { useSelector } from 'react-redux'

import { useParams } from 'react-router-dom';
import PokeView from '../../components/PokeView/PokeView';
import PokeDetail from '../../components/PokeDetail/PokeDetail';

const Detail = () => {
    const [ detail, setDetail ] = useState({});
    const [ pokeView, setPokeView ] = useState({
        img: "", name: ""
    });
    const pokemons = useSelector(state => state.pokemons);
    const { id } = useParams();
    useEffect(() => {
        setDetail(pokemons[ id - 1 ])
        console.log(pokemons[1024]);

        if (detail) {
            setPokeView({ img: detail.imageAnimated, name: name })
        }
    }, [ detail, pokemons ])
    return (
        <div className={ style.detail_main }>
            { detail ? (<><PokeView pokeInfo={ pokeView } /> <PokeDetail pokeInfo={ detail } /></>) : <h1>...Cargando</h1> }
        </div>
    )
}

export default Detail