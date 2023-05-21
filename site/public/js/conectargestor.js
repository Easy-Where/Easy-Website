// Alternar entre telas
const signUpButton = document.getElementById('signUp');
const signInButton = document.getElementById('signIn');
const container = document.getElementById('container');

signUpButton.addEventListener('click', () => {
  container.classList.add("right-panel-active");
});

signInButton.addEventListener('click', () => {
  container.classList.remove("right-panel-active");
});

// Modal de erro
function modalErro(frase1, frase2) {
  var divValidacao = document.querySelector(".validacao");
  var textModal = document.querySelector(".titulo_validacao");
  var textValidacao = document.querySelector(".texto_validacao");
  textModal.innerHTML = frase1;
  textValidacao.innerHTML = frase2;
  divValidacao.classList.add("active");
  setTimeout(() => {
    divValidacao.classList.remove("active");
  }, 3000)
}

// Modal de sucesso
function modalSucesso(frase1, frase2) {
  var divValidacao = document.querySelector(".validacao");
  var textModal = document.querySelector(".titulo_validacao");
  var textValidacao = document.querySelector(".texto_validacao");

  textModal.innerHTML = frase1;
  textValidacao.innerHTML = frase2;
  textModal.style.background = "#1175d1";

  divValidacao.classList.add("active");
  setTimeout(() => {
    divValidacao.classList.remove("active");
  }, 3000)
}

// Ver e cobrir senha
function verSenha(input, icone) {
  if (input.type == "password") {
    input.type = "text";
    icone.classList.replace("uil-eye", "uil-eye-slash")
  } else {
    input.type = "password";
    icone.classList.replace("uil-eye-slash", "uil-eye")
  }
}

// Avançar etapa de cadastro
const slideAtual = document.querySelector(".page");

// Cadastro de empresa
function avancaPraDois() {
  const nome = nome_input.value;
  const telefone = telefone_input.value;
  const email = emailCad_input.value;
  let validacaoEmail = /^(\w{2,})([._]?\w+)*@(\w{3,})([._]\w{2,})?([.-])[\w]{2,}$/;

  if (nome == "") {
    modalErro("Campo vazio", "&quotNome&quot está vazio")
  } else if (telefone == "") {
    modalErro("Campo vazio", "&quotTelefone&quot está vazio")
  } else if(telefone.length < 15){
    modalErro("Dado incorreto", "&quotTelefone&quot está incompleto")
  } else if (email == "") {
    modalErro("Campo vazio", "&quotEmail&quot está vazio")
  } else if (!validacaoEmail.test(email)) {
    modalErro("Dado incorreto", "E-mail inválido! Certifique-se que<br>seu e-mail segue essa estrutura: nome@example.com")
  } else {
    slideAtual.style.marginLeft = "-300px";
  }
};

// Finalizar cadastro
function avancaPraTres() {
  const empresa = empresa_input.value;
  const cnpj = cnpj_input.value;
  const dono = dono_input.value;

  if (empresa == "") {
    modalErro("Campo vazio", "&quotEmpresa&quot está vazio")
  } else if (cnpj == "") {
    modalErro("Campo vazio", "&quotCPNJ&quot está vazio")
  } else if (cnpj.length < 18) {
    modalErro("Dado incorreto", "CNPJ está incompleto")
  } else if (dono == "") {
    modalErro("Campo vazio", "&quotDono&quot está vazio")
  } else {
    slideAtual.style.marginLeft = "-600px";
  }
};

// Cadastro de usuário
function voltaPraUm() {
  slideAtual.style.marginLeft = "0px";
};

// Cadastro de empresa
function voltaPraDois() {
  slideAtual.style.marginLeft = "-300px";
};

// Padronizar CNPJ
function maskCNPJ(event) {
  let document = cnpj_input.value.replace(/\D+/g, "").trim()

  if (document.length > 14) {
    return false
  } else {
    if (document.length > 11) {
      document = document.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{0,2})/, '$1.$2.$3/$4-$5')
    } else if (document.length > 7) {
      document = document.replace(/(\d{2})(\d{3})(\d{3})(\d{0,4})/, '$1.$2.$3/$4-')
    } else if (document.length > 5) {
      document = document.replace(/(\d{2})(\d{3})(\d{1,3})/, '$1.$2.$3/')
    } else if (document.length > 2) {
      document = document.replace(/(\d{2})(\d{1,3})/, '$1.$2.')
    } else {
      document = document.replace(/(\d{2})/, '$1.')
    }
  }

  cnpj_input.value = document
}

// Padronizar Telefone
function maskPhone(event) {
  let phone = telefone_input.value.replace(/\D+/g, "").trim()

  if (phone.length > 11) {
    return false
  }

  if (phone.length > 10) {
    phone = phone.replace(/^(\d{2})(\d{5})(\d{4})/, "($1) $2-$3")
  } else if (phone.length > 6) {
    phone = phone.replace(/^(\d{2})(\d{4})/, "($1) $2-")
  } else if (phone.length > 1) {
    phone = phone.replace(/^(\d{2})/, "($1) ")
  }

  telefone_input.value = phone
}

// Logar
function logar() {
  var emailVar = email_input.value;
  var senhaVar = senha2.value;

  if (emailVar == "") {
    modalErro("ERRO", "O campo E-mail está vazio")
  } else if (senhaVar == "") {
    modalErro("ERRO", "O campo Senha está vazio")
  }

  console.log("FORM LOGIN: ", emailVar);
  console.log("FORM SENHA: ", senhaVar);

  fetch("/usuarios/autenticar", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      emailServer: emailVar,
      senhaServer: senhaVar
    })
  }).then(function (resposta) {
    console.log("ESTOU NO THEN DO entrar()!")
    console.log(resposta)
    if (resposta.ok) {
      console.log(resposta);
      resposta.json().then(json => {
        console.log(json);
        console.log(JSON.stringify(json));

        sessionStorage.EMAIL_USUARIO = json.email;
        sessionStorage.NOME_USUARIO = json.nome;
        sessionStorage.ID_USUARIO = json.id;

        setTimeout(function () {
          window.location = "../dashboard/dashboardgestor.html";
        }, 1000); // apenas para exibir o loading

      });

    } else {
      console.log("Houve um erro ao tentar realizar o login!");
      resposta.text().then(texto => {
        console.error(texto);

      });
    }

  }).catch(function (erro) {
    console.log(erro);
  })

  return false;
}

// Cadastrar
function cadastrar() {
  var empresaVar = empresa_input.value;
  var cnpjVar = cnpj_input.value.replace(/\D+/g, "").trim();
  var donoVar = dono_input.value;
  var senhaVar = senha_input.value;
  var confirmacao = confirma_input.value;

  if (senhaVar == "") {
    modalErro("Campo vazio", "&quotSenha&quot está vazio")
  } else if (confirmacao == "") {
    modalErro("Campo vazio", "&quotConfirmação de Senha&quot está vazio")
  } else if (senhaVar.length <= 8) {
    modalErro("Aumente a segurança", "A senha deve ter mais de 8 caracteres")
  } else if (confirmacao != senhaVar) {
    modalErro("Dado incorreto", "Senhas diferentes")
  }

  fetch("/usuarios/validacao", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      empresaServer: empresaVar,
      cnpjServer: cnpjVar,
      donoServer: donoVar
    })

  }).then(function (resposta) {
    if (resposta.ok) {
      modalSucesso("Cadastro realizado!", "Vamos fazer login?")
      resposta.json().then(function (resposta) {
        console.log(resposta)
        if (resposta.length < 1) {
          console.log("Cadastrando empresa...");
          console.log(resposta);
          fetch("/usuarios/cadastrarEmpresa", {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              empresaServer: empresaVar,
              cnpjServer: cnpjVar,
              donoServer: donoVar
            })
          }).then(function (resposta) {
            console.log(resposta)
            if (resposta.ok) {
              console.log("Empresa cadastrada com sucesso");
              cadastrar();
            } else {
              console.log("Deu erro ao cadastrar Empresa");
            }
          }).catch(function (resposta) {
            console.log(`#ERRO: ${resposta}`);
          });
        } else {
          console.log("Cadastrando gestor...");
          console.log(resposta[0].id_empresa);
          let nomeVar = nome_input.value;
          let emailVar = emailCad_input.value;
          let empresaVar = resposta[0].id_empresa;
          let senhaVar = senha_input.value;

          fetch("/usuarios/cadastrarGestor", {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              nomeServer: nomeVar,
              emailServer: emailVar,
              senhaServer: senhaVar,
              empresaServer: empresaVar,
            })
          }).then(function (resposta) {
            console.log("resposta: ", resposta);

            if (resposta.ok) {
              console.log("Gestor cadastrado com sucesso");
              setTimeout(() => {
                window.location = "conectargestor.html";
              }, "2000");
            } else {
              throw ("Houve um erro ao tentar realizar o cadastro!");
            }
          }).catch(function (resposta) {
            console.log(`#ERRO: ${resposta}`);
          });
        }
      });
    } else {
      console.log("Erro ao validar dados");
    }
  }).catch(function (resposta) {
    console.log(`#ERRO: ${resposta}`);
  });
}