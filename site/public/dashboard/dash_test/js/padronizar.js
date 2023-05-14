const body = document.querySelector("body");
const modeToggle = body.querySelector(".mode-toggle");
const img = document.querySelector("#Logo");
const sidebar = body.querySelector("nav");
const sidebarToggle = body.querySelector(".sidebar-toggle");
const icone = document.querySelector("#mode_light_dark");
const caixa_legenda = body.querySelector(".content_legendas");
const botao_legendas = document.querySelector(".legendas");

let getMode = localStorage.getItem("mode");
if (getMode && getMode === "dark") {
    body.classList.toggle("dark");
    if (body.classList.contains("dark")) {
        if (sidebar.classList.contains("close")) {
            img.src = 'assets/easy-ware-logotipo-close.png'
        } else {
            img.src = 'assets/easy-ware-logotipo-light.png'
            icone.classList.replace("uil-moon", "uil-sun")
        }
    } else {
        if (sidebar.classList.contains("close")) {
            img.src = 'assets/easy-ware-logotipo-close.png'
        } else {
            img.src = 'assets/easy-ware-logotipo-dark.png'
            icone.classList.replace("uil-sun", "uil-moon")
        }
    }
}

let getStatus = localStorage.getItem("status");
if (getStatus && getStatus === "close") {
    sidebar.classList.toggle("close");
    if (sidebar.classList.contains("close")) {
        img.src = 'assets/easy-ware-logotipo-close.png'
    } else {
        if (body.classList.contains("dark")) {
            img.src = 'assets/easy-ware-logotipo-light.png'
            icone.classList.replace("uil-moon", "uil-sun")
        } else {
            img.src = 'assets/easy-ware-logotipo-dark.png'
            icone.classList.replace("uil-sun", "uil-moon")
        }
    }
}

// Modo dark
modeToggle.addEventListener("click", () => {
    body.classList.toggle("dark");
    if (body.classList.contains("dark")) {
        localStorage.setItem("mode", "dark");
        if (sidebar.classList.contains("close")) {
            img.src = 'assets/easy-ware-logotipo-close.png'
        } else {
            img.src = 'assets/easy-ware-logotipo-light.png'
            icone.classList.replace("uil-moon", "uil-sun")
        }
    } else {
        localStorage.setItem("mode", "light");
        if (sidebar.classList.contains("close")) {
            img.src = 'assets/easy-ware-logotipo-close.png'
        } else {
            img.src = 'assets/easy-ware-logotipo-dark.png'
            icone.classList.replace("uil-sun", "uil-moon")
        }
    }
});

// Fechar e abrir navbar
sidebarToggle.addEventListener("click", () => {
    sidebar.classList.toggle("close");
    if (sidebar.classList.contains("close")) {
        localStorage.setItem("status", "close");
        img.src = 'assets/easy-ware-logotipo-close.png'
    } else {
        localStorage.setItem("status", "open");
        if (body.classList.contains("dark")) {
            img.src = 'assets/easy-ware-logotipo-light.png'
            icone.classList.replace("uil-moon", "uil-sun")
        } else {
            img.src = 'assets/easy-ware-logotipo-dark.png'
            icone.classList.replace("uil-sun", "uil-moon")
        }
    }
})

// Fechar e abrir legendas
botao_legendas.addEventListener("click", () => {
    caixa_legenda.classList.toggle("fechado");
    if (caixa_legenda.classList.contains("fechado")) {
        localStorage.setItem("status", "fechado");
    } else {
        localStorage.setItem("status", "aberto");
    }
})