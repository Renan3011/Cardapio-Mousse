//simulação para adicionar itens a encomenda
//seleciona todos os botoes que possuem classe 
// "categoria"
const botoesEscolher = document.querySelectorAll('.escolher');

//seleciona a lista onde as encomendas serao exibidas
const listaEncomenda = document.getElementById ('lista-Encomenda');

//seleciona o elemento que exibira o valor total da encomenda
const totalElemento = document.getElementById('total');

//cria a variavel que armazena o valor total da encomenda
let total = 0;


//percorre todos os botoes com class "adicionar"
//e adiciona um evento de click em cada um deles

botoesEscolher.forEach((botao) => {
    botao.addEventListener("click", () =>{
        //obtem o elemento pai do botao (card do produto)
        const produto = botao.parentElement;

        //obtem o nome o peidurto a partir do texto da tag <h2>
        const  nome = produto.querySelector("h2").textContent;

        //obtem o preco do produto, removendo o texto 'R$
        const preco = parseFloat(produto.querySelector('.preco').textContent.replace("R$", "").replace(",", "."));

        //cria um item de lista para adicionar o produto a encomenda
        const itemEncomenda = document.createElement('li');
        itemEncomenda.textContent = `${nome} - R$ ${preco.toFixed(2)}`;

        //adiciona o item criado a lista de encomendas
        listaEncomenda.appendChild(itemEncomenda);

        //atualiza o total da compra somando o preço do novo item
        total += preco;

        //atualiza o texto do elemento que exibe o total da encomenda
        totalElemento.textContent = `Total: R$ ${total.toFixed(2)}`;
    });
}); ;