import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPokemons } from "../store"; // getPokemons es la accion que se va dispachar
import { NavLink } from "react-router-dom"
import noPikachu from "../images/noPikachu.gif"
import logoWhpp from "../images/logoWhpp.png"
import linkedIn from "../images/linkedIn.png"
import "./Items.css";

import Paginator from "./Paginator"
import Item from "./Item";
import { details } from "../store";

export default () => {

    //let estado = useSelector((state) => state.pokemons) // useSelector permite extraer datos del estado
    let estadoCopy = useSelector((state) => state.pokemonsCopy)

    const dispatch = useDispatch() // El hook useDispatch devuelve una referencia a la funcion dispatch de la store de Redux, puede usarlo para enviar acciones (dispachar acciones) para actualizar el estado
    useEffect(() => { if (estadoCopy.length === 0) { dispatch(getPokemons()) } }, []) // un hook, como por ej. useEffect, no puede estar dentro de un condicional, todo hook de react debe estar por encima de cualquier condicional
    //console.log("estado", estado);
    console.log("estadoCopy", estadoCopy)

    useEffect(() => { dispatch(details()) }, []) // restablezco el estado de detalles

    // PAGINADO
    const [currentPage, setCurrentPage] = useState(1);
    const pokesPerPage = 12;
    let lastPokeIndex = currentPage * pokesPerPage;
    let firstPokeIndex = lastPokeIndex - pokesPerPage;
    let currentPokes = estadoCopy.slice(firstPokeIndex, lastPokeIndex);
    console.log("currentPokes", currentPokes);

    const paginado = (pageNum) => {
        setCurrentPage(pageNum)
    }

    if (currentPokes.length === 0) {
        currentPokes = [{
            Nombre: "sin coincidencias",
            Imagen: noPikachu
        }]
    }

    return (
        <div className="contendedor">

            <div className="Paginado">
                <Paginator
                    pokesPerPage={pokesPerPage}
                    pokes={estadoCopy.length}
                    paginado={paginado}
                />
            </div>
            
            <div className="Grillapokemons"  >
                {Array.isArray(currentPokes) ?    /* compruevo si el estado es ó no un array */
                    currentPokes.map((e, i) => {
                        return (
                            <NavLink key={i} to={`/details/${e.Nombre}`} style={{ textDecoration: "none" }} >
                                <Item
                                    Nombre={e.Nombre}
                                    Imagen={e.Imagen}
                                    Tipo={e.Tipo}
                                />
                            </NavLink>
                        )
                    }) :
                    <div>
                        <h1>Sin Coincidencias</h1>
                        <img src={noPikachu} alt="" />
                    </div>
                }
            </div>

            <div className="creador">
                <p>linero.julian.andres@gmail.com</p>
                <a href="https://api.whatsapp.com/send?phone=3022994106&text=Hey,%20qu%C3%A9%20tal%20?" target="_blank" rel="noopener noreferrer" >
                    <img src={logoWhpp} alt="whatApp" height={"50px"} width={"50px"}  />
                </a>
                <a href="https://www.linkedin.com/in/julian-linero-85a307207/" target="_blank" rel="noopener noreferrer" >
                    <img src={linkedIn} alt="linkedIn" height={"50px"} width={"70px"}  />
                </a>
            </div>

        </div>
    )
}