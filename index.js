// seleciona todos os botoes
const botoesEscolher = document.querySelectorAll('.escolher');

// lista de encomenda
const listaEncomenda = document.getElementById('lista-Encomenda');

// elementos de exibição
const totalElemento = document.getElementById('total');
const descontoElemento = document.getElementById('desconto');
const totalFinalElemento = document.getElementById('total-final');

// variáveis
let quantidade = 0;
let desconto = 0;

// clique nos produtos
botoesEscolher.forEach((botao) => {
    botao.addEventListener("click", () => {

        const produto = botao.parentElement;

        const nome = produto.querySelector("h2").textContent;

        const preco = parseFloat(
            produto.querySelector('.preco').textContent
                .replace("R$", "")
                .replace(",", ".")
        );

        const itemEncomenda = document.createElement('li');
        itemEncomenda.textContent = `${nome} - R$ ${preco.toFixed(2)}`;
        listaEncomenda.appendChild(itemEncomenda);

        // quantidade de itens
        quantidade++;

        // total sem desconto
        let totalSemDesconto = quantidade * 15;

        // desconto (a cada 2 itens ganha 5)
        desconto = Math.floor(quantidade / 2) * 5;

        // total final
        let totalFinal = totalSemDesconto - desconto;

        // atualiza tela
        totalElemento.textContent = `Total: R$ ${totalSemDesconto.toFixed(2)}`;
        descontoElemento.textContent = `Desconto: R$ ${desconto.toFixed(2)}`;
        totalFinalElemento.textContent = `Total com desconto: R$ ${totalFinal.toFixed(2)}`;
    });
});

// botão finalizar
const botaoFinalizarEncomenda = document.getElementById("Finalizar-Encomenda");

botaoFinalizarEncomenda.addEventListener("click", () => {
    alert("Encomenda Finalizada!");

    listaEncomenda.innerHTML = "";
    quantidade = 0;
    desconto = 0;

    totalElemento.textContent = "Total: R$ 0,00";
    descontoElemento.textContent = "Desconto: R$ 0,00";
    totalFinalElemento.textContent = "Total com desconto: R$ 0,00";
});             