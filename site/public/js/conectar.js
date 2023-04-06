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