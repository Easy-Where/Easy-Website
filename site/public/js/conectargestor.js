// Div de validação
let divValidacao = document.querySelector(".validacao");
let textModal = document.querySelector(".titulo_validacao");
let textValidacao = document.querySelector(".texto_validacao");
let contador = 0;

// Gerar PID 
function gerarNumeroPid() {
  var numero = Math.floor(Math.random() * 100000000);
  if (numerosGerados.includes(numero)) {
    return gerarNumeroPid();
  } else {
    numerosGerados.push(numero);
    return numero;
  }
}

// Array para armazenar os números gerados
var numerosGerados = [];

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
  textModal.innerHTML = frase1;
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

// Avançar etapa de cadastro
const slideAtual = document.querySelector(".page");

// Cadastro de empresa
function avancaPraDois() {
  const nome = nome_input.value;
  const telefone = telefone_input.value;
  const email = emailCad_input.value;
  let validacaoEmail = /^(\w{2,})([._]?\w+)*@(\w{3,})([._]\w{2,})?([.-])[\w]{2,}$/;
  const primeiraEtapa = document.getElementById('primeiraEtapa');
  const segundaEtapa = document.getElementById('segundaEtapa');

  if (nome == "") {
    modalErro("Campo vazio", "&quotNome&quot está vazio")
  } else if (telefone == "") {
    modalErro("Campo vazio", "&quotTelefone&quot está vazio")
  } else if (telefone.length < 15) {
    modalErro("Dado incorreto", "&quotTelefone&quot está incompleto")
  } else if (email == "") {
    modalErro("Campo vazio", "&quotEmail&quot está vazio")
  } else if (!validacaoEmail.test(email)) {
    modalErro("Dado incorreto", "E-mail inválido! Certifique-se que<br>seu e-mail segue essa estrutura: nome@example.com")
  } else {
    slideAtual.style.marginLeft = "-300px";
    primeiraEtapa.classList.remove('current');
    segundaEtapa.classList.add('active', 'current');
  }
};

// Finalizar cadastro
function avancaPraTres() {
  if (contador == 0) {
    const empresaSelect = selectEmpresas.value;
    if (empresaSelect == "") {
      modalErro("Campo vazio", "Selecione uma empresa")
    } else {
      slideAtual.style.marginLeft = "-600px";
      segundaEtapa.classList.remove('current');
      terceiraEtapa.classList.add('active', 'current');
    }
  } else {
    const empresa = empresa_input.value;
    const cnpj = cnpj_input.value;
    const dono = dono_input.value;
    const segundaEtapa = document.getElementById('segundaEtapa');
    const terceiraEtapa = document.getElementById('terceiraEtapa');

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
      segundaEtapa.classList.remove('current');
      terceiraEtapa.classList.add('active', 'current');
    }
  }
};

// Cadastro de usuário
function voltaPraUm() {
  const primeiraEtapa = document.getElementById('primeiraEtapa');
  const segundaEtapa = document.getElementById('segundaEtapa');

  slideAtual.style.marginLeft = "0px";
  primeiraEtapa.classList.add('current');
  segundaEtapa.classList.remove('active', 'current');
};

// Cadastro de empresa
function voltaPraDois() {
  const segundaEtapa = document.getElementById('segundaEtapa');
  const terceiraEtapa = document.getElementById('terceiraEtapa');

  slideAtual.style.marginLeft = "-300px";
  segundaEtapa.classList.add('current');
  terceiraEtapa.classList.remove('active', 'current');
};

// Padronizar CNPJ
function maskCNPJ() {
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
function maskPhone() {
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

// Cadastrar nova empresa
function div_cadastro_empresa() {
  contador++;
  cadastrar_empresa.innerHTML = `
  <h1>Sobre sua empresa</h1>
  <div class="field">
   <div class="input-group">
     <input required="" type="text" id="empresa_input" />
     <label class="user-label">Empresa</label>
   </div>
   <div class="input-group">
     <input required="" type="text" id="cnpj_input" maxlength="18" onkeyup="maskCNPJ(event)" />
     <label class="user-label">CNPJ</label>
   </div>
   <div class="input-group">
     <input required="" type="text" id="dono_input" />
     <label class="user-label">Dono</label>
   </div> 
  </div>
  <div class="btn">
    <button type="button" id="prev-btn" onclick="voltarCadastro()">
      Cancelar
    </button>
    <button type="button" id="next-btn2" onclick="cadastrarEmpresa()">
      Cadastrar
    </button>
  </div>`
}

// Voltar a seleção de empresa
function voltarCadastro() {
  contador--;
  cadastrar_empresa.innerHTML = `
  <h1>Sobre sua empresa</h1>
  <div class="field">
    <div class="input-group">
      <select required="" id="selectEmpresas">
        <option value="">-Escolha sua empresa-</option>
      </select>
    </div>
    <div class="cadastro_empresa">
      <p>Não encontrou sua empresa? Cadastre aqui!</p>
      <i class="uil uil-plus-circle" onclick="div_cadastro_empresa()"></i>
    </div>
  </div>
  <div class="btn">
    <button type="button" id="prev-btn" onclick="voltaPraUm()">
      <img src="assets/prev.svg" alt="" />
    </button>
    <button type="button" id="next-btn2" onclick="avancaPraTres()">
      <img src="assets/next.svg" alt="" />
    </button>
  </div>`
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
  let empresaVar = empresa_input.value;
  let cnpjVar = cnpj_input.value.replace(/\D+/g, "").trim();
  let donoVar = dono_input.value;
  let senhaVar = senha_input.value;
  let confirmacao = confirma_input.value;

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
      textModal.style.background = "#1175d1";
      modalErro("Cadastro realizado!", "Vamos fazer login?")
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
          let telefoneVar = telefone_input.value;
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
              telefoneServer: telefoneVar,
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

// function signUp() {
//   let nomeVar = nome_input.value;
//   let telefoneVar = telefone_input.value;
//   let emailVar = emailCad_input.value;
//   let empresaVar = resposta[0].id_empresa;
//   let senhaVar = senha_input.value;
//   let pid = gerarNumeroPid();
//   const fkEmpresa = document.getElementById('sl_enterprise');

//   nomeServer: nome_input.value.value;
//   telefoneServer: telefone_input.value;
//   emailServer: emailCad_input.value;
//   empresaServer: resposta[0].id_empresa;
//   senhaServer: senha_input.value;
//   fkEmpresaServer: fkEmpresa.value != '' ? fkEmpresa.value : null

//   console.log(User);

//   // Ao negar o atributo do JSON, conferimos se ele está vazio ou não
//   let isInvalid =
//     !User.nameServer |
//     !User.officeServer |
//     !User.emailServer |
//     !User.passServer |
//     !User.codigoPatrimonioServer |
//     !User.fkEmpresaServer;


//   if (isInvalid) {
//     alert('⚠ Campos não preenchidos corretamente!');
//   } else {
//     fetch('/usuarios/cadastrar', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },

//       // Aqui passamos somente o JSON criado lá em cima
//       body: JSON.stringify(User),
//     })
//       .then(function (resposta) {
//         console.log('resposta: ', resposta);

//         if (resposta.ok) {
//           alert('Cadastro realizado com sucesso!');

//           sessionStorage.setItem('EMAIL', User.emailServer);

//           setTimeout(() => {
//             window.location = 'sign-page.html';
//           }, '2000');
//         } else {
//           throw 'Houve um erro ao tentar realizar o cadastro!';
//         }
//       })
//       .catch(function (resposta) {
//         console.log(`#ERRO: ${resposta}`);
//       });

//     return false;
//   }
// }

// Select no banco de empresas
document.addEventListener('DOMContentLoaded', async () => {
  try {
    const response = await fetch('/empresas/selectEmpresas');

    const empresas = await response.json();

    empresas.forEach((empresa) => {
      selectEmpresas.innerHTML += `<option value="${empresa.id_empresa}">${empresa.nome}</option>`;
    });
  } catch (error) {
    console.log(error);
  }
});

// Cadastrar empresas
function cadastrarEmpresa() {
  const Enterprise = {
    empresaServer: empresa_input.value,
    cnpjServer: cnpj_input.value.replace(/\D+/g, '').trim(),
    donoServer: dono_input.value
  };

  console.log("Nome:", Enterprise.empresaServer);
  console.log("CNPJ:", Enterprise.cnpjServer);
  console.log("Dono:", Enterprise.donoServer);

  const validInput = Enterprise.empresaServer && Enterprise.cnpjServer && Enterprise.donoServer;

  if (validInput) {
    fetch('/empresas/cadastrarEmpresa', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(Enterprise)
    }).then((res) => {
      console.log("Resposta:", res);
      if (res.ok) {
        modalErro("Cadastro realizado!", "Sua empresa está em nosso sistema")
        setTimeout(() => {
          voltarCadastro()
        }, 2000)
      }
    }).catch((error) => {
      console.log("ERRO:", error);
    })
    return false
  } else {
    textModal.style.background = "#1175d1";
    if (Enterprise.empresaServer == "") {
      modalErro("Campo vazio", "&quotNome&quot está vazio")
    } else if (Enterprise.cnpjServer == "") {
      modalErro("Campo vazio", "&quotCNPJ&quot está vazio")
    } else if (Enterprise.donoServer == "") {
      modalErro("Campo vazio", "&quotDono&quot está vazio")
    }
  }
}