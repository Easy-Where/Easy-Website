gerarNumeroPid();

// Div de validação
let divValidacao = document.querySelector(".validacao");
let textModal = document.querySelector(".titulo_validacao");
let textValidacao = document.querySelector(".texto_validacao");

// Gerar PID
const inputPid = document.getElementById("pid_input");
inputPid.classList.add("valid");
function gerarNumeroPid() {
  var numero = Math.floor(Math.random() * 1000000);
  pid_input.value = numero;
}

// Alternar entre telas
const signUpButton = document.getElementById("signUp");
const signInButton = document.getElementById("signIn");
const container = document.getElementById("container");

signUpButton.addEventListener("click", () => {
  container.classList.add("right-panel-active");
});

signInButton.addEventListener("click", () => {
  container.classList.remove("right-panel-active");
});

// Modal de erro
function modalErro(frase1, frase2) {
  textModal.innerHTML = frase1;
  textValidacao.innerHTML = frase2;
  divValidacao.classList.add("active");

  setTimeout(() => {
    divValidacao.classList.remove("active");
  }, 3000);
}

// Ver e cobrir senha
function verSenha(input, icone) {
  if (input.type == "password") {
    input.type = "text";
    icone.classList.replace("uil-eye", "uil-eye-slash");
  } else {
    input.type = "password";
    icone.classList.replace("uil-eye-slash", "uil-eye");
  }
}

// Avançar etapa de cadastro
const slideAtual = document.querySelector(".page");

// Padronizar CNPJ
function maskCNPJ() {
  let document = cnpj_input.value.replace(/\D+/g, "").trim();

  if (document.length > 14) {
    return false;
  } else {
    if (document.length > 11) {
      document = document.replace(
        /(\d{2})(\d{3})(\d{3})(\d{4})(\d{0,2})/,
        "$1.$2.$3/$4-$5"
      );
    } else if (document.length > 7) {
      document = document.replace(
        /(\d{2})(\d{3})(\d{3})(\d{0,4})/,
        "$1.$2.$3/$4-"
      );
    } else if (document.length > 5) {
      document = document.replace(/(\d{2})(\d{3})(\d{1,3})/, "$1.$2.$3/");
    } else if (document.length > 2) {
      document = document.replace(/(\d{2})(\d{1,3})/, "$1.$2.");
    } else {
      document = document.replace(/(\d{2})/, "$1.");
    }
  }

  cnpj_input.value = document;
}

// Padronizar Telefone
function maskPhone() {
  let phone = telefone_input.value.replace(/\D+/g, "").trim();

  if (phone.length > 11) {
    return false;
  }

  if (phone.length > 10) {
    phone = phone.replace(/^(\d{2})(\d{5})(\d{4})/, "($1) $2-$3");
  } else if (phone.length > 6) {
    phone = phone.replace(/^(\d{2})(\d{4})/, "($1) $2-");
  } else if (phone.length > 1) {
    phone = phone.replace(/^(\d{2})/, "($1) ");
  }

  telefone_input.value = phone;
}

// Cadastro de usuário
function voltaPraUm() {
  const primeiraEtapa = document.getElementById("primeiraEtapa");
  const segundaEtapa = document.getElementById("segundaEtapa");

  slideAtual.style.marginLeft = "0px";
  primeiraEtapa.classList.add("current");
  segundaEtapa.classList.remove("active", "current");
}

// Cadastro de empresa
function voltaPraDois() {
  const segundaEtapa = document.getElementById("segundaEtapa");
  const terceiraEtapa = document.getElementById("terceiraEtapa");

  slideAtual.style.marginLeft = "-300px";
  segundaEtapa.classList.add("current");
  terceiraEtapa.classList.remove("active", "current");
}

// Logar
function login() {
  var emailVar = email_input.value;
  var senhaVar = senha_login.value;

  if (emailVar == "") {
    modalErro("ERRO", "O campo E-mail está vazio");
  } else if (senhaVar == "") {
    modalErro("ERRO", "O campo Senha está vazio");
  }

  console.log("FORM LOGIN: ", emailVar);
  console.log("FORM SENHA: ", senhaVar);

  fetch("/usuarios/autenticar", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      emailServer: emailVar,
      senhaServer: senhaVar,
    }),
  })
    .then(function (resposta) {
      console.log("ESTOU NO THEN DO entrar()!");
      console.log(resposta);
      if (resposta.ok) {
        console.log(resposta);
        resposta.json().then((json) => {
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
        resposta.text().then((texto) => {
          console.error(texto);
        });
      }
    })
    .catch(function (erro) {
      console.log(erro);
    });

  return false;
}

// Preencher automaticamente campo de email do usuário
document.addEventListener("DOMContentLoaded", () => {
  const sessionEmail = sessionStorage.getItem("EMAIL");
  email_input.value = sessionEmail ? sessionEmail : "";
});

// Select no banco de empresas
document.addEventListener("DOMContentLoaded", async () => {
  try {
    const response = await fetch("/empresas/selectEmpresas");

    const empresas = await response.json();

    empresas.forEach((empresa) => {
      selectEmpresas.innerHTML += `<option value="${empresa.id_empresa}">${empresa.nome}</option>`;
    });
  } catch (error) {
    console.log(error);
  }
});
