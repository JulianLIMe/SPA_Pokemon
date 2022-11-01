import Items from "./Items"
import Search from "./Search"
import FilterTipo from "./FilterTipo"
import "./Home.css"
import pokemon from "../images/pokemon.png"


export default () => {
    
    return (
        <div className="todohome">
            <div className="contenedorimagen"><img className="imagenpokemon" src={pokemon} alt="" /></div>
            <Search/>
            <FilterTipo/>
            <Items/>
        </div>
    )
} 