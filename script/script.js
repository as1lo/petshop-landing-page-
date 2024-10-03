//LEVAR PRODUTO PRO CARRINHO
function SelecionarProdutos(produto) {
  localStorage.setItem("produto", produto);
  window.location.href = "checkout.html";
}

//PEGAR PRODUTOS
function getProduto() {
  const SelecionarProdutos = localStorage.getItem("produto");

  const produtoimagem = {
    racaocachorro: "assets/racao-cachorro.png",
    sachegato: "assets/sache-gato.png",
    racaofurao: "assets/racao-furao.png",
    locomochila: "assets/locomochila.png",
    gaiola: "assets/gaiola-aves.png",
    bebedouro: "assets/bebedouro-reptil.png",
  };

  const produtovalor = {
    racaocachorro: 39.99,
    sachegato: 9.99,
    racaofurao: 24.99,
    locomochila: 34.99,
    gaiola: 51.80,
    bebedouro: 78.90,
  };

  const produtonome = {
    racaocachorro: "Ração Cachorro",
    sachegato: "Sachê Gato",
    racaofurao: "Ração Furão",
    locomochila: "Locomochila",
    gaiola: "Gaiola de Aves",
    bebedouro: "Bebedouro Réptil",
  };

  const productData = {
    name: produtonome[SelecionarProdutos],
    price: produtovalor[SelecionarProdutos],
    image: produtoimagem[SelecionarProdutos],
    quantity: 1,
  };

  let tabela = JSON.parse(localStorage.getItem("tabela")) || [];
  var existInTabela = false;

  if (tabela && tabela.length > 0) {
    tabela.forEach((item) => {
      if (item.name == productData.name) {
        existInTabela = true;

      }
    })
    if (!existInTabela) {
      tabela.push(productData);

      localStorage.setItem("tabela", JSON.stringify(tabela));
    }
  } else {
    tabela.push(productData);

    localStorage.setItem("tabela", JSON.stringify(tabela));

  }

  //document.getElementById("produtoimagem").src =
  //produtoimagem[SelecionarProdutos];

  //document.getElementById("total").textContent =
  //"Total: " + produtovalor[SelecionarProdutos];

  //document.getElementById("valor").textContent =
  //produtovalor[SelecionarProdutos];

  //document.getElementById("item-produto-dynamic").textContent =
  //produtonome[SelecionarProdutos];
  displayTabela();
}

function displayTabela() {
  const tabela = JSON.parse(localStorage.getItem("tabela"));
  const tabelaList = document.getElementById("tabela");


  tabelaList.innerHTML = "";


  const headerRow = document.createElement("tr");
  const headers = ["Produto", "Valor", "Quantidade", "Deletar"];

  headers.forEach((headerText) => {
    const th = document.createElement("th");
    th.textContent = headerText;
    headerRow.appendChild(th);
  });


  tabelaList.appendChild(headerRow);


  if (tabela && tabela.length > 0) {

    tabela.forEach((item) => {
      const totalCompra = document.createElement("p");
      const tabelaLinha = document.createElement("tr");
      const cellProduto = document.createElement("td");
      const itemImage = document.createElement("img");


      var totalText = document.getElementById("total").textContent || "0";  
      var total = parseFloat(totalText, 10);  
     
        total += item.price;
        document.getElementById("total").textContent = total.toFixed(2);
      

      itemImage.src = item.image;
      itemImage.alt = item.name;
      itemImage.height = 50;

      cellProduto.appendChild(itemImage);

      const itemName = document.createElement("p");
      itemName.textContent = item.name;
      cellProduto.appendChild(itemName);


      const cellValor = document.createElement("td");
      const itemPrice = document.createElement("p");
      itemPrice.textContent = item.price;
      cellValor.appendChild(itemPrice);


      const cellQuantidade = document.createElement("td");
      const itemQuantity = document.createElement("p");
      const divbtnQuant = document.createElement("div")
      const btnMais = document.createElement("button")
      const btnMenos = document.createElement("button")

      btnMenos.onclick = function (){ somarQuant(0) }
      btnMais.onclick = function (){ somarQuant(1) }

      btnMais.textContent = "+"
      btnMenos.textContent = "-"
      itemQuantity.id = "quant"
      divbtnQuant.className = "cont-quantidade"


      itemQuantity.textContent = item.quantity;

      divbtnQuant.appendChild(btnMenos)
      divbtnQuant.appendChild(itemQuantity)
      divbtnQuant.appendChild(btnMais)

      cellQuantidade.appendChild(divbtnQuant);


      const cellDelete = document.createElement("td");
      const deleteButton = document.createElement("button");
      deleteButton.textContent = "Remover";
      deleteButton.onclick = () => removeItem(item.name);
      cellDelete.appendChild(deleteButton);


      tabelaLinha.appendChild(cellProduto);
      tabelaLinha.appendChild(cellValor);
      tabelaLinha.appendChild(cellQuantidade);
      tabelaLinha.appendChild(cellDelete);


      tabelaList.appendChild(tabelaLinha);
    });
  } else {

    tabelaList.innerHTML = "<p>Carrinho vazio</p>";
  }
}

function removeItem(productName) {
  let tabela = JSON.parse(localStorage.getItem("tabela")) || [];
  tabela = tabela.filter((item) => item.name !== productName);
  localStorage.setItem("tabela", JSON.stringify(tabela));
  displayTabela();
}

//VOLTAR PÁGINA
function goback() {
  window.location.href = "index.html";
}

//SOMAR QUANT DO PRODUTO
function somarQuant(btn) {
  if (btn == 1) {
    var contText = document.getElementById("quant").textContent;
    var cont = parseInt(contText);
    cont++;
    document.getElementById("quant").textContent = cont;
  } else {
    var contText = document.getElementById("quant").textContent;
    var cont = parseInt(contText);
    if (cont > 1) {
      cont--;
    }

    document.getElementById("quant").textContent = cont;
  }
}
