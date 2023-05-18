// Simulador Financeiro
function calculofinanceiro() {
    const segmento = segmento_input.value
    const vendas = Number(vendas_input.value)
    const valorvenda = Number(valorvenda_input.value)
    const vendedores = Number(vendedores_input.value)
    const ocorrencias = Number(ocorrencias_input.value)
    const downtime = Number(tempo_input.value)
    let faturamentoMedia = 0
    let faturamentoCliente = vendas * valorvenda
    let porcentagemProblemas = (ocorrencias / vendedores) * 100
    let tempoPerdido = ocorrencias * downtime
    let respostaFaturamento = ''
    let respostaPorcentagem = ''

    if (segmento == "" || vendas <= 0 || valorvenda <= 0 || vendedores <= 0 || ocorrencias <= 0 || downtime <= 0) {
        prejuizo.innerHTML = ""
        evitar.innerHTML = ""
        lucro.innerHTML = ""
        alert('Campos vazios ou inválidos')
    } else {
        if (segmento == "autonomo") {
            faturamentoMedia = 6666
        } else if (segmento == "telemarketing") {
            faturamentoMedia = 10000
        } else if (segmento == "financas") {
            faturamentoMedia = 750000000
        } else if (segmento == "varejo") {
            faturamentoMedia = 108000
        } else if (segmento == "energia") {
            faturamentoMedia = 33333333
        } else {
            faturamentoMedia = 140000
        }

        if (faturamentoMedia > faturamentoCliente) {
            respostaFaturamento = "abaixo da média"
        } else {
            respostaFaturamento = "acima da média"
        }

        if (porcentagemProblemas >= 80) {
            respostaPorcentagem = "muito acima da média"
        } else if (porcentagemProblemas >= 50) {
            respostaPorcentagem = "acima da média"
        } else if (porcentagemProblemas >= 40) {
            respostaPorcentagem = "altas"
        } else if (porcentagemProblemas >= 20) {
            respostaPorcentagem = "médias"
        } else {
            respostaPorcentagem = "controladas"
        }
        let faturamentoFormatado = faturamentoMedia.toLocaleString('pt-BR', { style: 'currency', currency: "BRL" });

        prejuizo.innerHTML = `<p>Faturamento de ${faturamentoCliente.toLocaleString('pt-BR', { style: 'currency', currency: "BRL" })} está ${respostaFaturamento}. <br> Ocorrências em ${porcentagemProblemas.toFixed(0)}%, ${respostaPorcentagem}</p>`
        evitar.innerHTML = `<p>${faturamentoCliente * 30 / 100}%</p>`
        lucro.innerHTML = `<p>${faturamentoFormatado}</p>`
    }
}