// Função para carregar os produtos do arquivo CSV
function carregarProdutos(){
    fetch('/file/produtos.csv')
    .then(response => response.text())
    .then(csv => {
        const produtos = csv.split('\n').slice(1).map(linha => {
            const [nome, preco, imagem] = linha.split(';');
            return { nome, preco, imagem };
        });

        const listaProdutos =document.getElementById('lista-produtos');
        produtos.forEach(produto => {
            const div = document.createElement('div');
            div.classList.add('produto');
            div.innerHTML = `
                <h3>${produto.nome}</h3>
                <img src="${produto.imagem}" alt="${produto.nome}">
                <p>Preço: R$ ${produto.preco}</p>
                <button onclick="adicionarAoCarrinho('${produto.nome}', ${produto.preco}, '${produto.imagem}')">Adicionar ao Carrinho</button>
            `;
            listaProdutos.appendChild(div);
        });
    });
}

// Função para adicionar um produto ao carrinho
function adicionarAoCarrinho(nome, preco, imagem) {
    const carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
    carrinho.push({ nome, preco, imagem});
    localStorage.setItem('carrinho', JSON.stringify(carrinho));
    atualizarCarrinho();
}

function removerDoCarrinho(nome) {
    let carrinho = JSON.parse(localStorage.getItem('carrinho)')) || [];
    carrinho = carrinho.filter(item => item.nome !== nome);
    localStorage.setItem('carrinho', JSON.stringify(carrinho));
    atualizarCarrinho();
}

// Função para atualizar a exibição do carrinho
function atualizarCarrinho() {
    const carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
    const listaCarrinho = document.getElementById('lista-carrinho');
    listaCarrinho.innerHTML = '';
    carrinho.forEach(item => {
        const div = document.createElement('div');
        div.innerHTML = `
        <img src="${item.imagem}" alt="${item.nome}" width="50">
        <span>${item.nome} - R$ ${item.preco}</span>
        <button onclick="removerDoCarrinho('${item.nome}')">Remover</button>
        `;
        listaCarrinho.appendChild(div);
    });
}

// Carregar os produtos e atualizar o carrinho ao carregar a página
window.onload = () => {
    carregarProdutos();
    atualizarCarrinho();
};