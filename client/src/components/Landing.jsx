import "./landing.css"
import img from "../images/pikacho.jpg"
import { Link } from "react-router-dom";


export default () => {
    return (
        <div className="App">
            <img src={img} alt="pokemon" />
            <Link to="/home">
                <button className="contenedorBoton">GO</button> 
            </Link>
        </div>
    );
}
