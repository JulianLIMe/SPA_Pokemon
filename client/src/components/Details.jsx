import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { details } from "../store";
import pikachuCargando from "../images/pikachuCargando.gif"
import "./Details.css"


export default () => {

    let { name } = useParams();
    console.log("params path", name);

    const dispatch = useDispatch();

    useEffect(() => { dispatch(details(name)) }, [dispatch])

    let poke = useSelector((state) => state.detailsPoke)
    console.log(poke)

    return (
        <div className="todoDetalles">
            <h3 className="tituloDetalle">Detalle</h3>
            {
                poke[0] ?
                    <div className="detalleGeneral">
                        <div className="targetaDetalles">
                            <h1>{poke[0].Nombre}</h1>
                            <img width={400} height={400} src={poke[0].Imagen} alt="" />
                        </div>
                        <h3 className="estadisticas">Estadisticas</h3>
                        <div className="datosPokemon">
                            <p>Id: {poke[0].ID}</p>
                            <p>Vida: {poke[0].Vida}</p>
                            <p>Ataque: {poke[0].Ataque}</p>
                            <p>Defensa: {poke[0].Defensa}</p>
                            <p>Altura: {poke[0].Altura}</p>
                            <p>Peso: {poke[0].Peso}</p>
                            <div className="estadisticaTipo">Tipo: <div>
                                {
                                    Array.isArray(poke[0].Tipo) ?
                                        poke[0].Tipo.map((e, i) => { return (<p key={i}>{e}</p>) }) :
                                        <p>{poke[0].Tipo}</p>
                                }
                            </div>
                            </div>

                        </div>

                    </div> :
                    <div>
                        <h2>Loading</h2>
                        <img src={pikachuCargando} height="100px" width="100px" alt="cargando" />
                    </div>

            }

            <Link to="/home">
                <button className="botonHomeDetalles" >home</button>
            </Link>

        </div>
    )
}
