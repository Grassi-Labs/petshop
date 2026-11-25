/* =========================================================
   FUNÇÕES JAVASCRIPT - PETSHOP
   ========================================================= */

var tamanho_fonte = 16;

// Atualiza data, hora e status de atendimento a cada segundo
function atualiza_relogio() {
    var data = new Date();
    var dia = data.getDate();
    var mes = data.getMonth() + 1;
    var ano = data.getFullYear();
    var hora = data.getHours();
    var minuto = data.getMinutes();
    var segundo = data.getSeconds();

    if (dia < 10) {
        dia = "0" + dia;
    }
    if (mes < 10) {
        mes = "0" + mes;
    }
    if (hora < 10) {
        hora = "0" + hora;
    }
    if (minuto < 10) {
        minuto = "0" + minuto;
    }
    if (segundo < 10) {
        segundo = "0" + segundo;
    }

    var dia_semana = data.getDay();
    var status = "Fechado no momento (agendamento online disponível 24h)";
    if (dia_semana >= 1 && dia_semana <= 6 && hora >= 8 && hora < 19) {
        status = "Aberto agora (atendimento até 19h)";
    }

    document.getElementById("relogio_status").innerHTML =
        dia + "/" + mes + "/" + ano + " - " + hora + ":" + minuto + ":" + segundo + " | " + status;
}

setInterval(atualiza_relogio, 1000);

// Inicializa o relógio e o valor padrão ao carregar a página
function inicia_pagina() {
    atualiza_relogio();
    calcula_valor();
}

// Calcula o valor estimado do serviço conforme as opções selecionadas
function calcula_valor() {
    var valor = 0;

    if (document.getElementById("servico_banho_tosa").checked) {
        valor = 60.00;
    } else if (document.getElementById("servico_banho_simples").checked) {
        valor = 45.00;
    }

    if (document.getElementById("extra_hidratacao").checked) {
        valor = valor + 15.00;
    }

    if (document.getElementById("metodo_telebusca").checked) {
        valor = valor + 25.00;
    }

    document.getElementById("valor_estimado").innerHTML =
        "R$ " + parseFloat(valor).toFixed(2).replace(".", ",");
}

// Exibe e oculta automaticamente o aviso temporário
function mostra_aviso_temporario() {
    var caixa_aviso = document.getElementById("aviso_temporario");
    caixa_aviso.style.display = "block";
    setTimeout(esconde_aviso_temporario, 6000);
}

function esconde_aviso_temporario() {
    document.getElementById("aviso_temporario").style.display = "none";
}

// Exibe o resumo do agendamento após a validação nativa do formulário
function confirma_agendamento() {
    calcula_valor();

    var nome_cliente = document.getElementById("nome_cliente").value;
    var telefone_cliente = document.getElementById("telefone_cliente").value;
    var nome_pet = document.getElementById("nome_pet").value;
    var raca_pet = document.getElementById("raca_pet").value;
    var idade_pet = document.getElementById("idade_pet").value;
    var data_agenda = document.getElementById("data_agendamento").value;
    var hora_agenda = document.getElementById("hora_agendamento").value;

    var servico = "Banho e Tosa Tradicional";
    if (document.getElementById("servico_banho_simples").checked) {
        servico = "Banho Simples com Hidratação";
    }

    var metodo = "Entrega do pet no local (Balcão)";
    if (document.getElementById("metodo_telebusca").checked) {
        metodo = "Tele-busca em domicílio";
    }

    var total = document.getElementById("valor_estimado").innerHTML;

    var caixa_resultado = document.getElementById("resultado_agendamento");
    caixa_resultado.className = "alert alert-success mt-4";
    caixa_resultado.innerHTML =
        "<h4>Agendamento Confirmado com Sucesso!</h4>" +
        "<p><strong>Tutor(a):</strong> " + nome_cliente + " | <strong>Telefone:</strong> " + telefone_cliente + "</p>" +
        "<p><strong>Pet:</strong> " + nome_pet + " (" + raca_pet + ", " + idade_pet + " ano(s))</p>" +
        "<p><strong>Serviço:</strong> " + servico + " | <strong>Modalidade:</strong> " + metodo + "</p>" +
        "<p><strong>Data e Horário:</strong> " + data_agenda + " às " + hora_agenda + "</p>" +
        "<p class='mb-0'><strong>Valor Total Estimado:</strong> " + total + "</p>";

    alert("Cadastro e agendamento confirmados com sucesso!");
    mostra_aviso_temporario();
    return false;
}

// Limpa o resumo na tela ao resetar o formulário
function limpa_formulario() {
    var caixa_resultado = document.getElementById("resultado_agendamento");
    caixa_resultado.className = "";
    caixa_resultado.innerHTML = "";
    esconde_aviso_temporario();
    setTimeout(calcula_valor, 50);
}

// =========================================================
// CONTROLES DE ACESSIBILIDADE VISUAL
// =========================================================

function aumenta_fonte() {
    if (tamanho_fonte < 22) {
        tamanho_fonte = tamanho_fonte + 2;
        document.body.style.fontSize = tamanho_fonte + "px";
    }
}

function diminui_fonte() {
    if (tamanho_fonte > 14) {
        tamanho_fonte = tamanho_fonte - 2;
        document.body.style.fontSize = tamanho_fonte + "px";
    }
}

function fonte_padrao() {
    tamanho_fonte = 16;
    document.body.style.fontSize = "16px";
}

function alto_contraste() {
    if (document.body.className == "alto_contraste") {
        document.body.className = "";
    } else {
        document.body.className = "alto_contraste";
    }
}