var usuarioModel = require("../models/usuarioModel");

// Cadastrar gestor
function cadastrarGestor(req, res) {
  let nome = req.body.nomeServer;
  let telefone = req.body.telefoneServer;
  let email = req.body.emailServer;
  let senha = req.body.senhaServer;
  let pid = req.body.senhaServer;
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
    usuarioModel
      .entrar(email, senha)
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
  let pid = req.body.senhaServer;
  let fkGestor = req.body.empresaServer;
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
    usuarioModel
      .cadastrarGestor(nome, telefone, email, senha, pid, fkGestor, fkEmpresa)
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
function loginTecnico(req, res) {
  var email = req.body.emailServer;
  var senha = req.body.senhaServer;

  if (email == undefined) {
    res.status(400).send("Seu email está undefined!");
  } else if (senha == undefined) {
    res.status(400).send("Sua senha está indefinida!");
  } else {
    usuarioModel
      .entrar(email, senha)
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

// Puxando gestores
function selectGestores(req, res) {
  empresaModel
    .selectGestores()
    .then((response) => {
      res.json(response);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json(error.sqlMessage);
    });
}

module.exports = {
  cadastrarGestor,
  cadastrarTecnico,
  loginGestor,
  loginTecnico,
  selectGestores
};
