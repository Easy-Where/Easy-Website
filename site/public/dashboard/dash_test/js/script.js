const body = document.querySelector("body"),
    modeToggle = body.querySelector(".mode-toggle");
sidebar = body.querySelector("nav");
sidebarToggle = body.querySelector(".sidebar-toggle");

let getMode = localStorage.getItem("mode");
if (getMode && getMode === "dark") {
    body.classList.toggle("dark");
}

let getStatus = localStorage.getItem("status");
if (getStatus && getStatus === "close") {
    sidebar.classList.toggle("close");
}

modeToggle.addEventListener("click", () => {
    body.classList.toggle("dark");
    if (body.classList.contains("dark")) {
        localStorage.setItem("mode", "dark");
    } else {
        localStorage.setItem("mode", "light");
    }
});

sidebarToggle.addEventListener("click", () => {
    sidebar.classList.toggle("close");
    if (sidebar.classList.contains("close")) {
        localStorage.setItem("status", "close");
    } else {
        localStorage.setItem("status", "open");
    }
})

// Gráficos
b_usuario.innerHTML = sessionStorage.NOME_USUARIO;

let proximaAtualizacao;

window.onload = obterDadosGraficos();

function obterDadosGraficos() {
    obterDadosGrafico(1)
    obterDadosGrafico(2)
    obterDadosGrafico(3)
    obterDadosGrafico(4)
}

verificar_autenticacao();

function alterarTitulo(idAquario) {
    var tituloAquario = document.getElementById(`tituloAquario${idAquario}`)
    tituloAquario.innerHTML = "Últimas medidas de Temperatura e Umidade do <span style='color: #09c25d'>Hack " + idAquario + "</span>"
}

function exibirAquario(idAquario) {
    let todosOsGraficos = document.getElementById("graficos")

    for (i = 1; i <= todosOsGraficos.childElementCount; i++) {
        // exibindo - ou não - o gráfico
        let elementoAtual = document.getElementById(`grafico${i}`)
        if (elementoAtual.classList.contains("display-block")) {
            elementoAtual.classList.remove("display-block")
        }
        elementoAtual.classList.add("display-none")

        // alterando estilo do botão
        let btnAtual = document.getElementById(`btnAquario${i}`)
        if (btnAtual.classList.contains("btn-pink")) {
            btnAtual.classList.remove("btn-pink")
        }
        btnAtual.classList.add("btn-white")
    }

    // exibindo - ou não - o gráfico
    let graficoExibir = document.getElementById(`grafico${idAquario}`)
    graficoExibir.classList.remove("display-none")
    graficoExibir.classList.add("display-block")

    // alterando estilo do botão
    let btnExibir = document.getElementById(`btnAquario${idAquario}`)
    btnExibir.classList.remove("btn-white")
    btnExibir.classList.add("btn-pink")
}

// O gráfico é construído com três funções:
// 1. obterDadosGrafico -> Traz dados do Banco de Dados para montar o gráfico da primeira vez
// 2. plotarGrafico -> Monta o gráfico com os dados trazidos e exibe em tela
// 3. atualizarGrafico -> Atualiza o gráfico, trazendo novamente dados do Banco

// Esta função *obterDadosGrafico* busca os últimos dados inseridos em tabela de medidas.
// para, quando carregar o gráfico da primeira vez, já trazer com vários dados.
// A função *obterDadosGrafico* também invoca a função *plotarGrafico*

//     Se quiser alterar a busca, ajuste as regras de negócio em src/controllers
//     Para ajustar o "select", ajuste o comando sql em src/models


function obterDadosGrafico(idAquario) {

    alterarTitulo(idAquario)

    if (proximaAtualizacao != undefined) {
        clearTimeout(proximaAtualizacao);
    }

    fetch(`/medidas/ultimas/${idAquario}`, { cache: 'no-store' }).then(function (response) {
        if (response.ok) {
            response.json().then(function (resposta) {
                console.log(`Dados recebidos: ${JSON.stringify(resposta)}`);
                resposta.reverse();

                plotarGrafico(resposta, idAquario);

                var temperatura = resposta[0].temperatura
                var umidade = resposta[0].umidade

                var boxTemp = document.querySelectorAll(".boxTemp")
                var boxUmi = document.querySelectorAll(".boxUmi")
                var text = document.querySelectorAll(".text")
                var number = document.querySelectorAll(".number")

                console.log("Situação:", text);

                if (temperatura > 26) {
                    boxTemp[0].style.backgroundColor = "#FF2E00"
                    text[0].innerHTML = "Risco"
                } else if (temperatura == 26) {
                    boxTemp[0].style.backgroundColor = "#BDFF00"
                    text[0].innerHTML = "Alerta"
                } else if (temperatura == 25) {
                    boxTemp[0].style.backgroundColor = "#09C25D"
                    text[0].innerHTML = "Ideal"
                } else if (temperatura <= 24 && temperatura >= 19) {
                    boxTemp[0].style.backgroundColor = "#00FFF0"
                    text[0].innerHTML = "Alerta"
                } else {
                    boxTemp[0].style.backgroundColor = "#2339FE"
                    text[0].innerHTML = "Risco"
                }

                if (umidade > 60) {
                    boxUmi[0].style.backgroundColor = "#FF2E00"
                    text[4].innerHTML = "Risco"
                } else if (umidade >= 51 && umidade <= 59) {
                    boxUmi[0].style.backgroundColor = "#BDFF00"
                    text[4].innerHTML = "Alerta"
                } else if (umidade == 50) {
                    boxUmi[0].style.backgroundColor = "#09C25D"
                    text[4].innerHTML = "Ideal"
                } else if (umidade >= 40 && umidade <= 49) {
                    boxUmi[0].style.backgroundColor = "#00FFF0"
                    text[4].innerHTML = "Alerta"
                } else {
                    boxUmi[0].style.backgroundColor = "#2339FE"
                    text[4].innerHTML = "Risco"
                }

                number[0].innerHTML = temperatura + "ºC"
                number[4].innerHTML = umidade + "%"
            });
        } else {
            console.error('Nenhum dado encontrado ou erro na API');
        }
    })
        .catch(function (error) {
            console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
        });
}

// Esta função *plotarGrafico* usa os dados capturados na função anterior para criar o gráfico
// Configura o gráfico (cores, tipo, etc), materializa-o na página e, 
// A função *plotarGrafico* também invoca a função *atualizarGrafico*
function plotarGrafico(resposta, idAquario) {

    console.log('iniciando plotagem do gráfico...');

    // Criando estrutura para plotar gráfico - labels
    let labels = [];

    // Criando estrutura para plotar gráfico - dados
    let dados = {
        labels: labels,
        datasets: [{
            label: 'Umidade',
            data: [],
            fill: false,
            borderColor: 'rgb(0, 172, 77)',
            backgroundColor: 'rgb(0, 172, 77)',
            tension: 0.1
        },
        {
            label: 'Temperatura',
            data: [],
            fill: false,
            borderColor: 'rgb(32, 0, 172)',
            backgroundColor: 'rgb(32, 0, 172)',
            tension: 0.1
        }]
    };

    console.log('----------------------------------------------')
    console.log('Estes dados foram recebidos pela funcao "obterDadosGrafico" e passados para "plotarGrafico":')
    console.log(resposta)

    // Inserindo valores recebidos em estrutura para plotar o gráfico
    for (i = 0; i < resposta.length; i++) {
        var registro = resposta[i];
        labels.push(registro.momento_grafico);
        dados.datasets[0].data.push(registro.umidade);
        dados.datasets[1].data.push(registro.temperatura);
    }

    console.log('----------------------------------------------')
    console.log('O gráfico será plotado com os respectivos valores:')
    console.log('Labels:')
    console.log(labels)
    console.log('Dados:')
    console.log(dados.datasets)
    console.log('----------------------------------------------')

    // Criando estrutura para plotar gráfico - config
    const config = {
        type: 'line',
        data: dados,
    };

    // Adicionando gráfico criado em div na tela
    let myChart = new Chart(
        document.getElementById(`myChartCanvas${idAquario}`),
        config
    );

    setTimeout(() => atualizarGrafico(idAquario, dados, myChart), 2000);
}


// Esta função *atualizarGrafico* atualiza o gráfico que foi renderizado na página,
// buscando a última medida inserida em tabela contendo as capturas,

//     Se quiser alterar a busca, ajuste as regras de negócio em src/controllers
//     Para ajustar o "select", ajuste o comando sql em src/models
function atualizarGrafico(idAquario, dados, myChart) {



    fetch(`/medidas/tempo-real/${idAquario}`, { cache: 'no-store' }).then(function (response) {
        if (response.ok) {
            response.json().then(function (novoRegistro) {

                console.log(`Dados recebidos: ${JSON.stringify(novoRegistro)}`);
                console.log(`Dados atuais do gráfico:`);
                console.log(dados);

                let avisoCaptura = document.getElementById(`avisoCaptura${idAquario}`)
                avisoCaptura.innerHTML = ""

                var temperatura = novoRegistro[0].temperatura
                var umidade = novoRegistro[0].umidade 

                // var temperatura = novoRegistro[0].temperatura - (1 + Math.random() * 26)
                // var umidade = novoRegistro[0].umidade - (1 + Math.random() * 60)

                var boxTemp = document.querySelectorAll(".boxTemp")
                var boxUmi = document.querySelectorAll(".boxUmi")
                var text = document.querySelectorAll(".text")
                var number = document.querySelectorAll(".number")

                console.log("Situação:", text);

                if (temperatura > 26) {
                    boxTemp[0].style.backgroundColor = "#FF2E00"
                    text[0].innerHTML = "Risco"
                } else if (temperatura == 26) {
                    boxTemp[0].style.backgroundColor = "#BDFF00"
                    text[0].innerHTML = "Alerta"
                } else if (temperatura == 25) {
                    boxTemp[0].style.backgroundColor = "#09C25D"
                    text[0].innerHTML = "Ideal"
                } else if (temperatura <= 24 && temperatura >= 19) {
                    boxTemp[0].style.backgroundColor = "#00FFF0"
                    text[0].innerHTML = "Alerta"
                } else {
                    boxTemp[0].style.backgroundColor = "#2339FE"
                    text[0].innerHTML = "Risco"
                }

                if (umidade > 60) {
                    boxUmi[0].style.backgroundColor = "#FF2E00"
                    text[4].innerHTML = "Risco"
                } else if (umidade >= 51 && umidade <= 59) {
                    boxUmi[0].style.backgroundColor = "#BDFF00"
                    text[4].innerHTML = "Alerta"
                } else if (umidade == 50) {
                    boxUmi[0].style.backgroundColor = "#09C25D"
                    text[4].innerHTML = "Ideal"
                } else if (umidade >= 40 && umidade <= 49) {
                    boxUmi[0].style.backgroundColor = "#00FFF0"
                    text[4].innerHTML = "Alerta"
                } else {
                    boxUmi[0].style.backgroundColor = "#2339FE"
                    text[4].innerHTML = "Risco"
                }

                number[0].innerHTML = temperatura.toFixed(1) + "ºC"
                number[4].innerHTML = umidade.toFixed(1) + "%"

                if (novoRegistro[0].momento_grafico == dados.labels[dados.labels.length - 1]) {
                    console.log("---------------------------------------------------------------")
                    console.log("Como não há dados novos para captura, o gráfico não atualizará.")
                    avisoCaptura.innerHTML = "<i class='fa-solid fa-triangle-exclamation'></i> Foi trazido o dado mais atual capturado pelo sensor. <br> Como não há dados novos a exibir, o gráfico não atualizará."
                    console.log("Horário do novo dado capturado:")
                    console.log(novoRegistro[0].momento_grafico)
                    console.log("Horário do último dado capturado:")
                    console.log(dados.labels[dados.labels.length - 1])
                    console.log("---------------------------------------------------------------")
                } else {
                    // tirando e colocando valores no gráfico
                    dados.labels.shift(); // apagar o primeiro
                    dados.labels.push(novoRegistro[0].momento_grafico); // incluir um novo momento

                    dados.datasets[0].data.shift();  // apagar o primeiro de umidade
                    dados.datasets[0].data.push(novoRegistro[0].umidade); // incluir uma nova medida de umidade

                    dados.datasets[1].data.shift();  // apagar o primeiro de temperatura
                    dados.datasets[1].data.push(novoRegistro[0].temperatura); // incluir uma nova medida de temperatura

                    myChart.update();
                }

                // Altere aqui o valor em ms se quiser que o gráfico atualize mais rápido ou mais devagar
                proximaAtualizacao = setTimeout(() => atualizarGrafico(idAquario, dados, myChart), 2000);
            });
        } else {
            console.error('Nenhum dado encontrado ou erro na API');
            // Altere aqui o valor em ms se quiser que o gráfico atualize mais rápido ou mais devagar
            proximaAtualizacao = setTimeout(() => atualizarGrafico(idAquario, dados, myChart), 2000);
        }
    })
        .catch(function (error) {
            console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
        });

}