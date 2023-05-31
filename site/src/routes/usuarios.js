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
router.get("/selectGestores/:fkEmpresa", (req, res) => {
  usuarioController.selectGestores(req, res);
});

// Rota para validar PID's existentes
router.get("/selectPID", (req, res) => {
  usuarioController.selectPID(req, res);
});

// Rota para exibir o PID do usuário
router.get("/exibirPIDUsuario/:emailUsuario/:senhaUsuario", (req, res) => {
  usuarioController.exibirPIDUsuario(req, res);
});

// Rota para facilitar atualização de dados do usuário
router.get("/dadosFacilitadores/:pid", (req, res) => {
  usuarioController.dadosFacilitadores(req, res);
});

// Rota para atualizar os dados do usuário
router.put('/atualizarDados/:pid', function (req, res) {
  usuarioController.atualizarDados(req, res);
});

// Rota para exibir os funcionários
router.get("/selectFuncionarios/:pidUsado", (req, res) => {
  usuarioController.selectFuncionarios(req, res);
});

// Rota para apagar o funcionário
router.delete('/apagarUsuario/:pid/:id', function (req, res) {
  usuarioController.apagarUsuario(req, res);
});

// Rota para apagar o técnico
router.delete('/apagarUsuarioTecnico/:pid/:id', function (req, res) {
  usuarioController.apagarUsuarioTecnico(req, res);
});

// Rota para cadastrar o vendedor
router.post("/cadastrarVendedor", function (req, res) {
  usuarioController.cadastrarVendedor(req, res);
});

// Rota para select de técnico
router.get("/selectTecnicos/:fkEmpresa", (req, res) => {
  usuarioController.selectTecnicos(req, res);
});

// Rota para select de vendeores
router.get("/selectVendedor/:fkEmpresa", (req, res) => {
  usuarioController.selectVendedor(req, res);
});

module.exports = router;