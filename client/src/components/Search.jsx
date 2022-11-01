import React, { useEffect, useState } from "react"
import { useDispatch } from "react-redux";
import { searchPokemon } from "../store"; // searchPokemons es la accion que se va dispachar (linea 16)
import { getPokemons } from "../store";
import { Link } from "react-router-dom";
import "./Search.css"

export default () => {

    const [stateSearch, setStateSearch] = useState([]); // Creo un estado local
    
    const dispatch = useDispatch();
    
    function onSubmit(e) {
        e.preventDefault();
        dispatch(searchPokemon(stateSearch))
    }

    function onChangeInput() {
        const valueInput = document.querySelector(".inputClient").value; // Acceso al valor del input tipo texto
        setStateSearch(valueInput) // se actualiza/state el estado local
    }

    function sendForm() {
        const valueInput = document.querySelector(".inputClient").value; // Acceso al valor del input tipo texto
        console.log(valueInput)
        document.querySelector(".inputClient").value = "";
    }

    function getPokes(e) {
        e.preventDefault()
        dispatch(getPokemons())
    }

    return (
        <div className="buscadorgeneral" onSubmit={onSubmit}> {/* onSubmit se ejecuta cuando se cliquea el input tipo submit */}
            
            <form >
                <button className="allPokes" onClick={getPokes}>ALL Pokemones</button>
                <input className="inputClient" type="text" onChange={onChangeInput} placeholder="Nombre" />
                <input className="inputBuscar" type="submit" value="✔" onClick={sendForm} />
                
            </form>
            <Link to="/create"> <button className="crearPoke">Crear Poke</button> </Link>
        </div>
    )
}