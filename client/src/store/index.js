import { applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";  
import axios from "axios";
import { composeWithDevTools } from '@redux-devtools/extension';

const inicialState = {
    pokemons: [],
    pokemonsCopy: [],
    detailsPoke: [],
    tipos: []
};

function reducer(state = inicialState, action) {
    switch (action.type) {
        case GET_POKEMONS:
            return {
                ...state,
                pokemons: action.payload,
                pokemonsCopy: action.payload
            }
        case SEARCH_POKEMON:
            return {
                ...state,
                pokemonsCopy: action.payload
            }
        case DETAILS: 
                return {
                    ...state,
                    detailsPoke: action.payload,
            }
        case FILTER_TIPOS:
            const pokes = state.pokemonsCopy
            const pokesTipos = pokes.filter((e) => (
                e.Tipo[0] === action.payload || e.Tipo[1] && e.Tipo[1] === action.payload || typeof(e.Tipo) === "string" && e.Tipo === action.payload
            ))
                return {
                    ...state,
                    pokemonsCopy: pokesTipos,
                }
        case FILTER_ALF:
            const pokesAlf = ordenar(state.pokemonsCopy, "Nombre", false)
            return {
                ...state,
                pokemonsCopy: [...pokesAlf]
            }
        case FILTER_ALF_INV:
            const pokesAlfInv = ordenar(state.pokemonsCopy, "Nombre", true)
            return {
                ...state,
                pokemonsCopy: [...pokesAlfInv]
            }
        case FILTER_ATACK:
            const pokesAtack = ordenar(state.pokemonsCopy, "Ataque", true)
            console.log(pokesAtack)
            return {
                ...state,
                pokemonsCopy: [...pokesAtack]
            }
        case FILTER_ATACK_INV:
            const pokesAtackInv = ordenar(state.pokemonsCopy, "Ataque", false)
            return {
                ...state,
                pokemonsCopy: [...pokesAtackInv]
            }
        case FILTER_EXISTE:
            const pokesExisten = state.pokemonsCopy.filter((e) => typeof (e.Id) === "number")
            return {
                ...state,
                pokemonsCopy: [...pokesExisten]
            }
        case FILTER_CREADO:
            const pokesCreados = state.pokemonsCopy.filter((e) => typeof (e.Id) === "string")
            return {
                ...state,
                pokemonsCopy: [...pokesCreados]
            }
        case GET_TIPOS:
            return {
                ...state,
                tipos: action.payload
            }
        case POST_POKE:
            return {
                ...state
            }     
        default:
            return state
    }
}


const url = "http://localhost:3001/pokemons/";

const GET_POKEMONS = "get_pokemons";

export function getPokemons() {  
    return function (dispatch) { 
        axios.get(url)
            .then((dataPromise) => {
                dispatch({
                    type: GET_POKEMONS,
                    payload: dataPromise.data
                })
            }).catch((err) => {
                console.log(err)
            })
    }
}

const SEARCH_POKEMON = "search_pokemon"; 

export function searchPokemon(nomPoke) {
    return (
        function (dispatch) {
            axios.get("http://localhost:3001/pokemons/?name=" + nomPoke)
                .then((dataPromise) => {
                    dispatch({
                        type: SEARCH_POKEMON,
                        payload: dataPromise.data
                    })
                }).catch((err) => {
                    console.log(err)
                })
        }
    )
}

const DETAILS = "details_poke"

export function details(namePoke) {
    if (namePoke) {
        return (
            function (dispatch) {
                axios.get("http://localhost:3001/pokemons/?name=" + namePoke)
                    .then((dataPromise) => {
                        dispatch({
                            type: DETAILS,
                            payload: dataPromise.data
                        })
                    }).catch((err) => {
                        console.log(err)
                    })
            }
        )
    }else {
        return (
            function (dispacha) {
                dispacha({
                    type: DETAILS,
                    payload: []
                })
            }
        )
    }
}

//funcion para ordenamientos
function ordenar(lista, atributo, reversa) {
    function comparador(a,b) {

        let valorA = typeof(a) === "string" ? a[atributo].toLowerCase() : a[atributo]
        let valorB = typeof(b) === "string" ? b[atributo].toLowerCase() : b[atributo]

        if (valorA < valorB) {
            if (reversa){ return 1 }
            return -1
        }
        if (valorA > valorB) {
            if (reversa){ return -1 }
            return 1
        }
        return 0;
    }
    return lista.sort(comparador)
}

const FILTER_TIPOS = "filter_tipos"

export function filterTipo(tipoPoke) {
    return ({
        type:FILTER_TIPOS,
        payload: tipoPoke
    })
}

const FILTER_ALF = "filter_alf"

export function filterAlf() {
    return ({
        type: FILTER_ALF
    })
}

const FILTER_ALF_INV = "filter_alf_inv"

export function filterAlfInv() {
    return ({
        type: FILTER_ALF_INV
    })
}

const FILTER_ATACK = "filter_atack"

export function filterAtack() {
    return ({
        type: FILTER_ATACK
    })
}

const FILTER_ATACK_INV = "filter_atack_inv"

export function filterAtackInv() {
    return ({
        type: FILTER_ATACK_INV
    })
}

const FILTER_EXISTE = "filter_existe"

export function filterExiste() {
    return ({
        type: FILTER_EXISTE
    })
}

const FILTER_CREADO = "filter_creado"

export function filterCreado() {
    return ({
        type: FILTER_CREADO
    })
}

const GET_TIPOS = "get_tipos"

export function getTipos() {
    return (
        function (dispatch) {
            axios.get("http://localhost:3001/types")
                .then((dataPromise) => {
                    dispatch({
                        type: GET_TIPOS,
                        payload: dataPromise.data
                    })
                }).catch((err) => {
                    console.log(err)
                })
        }
    )
}

const POST_POKE = "post_poke";

export function postPoke(newPoke) {
    return (
        function () {
            axios.post("http://localhost:3001/pokemons/", newPoke)
            .then((dataPromise) => {
                console.log(dataPromise.data)
            }).catch((err) => {
                console.log(err)
            })
        }
    )
}

const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)))
export default store;

