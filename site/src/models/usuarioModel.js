var database = require("../database/config");

// Cadastrar gestor no banco de dados
function cadastrarGestor(nome, telefone, email, senha, pid, fkEmpresa) {
  var instrucao = `INSERT INTO usuario (nome, telefone, email, senha, cargo, pid, pid_gestor, id_empresa) VALUES ('${nome}', '${telefone}', '${email}', '${senha}', 'Gestor', '${pid}', '${pid}', '${fkEmpresa}');`;
  return database.executar(instrucao);
}

// Logar gestor no banco de dados
function loginGestor(email, senha) {
  var instrucao = `SELECT * FROM usuario WHERE email = '${email}' AND senha = '${senha}' AND cargo = 'Gestor';`;
  return database.executar(instrucao);
}

// Cadastrar técnico no banco de dados
function cadastrarTecnico( nome, telefone, email, senha, pid, fkGestor, fkEmpresa) {
  var instrucao = `INSERT INTO usuario (nome, telefone, email, senha, cargo, pid, pid_gestor, id_empresa) VALUES ('${nome}', '${telefone}', '${email}', '${senha}', 'Técnico', '${pid}', '${fkGestor}', '${fkEmpresa}');`;
  return database.executar(instrucao);
}

// Logar técnico no banco de dados
function loginTecnico(email, senha) {
  var instrucao = `SELECT * FROM usuario WHERE email = '${email}' AND senha = '${senha}' AND cargo = 'Técnico';`;
  return database.executar(instrucao);
}

// Select de gestores no banco de dados
function selectGestores() {
  var instrucao = `SELECT * FROM usuario ORDER BY nome ASC;`;
  return database.executar(instrucao);
}

module.exports = {
  cadastrarGestor,
  cadastrarTecnico,
  loginGestor,
  loginTecnico,
  selectGestores
};