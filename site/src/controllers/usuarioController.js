var usuarioModel = require("../models/usuarioModel");

// Cadastrar gestor
function cadastrarGestor(req, res) {
  let nome = req.body.nomeServer;
  let telefone = req.body.telefoneServer;
  let email = req.body.emailServer;
  let senha = req.body.senhaServer;
  let pid = req.body.pidServer;
  let fkEmpresa = req.body.fkEmpresaServer;

  if (nome == undefined) {
    res.status(400).send("Seu nome está undefined!");
  } else if (telefone == undefined) {
    res.status(400).send("Seu telefone está undefined!");
  } else if (email == undefined) {
    res.status(400).send("Seu email está undefined!");
  } else if (senha == undefined) {
    res.status(400).send("Sua senha está undefined!");
  } else if (pid == undefined) {
    res.status(400).send("Seu pid está undefined!");
  } else if (fkEmpresa == undefined) {
    res.status(400).send("Sua empresa está undefined!");
  } else {
    usuarioModel
      .cadastrarGestor(nome, telefone, email, senha, pid, fkEmpresa)
      .then(function (resultado) {
        res.json(resultado);
      })
      .catch(function (erro) {
        console.log(erro);
        console.log(
          "\nHouve um erro ao realizar o cadastro! Erro: ",
          erro.sqlMessage
        );
        res.status(500).json(erro.sqlMessage);
      });
  }
}

// Logar gestor
function loginGestor(req, res) {
  var email = req.body.emailServer;
  var senha = req.body.senhaServer;

  if (email == undefined) {
    res.status(400).send("Seu email está undefined!");
  } else if (senha == undefined) {
    res.status(400).send("Sua senha está indefinida!");
  } else {
    usuarioModel.loginGestor(email, senha)
      .then(function (resultado) {
        console.log(`\nResultados encontrados: ${resultado.length}`);
        console.log(`Resultados: ${JSON.stringify(resultado)}`);

        if (resultado.length == 1) {
          console.log(resultado);
          res.json(resultado[0]);
        } else if (resultado.length == 0) {
          res.status(403).send("Email e/ou senha inválido(s)");
        } else {
          res.status(403).send("Mais de um usuário com o mesmo login e senha!");
        }
      })
      .catch(function (erro) {
        console.log(erro);
        console.log("\nHouve um erro ao realizar o login! Erro: ", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
      });
  }
}

// Cadastrar técnico
function cadastrarTecnico(req, res) {
  let nome = req.body.nomeServer;
  let telefone = req.body.telefoneServer;
  let email = req.body.emailServer;
  let senha = req.body.senhaServer;
  let pid = req.body.pidServer;
  let fkGestor = req.body.fkGestorServer;
  let fkEmpresa = req.body.fkEmpresaServer;

  if (nome == undefined) {
    res.status(400).send("Seu nome está undefined!");
  } else if (telefone == undefined) {
    res.status(400).send("Seu telefone está undefined!");
  } else if (email == undefined) {
    res.status(400).send("Seu email está undefined!");
  } else if (senha == undefined) {
    res.status(400).send("Sua senha está undefined!");
  } else if (pid == undefined) {
    res.status(400).send("Seu pid está undefined!");
  } else if (fkGestor == undefined) {
    res.status(400).send("Seu gestor está undefined!");
  } else if (fkEmpresa == undefined) {
    res.status(400).send("Sua empresa está undefined!");
  } else {
    usuarioModel.cadastrarTecnico(nome, telefone, email, senha, pid, fkGestor, fkEmpresa)
      .then(function (resultado) {
        res.json(resultado);
      })
      .catch(function (erro) {
        console.log(erro);
        console.log(fkGestor, fkEmpresa)
        console.log(
          "\nHouve um erro ao realizar o cadastro! Erro: ",
          erro.sqlMessage
        );
        res.status(500).json(erro.sqlMessage);
      });
  }
}

// Logar gestor
function loginTecnico(req, res) {
  var email = req.body.emailServer;
  var senha = req.body.senhaServer;

  if (email == undefined) {
    res.status(400).send("Seu email está undefined!");
  } else if (senha == undefined) {
    res.status(400).send("Sua senha está indefinida!");
  } else {
    usuarioModel.loginTecnico(email, senha)
      .then(function (resultado) {
        console.log(`\nResultados encontrados: ${resultado.length}`);
        console.log(`Resultados: ${JSON.stringify(resultado)}`);

        if (resultado.length == 1) {
          console.log(resultado);
          res.json(resultado[0]);
        } else if (resultado.length == 0) {
          res.status(403).send("Email e/ou senha inválido(s)");
        } else {
          res.status(403).send("Mais de um usuário com o mesmo login e senha!");
        }
      })
      .catch(function (erro) {
        console.log(erro);
        console.log("\nHouve um erro ao realizar o login! Erro: ", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
      });
  }
}

// Puxar gestores
function selectGestores(req, res) {
  let fkEmpresa = req.params.fkEmpresa;
  usuarioModel.selectGestores(fkEmpresa)
    .then((response) => {
      res.json(response);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json(error.sqlMessage);
    });
}

// Puxar PID's
function selectPID(req, res) {
  usuarioModel.selectPID()
    .then((response) => {
      res.json(response);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json(error.sqlMessage);
    });
}

// Puxar PID do usuário
function exibirPIDUsuario(req, res) {
  let email = req.params.emailUsuario;
  let senha = req.params.senhaUsuario;
  usuarioModel.exibirPIDUsuario(email, senha)
    .then((response) => {
      res.json(response);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json(error.sqlMessage);
    });
}

// Puxar dados facilitadores do usuário
function dadosFacilitadores(req, res) {
  let pid = req.params.pid;
  usuarioModel.dadosFacilitadores(pid)
    .then((response) => {
      res.json(response);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json(error.sqlMessage);
    });
}

// Atualizar usuário
function atualizarDados(req, res) {
  let pid = req.params.pid;
  let nome = req.body.nomeServer;
  let telefone = req.body.telefoneServer;
  let email = req.body.emailServer;
  let senha = req.body.senhaServer;

  if (nome == undefined) {
    res.status(400).send('Seu nome está undefined');
  } else if (telefone == undefined) {
    res.status(400).send('Seu telefone está undefined');
  } else if (email == undefined) {
    res.status(400).send('Seu email está undefined');
  } else if (senha == undefined) {
    res.status(400).send('Sua senha está undefined');
  } else if (pid == undefined) {
    res.status(400).send('Seu pid está undefined');
  } else {
    usuarioModel.atualizarDados(nome, telefone, email, senha, pid)
      .then(function (resultado) {
        res.json(resultado);
      })
      .catch((erro) => {
        console.log(erro);
        console.log('\nHouve um erro ao atualizar o funcionario! Erro: ', erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
      });
  }
}

// Puxar funcionários de um gestor
function selectFuncionarios(req, res) {
  let pid = req.params.pidUsado;
  usuarioModel.selectFuncionarios(pid)
    .then((response) => {
      res.json(response);
      console.log('Bati na controller 2')
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json(error.sqlMessage);
    });
}

// Apagar usuário
function apagarUsuario(req, res) {
  var pid = req.params.pid;
  var id = req.params.id;

  usuarioModel.apagarUsuario(pid, id)
    .then(function (resultado) {
      res.json(resultado);
    })
    .catch(function (erro) {
      console.log(erro);
      console.log('Houve um erro ao deletar o post: ', erro.sqlMessage);
      res.status(500).json(erro.sqlMessage);
    });
}

module.exports = {
  cadastrarGestor,
  cadastrarTecnico,
  loginGestor,
  loginTecnico,
  selectGestores,
  selectPID,
  exibirPIDUsuario,
  dadosFacilitadores,
  atualizarDados,
  selectFuncionarios,
  apagarUsuario
};