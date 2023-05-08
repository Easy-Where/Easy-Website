const body = document.querySelector("body");
const modeToggle = body.querySelector(".mode-toggle");
const img = document.querySelector("#Logo");
const sidebar = body.querySelector("nav");
const sidebarToggle = body.querySelector(".sidebar-toggle");

// Modo dark
modeToggle.addEventListener("click", () => {
    body.classList.toggle("dark");
    if (body.classList.contains("dark")) {
        localStorage.setItem("mode", "dark");
        if (sidebar.classList.contains("close")) {
            img.src = 'assets/easy-ware-logotipo-close.png'
        } else {
            img.src = 'assets/easy-ware-logotipo-light.png'
        }
    } else {
        localStorage.setItem("mode", "light");
        if (sidebar.classList.contains("close")) {
            img.src = 'assets/easy-ware-logotipo-close-dark.png'
        } else {
            img.src = 'assets/easy-ware-logotipo-dark.png'
        }
    }
});

// Fechar e abrir navbar
sidebarToggle.addEventListener("click", () => {
    sidebar.classList.toggle("close");
    if (sidebar.classList.contains("close")) {
        localStorage.setItem("status", "close");
        if (body.classList.contains("dark")) {
            img.src = 'assets/easy-ware-logotipo-close.png'
        } else {
            img.src = 'assets/easy-ware-logotipo-close-dark.png'
        }
    } else {
        localStorage.setItem("status", "open");
        if (body.classList.contains("dark")) {
            img.src = 'assets/easy-ware-logotipo-light.png'
        } else {
            img.src = 'assets/easy-ware-logotipo-dark.png'
        }
    }
})

// Ver senha 
const input = document.querySelector("#senha");
const img2 = document.querySelector("#trocarFigura");
img2.addEventListener('click', togglePass);

function togglePass() {
    if (input.type == "password") {
        input.type = "text";
        img2.src = 'assets/perfilescondersenha.png'
    } else {
        input.type = "password";
        img2.src = 'assets/perfilversenha.png'
    }
}

// Ver confirmação de senha
const input4 = document.querySelector("#confirmasenha");
const img4 = document.querySelector("#confirmatrocarFigura");
img4.addEventListener('click', togglePass4);

function togglePass4() {
    if (input4.type == "password") {
        input4.type = "text";
        img4.src = 'assets/perfilescondersenha.png'
    } else {
        input4.type = "password";
        img4.src = 'assets/perfilversenha.png'
    }
}

// Ver senha PID
const input3 = document.querySelector("#pid");
const img3 = document.querySelector("#trocarFigurapid");
img3.addEventListener('click', togglePass3);

function togglePass3() {
    if (input3.type == "password") {
        input3.type = "text";
        img3.src = 'assets/perfilescondersenha.png'
    } else {
        input3.type = "password";
        img3.src = 'assets/perfilversenha.png'
    }
}