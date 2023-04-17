var database = require("../database/config")

function entrar(email, senha) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function entrar(): ", email, senha)
    var instrucao = `
        SELECT * FROM Usuario WHERE email = '${email}' AND senha = '${senha}' AND cargo = 'Gestor';
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function entrar2(email, senha) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function entrar(): ", email, senha)
    var instrucao = `
        SELECT * FROM Usuario WHERE email = '${email}' AND senha = '${senha}' AND cargo = 'Tecnico';
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function validacaoEmpresa(empresa, cnpj, dono) {
    var instrucao = `
        SELECT * FROM Empresa WHERE nome = '${empresa}' AND cnpj = '${cnpj}' AND dono = '${dono}';
    `;

    return database.executar(instrucao);
}

function cadastrarEmpresa(empresa, cnpj, dono) {
    var instrucao = `
        INSERT INTO Empresa (nome, cnpj, dono) VALUES ('${empresa}', '${cnpj}', '${dono}');
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function cadastrarGestor(nome, email, senha, sobrenome, empresaCad) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():", nome, email, senha);
    
    var instrucao = `
        INSERT INTO Usuario (nome, sobrenome, email, senha, cargo, id_empresa) 
            VALUES ('${nome}', '${sobrenome}', '${email}', '${senha}', 'Gestor', '${empresaCad}');
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function cadastrarUsuario(nome, email, senha, sobrenome, pid, empresaCad) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():", nome, email, senha);
    
    var instrucao = `
        INSERT INTO Usuario (PID, nome, sobrenome, email, senha, cargo, id_gestor) 
            VALUES ('${pid}', '${nome}', '${sobrenome}', '${email}', '${senha}', 'Tecnico', '${empresaCad}');
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

module.exports = {
    entrar,
    entrar2,
    validacaoEmpresa,
    cadastrarGestor,
    cadastrarUsuario,
    cadastrarEmpresa
};