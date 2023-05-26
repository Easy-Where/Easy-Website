var database = require("../database/config");

// Cadastrar empresas no banco de dados
function cadastrarEmpresa(empresa, cnpj, dono) {
    var instrucao = `INSERT INTO Empresa (nome, cnpj, dono) VALUES ('${empresa}', '${cnpj}', '${dono}');`;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

// Select de empresas no banco de dados 
function selectEmpresas() {
  
    var instrucao = `SELECT * FROM Empresa ORDER BY nome ASC;`;
    console.log('Executando a instrução SQL: \n' + instrucao);
    return database.executar(instrucao);
  }

module.exports = {
    cadastrarEmpresa,
    selectEmpresas
};