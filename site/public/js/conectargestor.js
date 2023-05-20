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

// Div de validação
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

function modalSucesso(frase1, frase2) {
  var divValidacao = document.querySelector(".validacao");
  var textModal = document.querySelector(".titulo_validacao");
  var textValidacao = document.querySelector(".texto_validacao");

  textModal.innerHTML = frase1;
  textModal.style.background = "green";
  textModal.style.color = "white";
  textModal.style.fontSize = "1.1em";
  textValidacao.innerHTML = frase2;

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

// Progresso da tela de cadastro
const nextBtn = document.querySelectorAll('#next-btn');
const nextBtn2 = document.querySelectorAll('#next-btn2');

const prevBtn = document.querySelectorAll('#prev-btn');
const prevBtn2 = document.querySelectorAll('#prev-btn2');
const pages = document.querySelectorAll('.page');
const progress = document.querySelectorAll('.progresso-bar')

let currentPage = 0;

function showCurrentPage(index) {
  pages.forEach((page, i) => {
    if (i == index) {
      page.classList.add('active');
    } else {
      page.classList.remove('active');
    }
  });

  progress.forEach((progressBar, i) => {
    if (i == index) {
      progressBar.classList.add('current');
    } else {
      progressBar.classList.remove('current');
    }
  })
};

function addProgress(index) {
  progress[index].classList.add('active');
}

function subProgress(index) {
  progress[index + 1].classList.remove('active');
}

function handleNext() {
  currentPage++;
  showCurrentPage(currentPage);
  addProgress(currentPage);
}

function handlePrev() {
  currentPage--;
  showCurrentPage(currentPage);
  subProgress(currentPage);
}

nextBtn.forEach(btn => {
  btn.addEventListener('click', () => {
    const nome = nome_input.value;
    const email = emailCad_input.value;
    var validacaoEmail = /^(\w{2,})([._]?\w+)*@(\w{3,})([._]\w{2,})?([.-])[\w]{2,}$/;

    if (nome == "") {
      modalErro("ERRO", "O campo Nome está vazio")
    } else if (email == "") {
      modalErro("ERRO", "O campo Email está vazio")
    } else if (!validacaoEmail.test(email)) {
      modalErro("ERRO", "E-mail inválido! Certifique-se que<BR> seu e-mail segue essa estrutura: nome@example.com")
    } else {
      handleNext();
    }
  });
});

nextBtn2.forEach(btn => {
  btn.addEventListener('click', () => {
    const empresa = empresa_input.value;
    const cnpj = cnpj_input.value;
    const dono = dono_input.value;

    if (empresa == "") {
      modalErro("ERRO", "O campo Empresa está vazio")
    } else if (cnpj == "") {
      modalErro("ERRO", "O campo CPNJ está vazio")
    } else if (dono == "") {
      modalErro("ERRO", "O campo Dono está vazio")
    } else if (cnpj.length < 18) {
      modalErro("ERRO", "O campo CNPJ está menor do que o ideal")
    } else {
      handleNext();
    }
  });
});


prevBtn.forEach(btn => {
  btn.addEventListener('click', handlePrev);
});

prevBtn2.forEach(btn => {
  btn.addEventListener('click', handlePrev);
});

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
    modalErro("ERRO", "O campo Senha está vazio")
  } else if (confirmacao == "") {
    modalErro("ERRO", "O campo Confirmação de Senha está vazio")
  } else if (senhaVar.length <= 8) {
    modalErro("ERRO", "A senha deve ter mais de 8 caracteres")
  } else if (confirmacao != senhaVar) {
    modalErro("ERRO", "Senhas diferentes")
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
      modalSucesso("CADASTRO REALIZADO COM SUCESSO!", "Agora vamos fazer Login :)")
      resposta.json().then(function (resposta) {
        console.log(resposta)
        if (resposta.length < 1) {
          console.log("Cadastrando empresa...");
          console.log(resposta)
          cadastrarEmpresa()
        } else {
          console.log("Cadastrando gestor...");
          console.log(resposta[0].id_empresa);
          cadastrarGestor(resposta[0].id_empresa);
        }
      });
    } else {
      console.log("Erro ao validar dados");
    }

  }).catch(function (resposta) {
    console.log(`#ERRO: ${resposta}`);
  });

}


function cadastrarEmpresa() {
  var empresaVar = empresa_input.value;
  var cnpjVar = cnpj_input.value.replace(/\D+/g, "").trim();
  var donoVar = dono_input.value;

  console.log("Estou no CadastrarEmpresa");

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
}

function cadastrarGestor(empresaId) {
  var nomeVar = nome_input.value;
  var emailVar = emailCad_input.value;
  var empresaVar = empresaId;
  var senhaVar = senha_input.value;

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

  return false;
}

