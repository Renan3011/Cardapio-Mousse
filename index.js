document.addEventListener("DOMContentLoaded", () => {
  const botoesEscolher = document.querySelectorAll(".escolher");
  const listaEncomenda = document.getElementById("lista-Encomenda");
  const totalElemento = document.getElementById("total");
  const descontoElemento = document.getElementById("desconto");
  const totalFinalElemento = document.getElementById("total-final");
  const botaoFinalizar = document.getElementById("FinalizarEncomenda");

  const toastCarrinho = document.getElementById("toast-carrinho");
  const toastMensagem = document.getElementById("toast-mensagem");
  const btnIrCarrinho = document.getElementById("btn-ir-carrinho");

  let timeoutToast;
  let carrinho = [];

  function mostrarToastCarrinho(nomeProduto) {
    if (!toastCarrinho || !toastMensagem) return;

    toastMensagem.textContent = `${nomeProduto} foi adicionado ao carrinho!`;
    toastCarrinho.classList.add("mostrar");

    clearTimeout(timeoutToast);

    timeoutToast = setTimeout(() => {
      toastCarrinho.classList.remove("mostrar");
    }, 2500);
  }

  function atualizarCarrinhoNaTela() {
    listaEncomenda.innerHTML = "";

    let totalSemDesconto = 0;

    carrinho.forEach((item, index) => {
      totalSemDesconto += item.preco;

      const li = document.createElement("li");
      li.classList.add("item-carrinho");

      li.innerHTML = `
        <span>${item.nome} - R$ ${item.preco.toFixed(2).replace(".", ",")}</span>
        <button class="remover" data-index="${index}">❌</button>
      `;

      listaEncomenda.appendChild(li);
    });

    const quantidade = carrinho.length;
    const desconto = Math.floor(quantidade / 2) * 5;
    const totalFinal = totalSemDesconto - desconto;

    totalElemento.textContent = `Total: R$ ${totalSemDesconto.toFixed(2).replace(".", ",")}`;
    descontoElemento.textContent = `Desconto: R$ ${desconto.toFixed(2).replace(".", ",")}`;
    totalFinalElemento.textContent = `Total com desconto: R$ ${totalFinal.toFixed(2).replace(".", ",")}`;
  }

  function salvarPedidoNoLocalStorage() {
    const quantidade = carrinho.length;
    const totalSemDesconto = carrinho.reduce((soma, item) => soma + item.preco, 0);
    const desconto = Math.floor(quantidade / 2) * 5;
    const totalFinal = totalSemDesconto - desconto;

    const pedido = {
      itens: carrinho,
      total: totalSemDesconto,
      desconto: desconto,
      totalFinal: totalFinal
    };

    localStorage.setItem("pedido", JSON.stringify(pedido));
  }

  function carregarCarrinhoSalvo() {
    const pedidoSalvo = localStorage.getItem("pedido");

    if (pedidoSalvo) {
      try {
        const pedidoConvertido = JSON.parse(pedidoSalvo);

        if (pedidoConvertido.itens && Array.isArray(pedidoConvertido.itens)) {
          carrinho = pedidoConvertido.itens;
          atualizarCarrinhoNaTela();
        }
      } catch (erro) {
        console.error("Erro ao carregar carrinho salvo:", erro);
        localStorage.removeItem("pedido");
      }
    }
  }

  botoesEscolher.forEach((botao) => {
    botao.addEventListener("click", () => {
      const produto = botao.closest(".produto");

      if (!produto) {
        console.error("Não encontrei o elemento .produto");
        return;
      }

      const titulo = produto.querySelector("h2");
      const precoSpan = produto.querySelector(".preco");

      if (!titulo || !precoSpan) {
        console.error("Não encontrei h2 ou .preco dentro do produto");
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

      carrinho.push({
        nome: nomeProduto,
        preco: preco
      });

      atualizarCarrinhoNaTela();
      salvarPedidoNoLocalStorage();
      mostrarToastCarrinho(nomeProduto);
    });
  });

  listaEncomenda.addEventListener("click", (e) => {
    if (e.target.classList.contains("remover")) {
      const index = Number(e.target.getAttribute("data-index"));

      carrinho.splice(index, 1);

      atualizarCarrinhoNaTela();
      salvarPedidoNoLocalStorage();
    }
  });

  if (btnIrCarrinho) {
    btnIrCarrinho.addEventListener("click", () => {
      const secaoCarrinho = document.getElementById("encomenda");

      if (secaoCarrinho) {
        secaoCarrinho.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });
      }

      if (toastCarrinho) {
        toastCarrinho.classList.remove("mostrar");
      }
    });
  }

  if (botaoFinalizar) {
    botaoFinalizar.addEventListener("click", () => {
      if (carrinho.length === 0) {
        mostrarPopup("Adicione pelo menos 1 item antes de finalizar.");
        return;
      }

      salvarPedidoNoLocalStorage();
      window.location.href = "Finalizar.html";
    });
  }

  carregarCarrinhoSalvo();
});