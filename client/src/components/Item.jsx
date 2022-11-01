import React from "react"
import "./Item.css"

export default (props) => {
    //console.log(props.Nombre)

    return (
        <div className="Tarjeta">
            <h3 className="nombre" >{props.Nombre}</h3>
            <img width={250} height={250} src={props.Imagen} alt="not found" />
            {/* Lo siguiente es un ternario para verificar si Tipos es un array ó no, y leerlo */}
            <div className="tipo">
                {Array.isArray(props.Tipo) ?
                    props.Tipo.map((e, i) => { return (<p key={i}>{e}</p>) }) :
                    <p>{props.Tipo}</p>
                }
            </div>
            {props.Like && (<p>{props.Like}</p>)}
        </div>
    )
}
