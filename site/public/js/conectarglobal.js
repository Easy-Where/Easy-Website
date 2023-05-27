gerarNumeroPid();

// Div de validação
let divValidacao = document.querySelector(".validacao");
let textModal = document.querySelector(".titulo_validacao");
let textValidacao = document.querySelector(".texto_validacao");

// Gerar PID
const inputPid = document.getElementById("pid_input");
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

// Preencher automaticamente campo de email do usuário
document.addEventListener("DOMContentLoaded", () => {
  const sessionEmail = sessionStorage.getItem("EMAIL");
  email_login.value = sessionEmail ? sessionEmail : "";
});

// Select no banco de empresas
document.addEventListener("DOMContentLoaded", async () => {
  try {
    const response = await fetch("/empresas/selectEmpresas");

    const empresas = await response.json();

    empresas.forEach((empresa) => {
      selectEmpresas.innerHTML += `<option value="${empresa.id}">${empresa.nome}</option>`;
    });
  } catch (error) {
    console.log(error);
  }
});
