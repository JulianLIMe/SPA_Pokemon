import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTipos } from "../store";
import "./FilterTipo.css"


import { filterTipo, filterAlfInv, filterAlf, filterExiste, filterCreado, filterAtack, filterAtackInv } from "../store";

export default () => {

    const dispatch = useDispatch();

    const tipos = useSelector((state) => state.tipos)
    useEffect(() => { dispatch(getTipos()) }, [])
    console.log("tipos", tipos)

    // Para filter tipos

    const [estadoFiltro, setEstadoFiltro] = useState([]);

    const onSubmitTipos = (e) => {
        e.preventDefault()
        dispatch(filterTipo(estadoFiltro))
    }

    function onChangeInput() {
        const valueInput = document.querySelector(".inputFiltro").value; // Acceso al valor del input tipo texto
        setEstadoFiltro(valueInput)
    }

    const sendForm = function () {
        const valueInput = document.querySelector(".inputFiltro").value;
        console.log("input", valueInput)
    }

    // para filter alafbetico

    const onSubmitAlf = (e) => {
        e.preventDefault()
        dispatch(filterAlf())
    }

    // para filter alafbetico inverso

    const onSubmitAlfInv = (e) => {
        e.preventDefault();
        dispatch(filterAlfInv())
    }

    // filtrado de ataque

    const onSubmitAtack = (e) => {
        e.preventDefault();
        dispatch(filterAtack())
    }

    // filtrado de ataque inverso

    const onSubmitAtackInv = (e) => {
        e.preventDefault();
        dispatch(filterAtackInv())
    }

    // para filtrar pokes que existen en API

    const onSubmitExisten = (e) => {
        e.preventDefault();
        dispatch(filterExiste());
    }

    // para filtrar pokes creados

    const onSubmitCreados = (e) => {
        e.preventDefault();
        dispatch(filterCreado());
    }

    return (
        <div className="todofiltro">
            
            {/* <p>Filtrado por tipos</p> */}
            <form onSubmit={onSubmitTipos}>
                <select className="inputFiltro" onChange={onChangeInput}>{tipos.map((e, i) => {
                    return <option key={i} value={e}>{e}</option>
                })}</select>
                {/* <input type="text" className="inputFiltro" onChange={onChangeInput}></input> */}
                <input type="submit" value="Filtrar" onClick={sendForm}></input>
            </form>

            {/* <p>Filtrado Alfabetico</p> */}
            <form onSubmit={onSubmitAlf}>
                <input type="submit" value="A-Z" />
            </form>

            {/* <p>Filtrado Alfabetico Inv</p> */}
            <form onSubmit={onSubmitAlfInv}>
                <input type="submit" value="Z-A" />
            </form>

            {/* <p>Filtrado Ataque</p> */}
            <form onSubmit={onSubmitAtack}>
                <input type="submit" value="Mayor Ataque" />
            </form>

            {/* <p>Filtrado Ataque Deviles</p> */}
            <form onSubmit={onSubmitAtackInv}>
                <input type="submit" value="Menor Ataque" />
            </form>

            {/* <p>Filtrado pokes existen en API</p> */}
            <form onSubmit={onSubmitExisten}>
                <input type="submit" value="API" />
            </form>

            {/* <p>Filtrado pokes creados</p> */}
            <form onSubmit={onSubmitCreados}>
                <input type="submit" value="DB" />
            </form>

        </div>

    )
}