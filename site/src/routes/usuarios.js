var express = require("express");
var router = express.Router();

var usuarioController = require("../controllers/usuarioController");

// Rota para cadastro do gestor
router.post("/cadastrarGestor", function (req, res) {
  usuarioController.cadastrarGestor(req, res);
});

// Rota para logar o gestor
router.post("/loginGestor", function (req, res) {
  usuarioController.loginGestor(req, res);
});

// Rota para cadastro do técnico
router.post("/cadastrarTecnico", function (req, res) {
  usuarioController.cadastrarTecnico(req, res);
});

// Rota para logar o tecnico
router.post("/loginTecnico", function (req, res) {
  usuarioController.loginTecnico(req, res);
});

// Rota para select de gestores
router.get("/selectGestores", (req, res) => {
  usuarioController.selectGestores(req, res);
});

module.exports = router;
