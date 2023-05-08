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

// Ver senha Cadastro
const input = document.querySelector("#senha");
const img = document.querySelector("#trocarFigura");
img.addEventListener('click', togglePass);

function togglePass() {
    if (input.type == "password") {
        input.type = "text";
        img.src = 'assets/conectar-escondersenha.png'
    } else {
        input.type = "password";
        img.src = 'assets/conectar-versenha.png'
    }
}

// Ver senha confirmação de senha
const input4 = document.querySelector("#confirmasenha");
const img4 = document.querySelector("#confirmatrocarFigura");
img4.addEventListener('click', togglePass4);

function togglePass4() {
    if (input4.type == "password") {
        input4.type = "text";
        img4.src = 'assets/conectar-escondersenha.png'
    } else {
        input4.type = "password";
        img4.src = 'assets/conectar-versenha.png'
    }
}

// Ver senha PID
const input3 = document.querySelector("#pid");
const img3 = document.querySelector("#trocarFigurapid");
img3.addEventListener('click', togglePass3);

function togglePass3() {
    if (input3.type == "password") {
        input3.type = "text";
        img3.src = 'assets/conectar-escondersenha.png'
    } else {
        input3.type = "password";
        img3.src = 'assets/conectar-versenha.png'
    }
}

// Ver senha Login
const input2 = document.querySelector("#senha2");
const img2 = document.querySelector("#trocarFigura2");
img2.addEventListener('click', togglePass2);

function togglePass2() {
    if (input2.type == "password") {
        input2.type = "text";
        img2.src = 'assets/conectar-escondersenha.png'
    } else {
        input2.type = "password";
        img2.src = 'assets/conectar-versenha.png'
    }
}

// Progresso da tela de cadastro
const nextBtn = document.querySelectorAll('#next-btn');
const nextBtn2 = document.querySelectorAll('#next-btn2');

const prevBtn = document.querySelectorAll('#prev-btn');
const pages = document.querySelectorAll('.page');
const progress = document.querySelectorAll('.progresso-bar')

let currentPage = 0;

function showCurrentPage(index){
    pages.forEach((page, i) => {
        if(i == index){
            page.classList.add('active');
        }else{
            page.classList.remove('active');
        }
    });

    progress.forEach((progressBar, i) => {
        if(i == index){
            progressBar.classList.add('current');
        }else{
            progressBar.classList.remove('current');
        }
    })
};

function addProgress(index){
    progress[index].classList.add('active');
}

function subProgress(index){
    progress[index + 1].classList.remove('active');
}

function handleNext(){
    currentPage++;
    showCurrentPage(currentPage);
    addProgress(currentPage);
}

function handlePrev(){
    currentPage--;
    showCurrentPage(currentPage);
    subProgress(currentPage);
}

nextBtn.forEach(btn => {
  btn.addEventListener('click', () => {
    const nome = nome_input.value;
    const sobrenome = sobrenome_input.value;
    const email = emailCad_input.value;

    if (nome == "" || sobrenome == "" || email == "") {
      console.log("O nome, sobrenome ou email está errado");
    } else {
      handleNext();
    }
  });
});

nextBtn2.forEach(btn => {
  btn.addEventListener('click', () => {
        const empresa = empresa_input.value;
        const ppid = pid.value;

        if (empresa == "" || ppid == "") {
            console.log("A empresa ou o pid está errado");
        } else {
            handleNext();
        }
    });
});

prevBtn.forEach(btn => {
    btn.addEventListener('click', handlePrev);
});

// web-data-viz

function entrar() {
    
    var emailVar = email_input.value;
    var senhaVar = senha2.value;

    if (emailVar == "" || senhaVar == "") {

        return false;
    } else {
        
    }

    console.log("FORM LOGIN: ", emailVar);
    console.log("FORM SENHA: ", senhaVar);

    fetch("/usuarios/autenticarUsuario", {
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
                    window.location = "./dashboard/index.html";
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

//
function cadastrar() {
    var empresaVar = empresa_input.value;
  
    if (empresaVar == "") {
      return false;
    } else {
      console.log("Todos os campos estão certos");
    }
  
    fetch("/usuarios/autenticar2", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        empresaServer: empresaVar,
      })
  
    }).then(function (resposta) {
      if (resposta.ok) {
        resposta.json().then(function (json) {
          if (json.length < 1) {
            //console.log("Cadastrando empresa...");
            console.log(json)
            console.log("Empresa errada ou não está cadastrada");
          } else {
            console.log("Cadastrando usuario...");
            cadastrarUsuario(json[0].id);
          }
        });
      } else {
        console.log("Erro ao validar dados");
      }
  
    }).catch(function (resposta) {
      console.log(`#ERRO: ${resposta}`);
    });
  
  }

  function cadastrarUsuario(empresaId) {
    var nomeVar = nome_input.value;
    var sobrenomeVar = sobrenome_input.value;
    var emailVar = emailCad_input.value;
    var empresaVar = empresaId;
    var pidVar = pid.value;
    var senhaVar = senha.value;
  
    fetch("/usuarios/validarPID", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        pidServer: pidVar
      })
    }).then(function (resposta) {
      if (resposta.ok) {
        console.log(resposta);
        resposta.json().then(function (json) {
          if (json.length > 0) {
            // PID existe no banco de dados, cadastrar usuário
            fetch("/usuarios/cadastrarUsuario", {
              method: "POST",
              headers: {
                "Content-Type": "application/json"
              },
              body: JSON.stringify({
                nomeServer: nomeVar,
                emailServer: emailVar,
                senhaServer: senhaVar,
                sobrenomeServer: sobrenomeVar,
                empresaServer: empresaVar,
                pidServer: pidVar
              })
            }).then(function (resposta) {
              console.log("resposta: ", resposta);
  
              if (resposta.ok) {
                console.log("Gestor cadastrado com sucesso");
                setTimeout(() => {
                  window.location = "index.html";
                }, "2000");
              } else {
                throw ("Houve um erro ao tentar realizar o cadastro!");
              }
            }).catch(function (resposta) {
              console.log(`#ERRO: ${resposta}`);
            });
          } else {
            // PID não existe no banco de dados
            console.log("PID não encontrado");
          }
        });
      } else {
        console.log("Erro ao validar PID");
      }
    }).catch(function (resposta) {
      console.log(`#ERRO: ${resposta}`);
    });
  
    return false;
  }
  