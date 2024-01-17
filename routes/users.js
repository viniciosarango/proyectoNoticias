var express = require('express');
var router = express.Router();

const usuarioA = require('../controladores/usuarioControl');
const usuarioControl = new usuarioA();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

//buscar y listar son get
router.get("/admin/usuarios", usuarioControl.listar);
router.get("/admin/usuarios/:external", usuarioControl.buscar);

//guardar y modificar es post
router.post("/admin/usuarios/guardar", usuarioControl.guardar);



module.exports = router;
