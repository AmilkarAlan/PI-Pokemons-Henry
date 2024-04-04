import * as actionsTypes from './action-type'
import axios from "axios"

export const getPokemons = () =>{
return async (dispatch) =>{
    dispatch({type: actionsTypes.GET_POKEMONS_START});
    try {
        const {data} = await axios.get("http://localhost:3001/pokedex/pokemons/");
        dispatch({
            type: actionsTypes.GET_POKEMONS_FULL,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: actionsTypes.GET_POKEMONS_ERROR,
            error: error.message
        })
    }
}
}

export const searchPokemon = (search) =>{
    return async (dispatch) => {
        try {
            const {data} = await axios.get("http://localhost:3001/pokedex/pokemons/search", {params:{name:search}})
            dispatch({
                type: actionsTypes.SEARCH_POKEMONS_START,
                payload: data
            })
        } catch (error) {
            throw new Error(error);
        }
    }
}

export const detailPokemon = (id) =>{
    return async (dispatch) => {
        try {
            const {data} = await axios.get("http://localhost:3001/pokedex/pokemons/search", {params:{id:id}})
            dispatch({
                type: actionsTypes.SEARCH_POKEMONS_START,
                payload: data
            })
        } catch (error) {
            throw new Error(error);
        }
    }
}

export const postPokemon = (pokemon) =>{
    return async (dispatch) => {
        try {
            const {data} = await axios.post("http://localhost:3001/pokedex/pokemons/", pokemon)
            dispatch({
                type: actionsTypes.POST_POKEMONS,
                payload: data
            })
        } catch (error) {
            throw new Error(error);
        }
    }
}

export const getTypes = () =>{
    return async (dispatch) => {
        try {
            const {data} = await axios.get("http://localhost:3001/pokedex/types/")
            dispatch({
                type: actionsTypes.GET_TYPES,
                payload: data
            })
        } catch (error) {
            throw new Error(error);
        }
    }
}