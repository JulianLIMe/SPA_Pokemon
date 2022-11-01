import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTipos, postPoke } from "../store";
import { Link, useHistory } from "react-router-dom";
import "./FormCreate.css";
import dragon from "../images/dragon.png"

export default () => {

    const dispatch = useDispatch();
    const History = useHistory();

    //Validaciones
    const [err, setErr] = useState({})
    function validator(input) {
        let error = {}
        if (!input.Nombre) { error.Nombre = "se requiere nombre" }
        if (input.Ataque && input.Ataque > 120) { error.Ataque = "Maximo ataque permitido de 120" }
        if (input.Vida && Number(input.Vida) === "NAN") { error.Vida = "Valor invalido" }
        if (input.Like > 5 || input.Like < 1) { error.Like = "supero el limite" }
        return error
    }

    const tipos = useSelector((state) => state.tipos);
    useEffect(() => { if (tipos.length === 0) { dispatch(getTipos()) } }, [])

    const [newPoke, setNewPoke] = useState({})
    const [tiposPoke, setTiposPoke] = useState([])
    console.log("estado", newPoke)
    console.log("tipos", tiposPoke)

    function handleChange(e) {
        e.preventDefault()
        setNewPoke({
            ...newPoke,
            [e.target.name]: e.target.value
        })
        setErr(validator({
            ...newPoke,
            [e.target.name]: e.target.value
        }))
    }

    function handleTipo(e) {
        e.preventDefault()
        setTiposPoke(() => {
            return [...tiposPoke, e.target.value]
        })
    }

    function handleChangeTipo(e) {
        e.preventDefault()
        setNewPoke({
            ...newPoke,
            ["Tipos"]: tiposPoke
        })
        alert("se asignaron los tipos ")
    }

    function handleReset(e) {
        e.preventDefault()
        setTiposPoke([])
        setNewPoke({
            ...newPoke,
            ["Tipos"]: undefined
        })
    }

    const onSubmitCreate = async (e) => {
        e.preventDefault();
        dispatch(postPoke(newPoke))
        alert("Pokemon Creado")
        //History.push("./home")
        window.open("http://localhost:3000/home", "_self")
    }


    return (
        <div className="formGeneral">
            <Link to="/home"><button className="botonHome">home</button></Link>

            <h3 className="crear">Crea tu Pokemon</h3>

            <div className="formRect">
                <form onSubmit={onSubmitCreate} className="formRenglon">

                    <div>
                        <label>Nombre</label>
                        <input type="text" value={newPoke.Nombre} name="Nombre" onChange={handleChange} />
                        {err.Nombre && alert(err.Nombre)}
                    </div>

                    <div>
                        <label>Vida</label>
                        <input type="number" value={newPoke.Vida} name="Vida" onChange={handleChange} />
                    </div>

                    <div>
                        <label>Ataque</label>
                        <input type="number" value={newPoke.Ataque} name="Ataque" onChange={handleChange} />
                        {err.Ataque && alert(err.Ataque)}
                    </div>

                    <div>
                        <label>Defensa</label>
                        <input type="number" value={newPoke.Defensa} name="Defensa" onChange={handleChange} />
                    </div>

                    <div>
                        <label>Velocidad</label>
                        <input type="number" value={newPoke.Velocidad} name="Velocidad" onChange={handleChange} />
                    </div>

                    <div>
                        <label>Altura</label>
                        <input type="number" value={newPoke.Altura} name="Altura" onChange={handleChange} />
                    </div>

                    <div>
                        <label>Peso</label>
                        <input type="number" value={newPoke.Peso} name="Peso" onChange={handleChange} />
                    </div>

                    <div>
                        <label>Tipo</label>
                        <select onChange={handleTipo} className="inputTipo">{
                            tipos.map((e, i) => (<option key={i} value={e}>{e}</option>)
                            )}</select>
                        <input type="button" value="select" onClick={handleChangeTipo} />
                    </div>

                    <div>
                        { tiposPoke.length > 0 ? 
                            tiposPoke.map((e, i) => { return <p key={i}>{e}</p> }) :
                            <p>Sin tipos</p>
                        }
                    </div>

                    <div>
                        <input type="button" value="reset tipos" onClick={handleReset} />
                    </div>

                    <div>
                        <label>Imagen</label>
                        <input type="text" value={newPoke.Imagen} name="Imagen" onChange={handleChange} />
                    </div>

                    {
                        newPoke.Tipos ? <button type="submit" className="botonCrear" >Crear</button> : <img src="" alt="" />
                    }


                </form>
            </div>

            <img src={dragon} className="dragoncito" alt="" />

        </div>
    )

}

