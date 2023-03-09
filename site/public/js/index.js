function pageHome() {
    window.location = "./index.html"
}

// Navbar Responsividade
function mostrarNav() {
    document.getElementById('nave').style.top = "0"
    document.getElementById('fe-nave').style.top = "3%"
}

function feNave() {
    
    document.getElementById('nave').style.top = "-110%"
    document.getElementById('fe-nave').style.top = "-70%"
}

var pagina = document.getElementById('section').style

function inicio() {
    pagina.right = 0

}

function meio() {
    pagina.right = "100%"
    feNave()
}
function fim() {
    pagina.right = "200%"
    feNave()
}

