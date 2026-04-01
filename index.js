const botoesEscolher = document.querySelectorAll(".escolher");
const listaEncomenda = document.getElementById("lista-Encomenda");
const totalElemento = document.getElementById("total");
const descontoElemento = document.getElementById("desconto");
const totalFinalElemento = document.getElementById("total-final");

const toastCarrinho = document.getElementById("toast-carrinho");
const toastMensagem = document.getElementById("toast-mensagem");
const btnIrCarrinho = document.getElementById("btn-ir-carrinho");

let quantidade = 0;
let desconto = 0;
let totalSemDesconto = 0;
let timeoutToast;

function mostrarToastCarrinho(nomeProduto) {
  toastMensagem.textContent = `${nomeProduto} foi adicionado ao carrinho!`;

  toastCarrinho.classList.add("mostrar");

  clearTimeout(timeoutToast);

  timeoutToast = setTimeout(() => {
    toastCarrinho.classList.remove("mostrar");
  }, 2500);
}

if (btnIrCarrinho) {
  btnIrCarrinho.addEventListener("click", () => {
    const secaoCarrinho = document.getElementById("encomenda");

    if (secaoCarrinho) {
      secaoCarrinho.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    }

    toastCarrinho.classList.remove("mostrar");
  });
}

botoesEscolher.forEach((botao) => {
  botao.addEventListener("click", () => {
    const produto = botao.closest(".produto");

    if (!produto) {
      console.error("Não encontrei .produto");
      return;
    }

    const titulo = produto.querySelector("h2");
    const precoSpan = produto.querySelector(".preco");

    if (!titulo || !precoSpan) {
      console.error("Não encontrei h2 ou .preco");
      return;
    }

    const nomeProduto = titulo.textContent.trim();
    const precoTexto = precoSpan.textContent
      .replace("R$", "")
      .replace(",", ".")
      .trim();

    const preco = parseFloat(precoTexto);

    if (isNaN(preco)) {
      console.error("Preço inválido:", precoTexto);
      return;
    }

    const itemEncomenda = document.createElement("li");
    itemEncomenda.textContent = `${nomeProduto} - R$ ${preco.toFixed(2).replace(".", ",")}`;
    listaEncomenda.appendChild(itemEncomenda);

    quantidade++;
    totalSemDesconto += preco;

    desconto = Math.floor(quantidade / 2) * 5;
    const totalFinal = totalSemDesconto - desconto;

    totalElemento.textContent = `Total: R$ ${totalSemDesconto.toFixed(2).replace(".", ",")}`;
    descontoElemento.textContent = `Desconto: R$ ${desconto.toFixed(2).replace(".", ",")}`;
    totalFinalElemento.textContent = `Total com desconto: R$ ${totalFinal.toFixed(2).replace(".", ",")}`;

    mostrarToastCarrinho(nomeProduto);
  });
});

function irParaFinalizacao() {
  const itens = listaEncomenda.querySelectorAll("li");

  if (itens.length === 0) {
    alert("Adicione pelo menos 1 item antes de finalizar.");
    return;
  }

  const dadosPedido = {
    itens: listaEncomenda.innerHTML,
    total: totalElemento.textContent,
    desconto: descontoElemento.textContent,
    totalFinal: totalFinalElemento.textContent
  };

  localStorage.setItem("pedido", JSON.stringify(dadosPedido));

  window.location.href = "Finalizar.html";
}