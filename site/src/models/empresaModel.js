var database = require("../database/config");

// Cadastrar empresas no banco de dados
function cadastrarEmpresa(empresa, cnpj, dono) {
  var instrucao = `INSERT INTO empresa (nome, cnpj, dono) VALUES ('${empresa}', '${cnpj}', '${dono}');`;
  return database.executar(instrucao);
}

// Select de empresas no banco de dados
function selectEmpresas() {
  var instrucao = `SELECT * FROM empresa ORDER BY nome ASC;`;
  return database.executar(instrucao);
}

module.exports = {
  cadastrarEmpresa,
  selectEmpresas,
};
