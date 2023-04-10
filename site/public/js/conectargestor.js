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
    btn.addEventListener('click', handleNext);
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
        setInterval(sumirMensagem, 5000)
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

        if (resposta.ok) {
            console.log(resposta);
            resposta.json().then(json => {
                console.log(json);
                console.log(JSON.stringify(json));

                sessionStorage.EMAIL_USUARIO = json.email;
                sessionStorage.NOME_USUARIO = json.nome;
                sessionStorage.ID_USUARIO = json.id;

                setTimeout(function () {
                    window.location = "./dashboard/cards.html";
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

function cadastrar() {

    //Recupere o valor da nova input pelo nome do id
    // Agora vá para o método fetch logo abaixo
    var nomeVar = nome_input.value;
    var sobrenomeVar = sobrenome_input.value;
    var emailVar = emailCad_input.value;
    var empresaVar = empresa_input.value;
    var pidVar = pid.value;
    var senhaVar = senha.value;
    var confirmacaoSenhaVar = confirmasenha.value;

    if (nomeVar == "" || emailVar == "" || senhaVar == "" || confirmacaoSenhaVar == "" || sobrenomeVar == "" || empresaVar == "" || pidVar == "") {
        return false;

    } else {
        setInterval(sumirMensagem, 5000)
    }

    // Enviando o valor da nova input
    fetch("/usuarios/cadastrar", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            // crie um atributo que recebe o valor recuperado aqui
            // Agora vá para o arquivo routes/usuario.js
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

            setTimeout(() => {
                window.location = "login.html";
            }, "2000")

        } else {
            throw ("Houve um erro ao tentar realizar o cadastro!");
        }
        
    }).catch(function (resposta) {
        console.log(`#ERRO: ${resposta}`);
    });

    return false;
}