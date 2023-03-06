function pageHome() {
    window.location = "./index.html"
}

// Navbar Responsividade
function mostrarNav() {
    document.getElementById('nave').style.left = "0"
    document.getElementById('fe-nave').style.left = "47%"
}

function feNave() {
    
    document.getElementById('nave').style.left = "-80%"
    document.getElementById('fe-nave').style.left = "-70%"
}