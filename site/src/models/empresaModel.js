var database = require("../database/config");

function cadastrarEmpresa(empresa, cnpj, dono) {
    var instrucao = `INSERT INTO Empresa (nome, cnpj, dono) VALUES ('${empresa}', '${cnpj}', '${dono}');`;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

module.exports = {
    cadastrarEmpresa
};