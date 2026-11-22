/* =========================================================
   FUNÇÕES JAVASCRIPT - PETSHOP
   ========================================================= */

// Variável para controlar o tamanho da fonte
var tamanhoFonteAtual = 16;

// Função temporal: atualiza data, hora e status da loja a cada 1 segundo
function atualizarRelogio() {
    var agora = new Date();
    var dataFormatada = agora.toLocaleDateString("pt-BR");
    var horaFormatada = agora.toLocaleTimeString("pt-BR");
    var hora = agora.getHours();
    var diaSemana = agora.getDay(); // 0 = Domingo, 6 = Sábado

    var statusLoja = "";
    // Loja aberta de segunda (1) a sábado (6), das 08h às 19h
    if (diaSemana >= 1 && diaSemana <= 6 && hora >= 8 && hora < 19) {
        statusLoja = "Aberto agora (atendimento até 19h)";
    } else {
        statusLoja = "Fechado no momento (agendamento online disponível 24h)";
    }

    var elementoRelogio = document.getElementById("relogio-status");
    if (elementoRelogio) {
        elementoRelogio.innerHTML = dataFormatada + " - " + horaFormatada + " | " + statusLoja;
    }
}

// Inicia o temporizador de 1000ms (1 segundo)
setInterval(atualizarRelogio, 1000);

// Configura a data mínima do calendário para hoje ao carregar a página
function configurarDataMinima() {
    atualizarRelogio();

    var campoData = document.getElementById("data_agendamento");
    if (campoData) {
        var hoje = new Date();
        var ano = hoje.getFullYear();
        var mes = String(hoje.getMonth() + 1).padStart(2, "0");
        var dia = String(hoje.getDate()).padStart(2, "0");
        campoData.min = ano + "-" + mes + "-" + dia;
    }
}

// Calcula o valor estimado do serviço conforme as opções marcadas no formulário
function calcularValorServico() {
    var total = 0;

    // Verifica qual serviço foi escolhido (radio button)
    var servicoBanhoTosa = document.getElementById("servico_banho_tosa");
    var servicoBanhoSimples = document.getElementById("servico_banho_simples");

    if (servicoBanhoTosa && servicoBanhoTosa.checked) {
        total = total + 60;
    } else if (servicoBanhoSimples && servicoBanhoSimples.checked) {
        total = total + 45;
    }

    // Verifica se o checkbox de hidratação extra está marcado
    var checkHidratacao = document.getElementById("extra_hidratacao");
    if (checkHidratacao && checkHidratacao.checked) {
        total = total + 15;
    }

    // Verifica se o cliente escolheu tele-busca (+ R$ 25,00)
    var radioTeleBusca = document.getElementById("metodo_telebusca");
    if (radioTeleBusca && radioTeleBusca.checked) {
        total = total + 25;
    }

    // Atualiza o valor na tela
    var campoValor = document.getElementById("valor-estimado");
    if (campoValor) {
        campoValor.innerHTML = "R$ " + total.toFixed(2).replace(".", ",");
    }
}

// Processa o envio do formulário e mostra a confirmação na tela
function confirmarAgendamento(event) {
    event.preventDefault(); // Evita recarregar a página no GitHub Pages

    var nomeCliente = document.getElementById("nome_cliente").value;
    var telefone = document.getElementById("telefone_cliente").value;
    var nomePet = document.getElementById("nome_pet").value;
    var racaPet = document.getElementById("raca_pet").value;
    var idadePet = document.getElementById("idade_pet").value;
    var dataAgenda = document.getElementById("data_agendamento").value;
    var horaAgenda = document.getElementById("hora_agendamento").value;

    // Identifica o serviço selecionado
    var servicoTexto = "Banho e Tosa Tradicional";
    if (document.getElementById("servico_banho_simples").checked) {
        servicoTexto = "Banho Simples com Hidratação";
    }

    // Identifica o método de entrega/busca
    var metodoTexto = "Entrega do pet no local (Balcão)";
    if (document.getElementById("metodo_telebusca").checked) {
        metodoTexto = "Tele-busca em domicílio";
    }

    // Formata a data de AAAA-MM-DD para DD/MM/AAAA
    var partesData = dataAgenda.split("-");
    var dataBr = partesData[2] + "/" + partesData[1] + "/" + partesData[0];

    var valorFinal = document.getElementById("valor-estimado").innerHTML;

    // Monta o resumo do cadastro e agendamento
    var caixaResultado = document.getElementById("resultado-agendamento");
    caixaResultado.className = "alert alert-success mt-4";
    caixaResultado.innerHTML =
        "<h4>Agendamento Confirmado com Sucesso!</h4>" +
        "<p><strong>Tutor(a):</strong> " + nomeCliente + " | <strong>Telefone:</strong> " + telefone + "</p>" +
        "<p><strong>Pet:</strong> " + nomePet + " (" + racaPet + ", " + idadePet + " ano(s))</p>" +
        "<p><strong>Serviço:</strong> " + servicoTexto + " | <strong>Modalidade:</strong> " + metodoTexto + "</p>" +
        "<p><strong>Data e Horário:</strong> " + dataBr + " às " + horaAgenda + "</p>" +
        "<p class='mb-0'><strong>Valor Total Estimado:</strong> " + valorFinal + "</p>";

    // Função temporal: exibe aviso temporário por 6 segundos usando setTimeout
    var avisoTemp = document.getElementById("aviso-temporario");
    avisoTemp.style.display = "block";
    setTimeout(function () {
        avisoTemp.style.display = "none";
    }, 6000);
}

// Limpa o resumo na tela quando o usuário clica no botão Reset
function limparFormulario() {
    var caixaResultado = document.getElementById("resultado-agendamento");
    caixaResultado.className = "";
    caixaResultado.innerHTML = "";

    // Aguarda o reset nativo dos campos e recalcula o valor padrão
    setTimeout(calcularValorServico, 50);
}

// =========================================================
// FUNÇÕES DE ACESSIBILIDADE
// =========================================================

function alterarFonte(diferenca) {
    tamanhoFonteAtual = tamanhoFonteAtual + diferenca;

    if (tamanhoFonteAtual < 14) {
        tamanhoFonteAtual = 14;
    }
    if (tamanhoFonteAtual > 22) {
        tamanhoFonteAtual = 22;
    }

    document.documentElement.style.fontSize = tamanhoFonteAtual + "px";
}

function restaurarFonte() {
    tamanhoFonteAtual = 16;
    document.documentElement.style.fontSize = "16px";
}

function alternarAltoContraste() {
    document.body.classList.toggle("alto-contraste");
}