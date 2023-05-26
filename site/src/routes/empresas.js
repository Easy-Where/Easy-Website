var express = require("express");
var router = express.Router();

var empresaController = require("../controllers/empresaController");

// Rota para criar empresa
router.post('/cadastrarEmpresa', (req, res) => {
  empresaController.cadastrarEmpresa(req, res);
});

// Rota para select de empresas 
router.get('/selectEmpresas', (req, res) => {
empresaController.selectEmpresas(req, res)
});

// Rota para deletar empresas
// router.delete("/excluirEmpresa:id_empresa", function (req, res) {
//     empresaController.excluirEmpresa(req, res)
// });

// Rota para atualizar empresas
// router.post("/atualizarEmpresa:id_empresa", function (req, res) {
//     empresaController.atualizarEmpresa(req, res)
// });
module.exports = router;
