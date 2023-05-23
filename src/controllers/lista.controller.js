const pool = require("../postgre");

const obtenerListas = async (req, res, next) => {
    try {
        const result = await pool.query("SELECT * from lista")
        res.json(result.rows);
    } catch (error) {
        next(error);
    }
}
const crearLista = async (req, res, next) => {
    try {
        const { titulo, descripcion } = req.body
        const result = await pool.query("Insert into lista (titulo, descripcion) VALUES ($1, $2) RETURNING *",
            [titulo, descripcion,]);
        res.json(result.rows[0]);
    } catch (error) {
        next(error);
    }
}
const obtenerunaLista = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await pool.query("SELECT * FROM lista WHERE id = $1", [id]);
        if (result.rows.length === 0)
            return res.status(404).json({ message: "No hay lista" });
        res.json(result.rows[0]);
    } catch (error) {
        next(error);
    }
}
const obtenerRequisito = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await pool.query("SELECT requisitos.nombre as nombre, requisitos.descripcion as descripcion FROM ordenes JOIN tramites ON ordenes.tramite_id = tramites.id JOIN requisitos ON ordenes.requisito_id = requisitos.id WHERE tramites.estado = true and tramites.id = $1", [id]);
        if (result.rows.length === 0)
            return res.status(404).json({ message: "No hay requisito" });
        res.json(result.rows);
    } catch (error) {
        next(error);
    }
}
const obtenerTramites = async (req, res, next) => {
    try {
        const result = await pool.query("SELECT * from tramites WHERE estado = true ORDER BY id ASC ")
        res.json(result.rows);
    } catch (error) {
        next(error);
    }
}
const obtenerunTramite = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await pool.query("SELECT * FROM tramites WHERE id = $1", [id]);
        if (result.rows.length === 0)
            return res.status(404).json({ message: "No hay tramite" });
        res.json(result.rows[0]);
    } catch (error) {
        next(error);
    }
}
const actualizarLista = async(req, res) => {
    try {
        const { id } = req.params;
        const { titulo, descripcion } = req.body;
    
        const result = await pool.query(
          "UPDATE lista SET titulo = $1, descripcion = $2 WHERE id = $3 RETURNING *",
          [titulo, descripcion, id]
        );
    
        if (result.rows.length === 0)
          return res.status(404).json({ message: "No hay lista" });
    
        return res.json(result.rows[0]);
      } catch (error) {
        next(error);
      }
}
const borrarLista = async(req, res) => {
    try {
        const { id } = req.params;
        const result = await pool.query("DELETE FROM lista WHERE id = $1", [id]);
    
        if (result.rowCount === 0)
          return res.status(404).json({ message: "Lista not found" });
        return res.sendStatus(204);
      } catch (error) {
        next(error);
      }
}

module.exports = {
    obtenerListas,
    obtenerunaLista,
    obtenerRequisito,
    obtenerTramites,
    obtenerunTramite,
    crearLista,
    borrarLista,
    actualizarLista
}