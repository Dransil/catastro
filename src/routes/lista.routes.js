const { Router} = require('express');
const { obtenerRequisito, obtenerunaLista, crearLista, borrarLista, actualizarLista, obtenerListas, obtenerunTramite, obtenerTramites } = require('../controllers/lista.controller')
const router = Router();
//Requisitos
router.get('/requisito/:id', obtenerRequisito)
//Tramites
router.get('/tramite/:id', obtenerunTramite)
router.get('/tramite', obtenerTramites)
//Lista
router.get('/lista', obtenerListas)
router.get('/lista/:id', obtenerunaLista)
router.post('/lista', crearLista)
router.delete('/lista/:id', borrarLista)
router.put('/lista/:id', actualizarLista)
module.exports = router;
