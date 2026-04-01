document.addEventListener("DOMContentLoaded", () => {
  const resumoLista = document.getElementById("resumo-lista");
  const resumoTotal = document.getElementById("resumo-total");
  const resumoDesconto = document.getElementById("resumo-desconto");
  const resumoFinal = document.getElementById("resumo-final");
  const btnConcluir = document.getElementById("btn-concluir");

  const nome = document.getElementById("nome");
  const email = document.getElementById("email");
  const telefone = document.getElementById("telefone");
  const endereco = document.getElementById("endereco");
  const dataEntrega = document.getElementById("data-entrega");
  const pagamento = document.getElementById("pagamento");
  const observacoes = document.getElementById("observacoes");

  const pedidoSalvo = localStorage.getItem("pedido");

  if (!pedidoSalvo) {
    resumoLista.innerHTML = "<li>Nenhum pedido encontrado.</li>";
    return;
  }

  let pedido;

  try {
    pedido = JSON.parse(pedidoSalvo);
  } catch (erro) {
    console.error("Erro ao ler pedido do localStorage:", erro);
    resumoLista.innerHTML = "<li>Erro ao carregar o pedido.</li>";
    return;
  }

  if (!pedido.itens || !Array.isArray(pedido.itens) || pedido.itens.length === 0) {
    resumoLista.innerHTML = "<li>Nenhum item no pedido.</li>";
    return;
  }

  resumoLista.innerHTML = "";

  pedido.itens.forEach((item) => {
    const li = document.createElement("li");
    li.textContent = `${item.nome} - R$ ${item.preco.toFixed(2).replace(".", ",")}`;
    resumoLista.appendChild(li);
  });

  resumoTotal.textContent = `Total: R$ ${pedido.total.toFixed(2).replace(".", ",")}`;
  resumoDesconto.textContent = `Desconto: R$ ${pedido.desconto.toFixed(2).replace(".", ",")}`;
  resumoFinal.textContent = `Total com desconto: R$ ${pedido.totalFinal.toFixed(2).replace(".", ",")}`;

  btnConcluir.addEventListener("click", () => {
    if (
      nome.value.trim() === "" ||
      email.value.trim() === "" ||
      telefone.value.trim() === "" ||
      endereco.value.trim() === "" ||
      dataEntrega.value.trim() === "" ||
      pagamento.value.trim() === ""
    ) {
      alert("Preencha todos os campos obrigatórios antes de concluir.");
      return;
    }

    const pedidoCompleto = {
      cliente: {
        nome: nome.value.trim(),
        email: email.value.trim(),
        telefone: telefone.value.trim(),
        endereco: endereco.value.trim(),
        dataEntrega: dataEntrega.value,
        pagamento: pagamento.value,
        observacoes: observacoes.value.trim()
      },
      itens: pedido.itens,
      total: pedido.total,
      desconto: pedido.desconto,
      totalFinal: pedido.totalFinal
    };

    console.log("Pedido concluído:", pedidoCompleto);

    alert("Pedido concluído com sucesso! 🎉");

    // Se quiser limpar o carrinho após concluir:
    localStorage.removeItem("pedido");
    

    // Redireciona de volta para a página principal
    window.location.href = "index.html";
  });
});