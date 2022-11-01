import React from "react";
import "./Paginator.css"

export default ({ pokesPerPage, pokes, paginado }) => {
    const pageNum = [];

    for (let i = 1; i <= Math.ceil(pokes / pokesPerPage); i++) {
        pageNum.push(i)
    }

    return (
        <div className="paginado" >
            {pageNum && pageNum.map((num, i) => (
                <button className="botones" key={i} onClick={() => paginado(num)}>{num}</button>
            ))}
        </div>

    )
}
