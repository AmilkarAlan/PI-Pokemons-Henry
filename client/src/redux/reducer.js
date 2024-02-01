import * as actionsType from './action-type'

const initialState = {
    pokemons: [],
    pokeDetail: [],
    types:[],
    loading: true,
    error: null
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionsType.GET_POKEMONS_START:
            return {
                ...state,
                loading: true,

            }
        case actionsType.GET_POKEMONS_FULL:
            return {
                ...state,
                loading: false,
                pokemons: [...action.payload]
            }

        case actionsType.GET_POKEMONS_ERROR:
            return {
                ...state,
                loading: false,
                error: action.error
            }

        case actionsType.SEARCH_POKEMONS_START:
            return {
                ...state,
                pokeDetail:  action.payload 
            }

        case actionsType.POST_POKEMONS:
            return {
                ...state,
                pokemons: [...state.pokemons, action.payload]
            }

        case actionsType.GET_TYPES:
            return {
                ...state,
                types: action.payload
            }

        default:
            return state;
    }
}

export default reducer