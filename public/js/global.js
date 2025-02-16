// Acesso a redes sociais
let menu = document.querySelector('.menu')
let toggle = document.querySelector('.toggle')
let textofooter = document.querySelector('h1#textofooter')
toggle.onclick = function () {
    menu.classList.toggle('active')
}

// Tom Ticket
var ttChatLoaderS = document.createElement('script');
    document.tomticketChatLoaderScriptVersion = 2;
    ttChatLoaderS.src = 'https://easy.tomticket.com/scripts-chat/chat.min.js'
        + '?id=EP61574'
        + '&account=3940736P06042023044352'
        + '&autoOpen=0'
        + '&hideWhenOffline=0'
        + '&d=easy'
        + '&ts=' + new Date().getTime()
        + '&ref=' + encodeURIComponent(document.URL);
    document.body.appendChild(ttChatLoaderS);

// Responsividade da Navbar (Quebrar para menu)
    var btn = document.getElementById('aMenu')
    var navMenu = document.getElementById('nav-responsivo')
    var conect = document.getElementById('btn-conectar')

    function btnMenu() {
        navMenu.classList.toggle('ativo')
        conect.classList.toggle('efeitoConect')
        btn.classList.toggle('btnmenuSelect')
    }