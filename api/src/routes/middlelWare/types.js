const { default: axios } = require("axios");
const express = require("express");
const { Tipo } = require("../../db") // Modelo de la DB, tabla Tipo

const router = express();

// middleware de la ruta localhost:3001/types para cargar los tipos de la API
router.use("/", async (req, res, next) => {
    try {
        const types = await axios.get("https://pokeapi.co/api/v2/type/")
        
        const arrType = types.data.results;
        
        // Busco ó creo instancias en la tabla Tipo de los tipos de pokemons traidos desde API
        for(let i = 0; i < arrType.length; i++){
            await Tipo.findOrCreate({
                where: {Nombre: arrType[i].name}
            })
        }
        
    } catch (error) {
        return res.status(400).send("Ocurrio un error: ", error)
    }
    next();
})

router.get("/", async(req, res) => {
    try {
        const dataTable = await Tipo.findAll()
        var arr = dataTable.map((e) => {return e.Nombre});
        
        return res.json(arr)
        
    } catch (error) {
        return res.status(400).send("Ocurrio un error: ", error)
    }
});

module.exports = router;
