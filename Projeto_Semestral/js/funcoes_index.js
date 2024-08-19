//Menu\\

//Função para mostrar opções do Menu

function drop_menu() {
  document.getElementById("menu-dropdown").classList.toggle("show");
}
  
window.onclick = function(event) {
  if (!event.target.matches('.fa-bars')) {
    var dropdowns = document.getElementsByClassName("dropdown-conteudo");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var abrirDropdown = dropdowns[i];
      if (abrirDropdown.classList.contains('show')) {
        abrirDropdown.classList.remove('show');
      }
    }
  }
}

//-------------------------------------------------------------------------------\\
//Barra de Pesquisa\\

//Função para buscar produto

function buscar() {
  var input = document.getElementById("txt-busca");
  var filter = input.value.toUpperCase();
  var cards = document.querySelectorAll(".card");

  cards.forEach(function (card) {
    var titulo = card.querySelector(".card-titulo").textContent || card.querySelector(".card-titulo").innerText;
    if (titulo.toUpperCase().indexOf(filter) > -1) {
      card.style.display = "flex";
    } else {
      card.style.display = "none";
    }
  });
}

// Event listener para o input de pesquisa

document.getElementById("txt-busca").addEventListener("input", buscar);

//-------------------------------------------------------------------------------\\
//Produtos\\

//Função para mostrar cards

window.onload = async function () {
  var resultado = await fetch("php/produto.php", {
    method: "GET"
  });
  var dados = await resultado.json();
  for(var i = 0; i < dados.length; i++) {

    var conteudo = 
      `<div class="card">
        <div class="card-imagem" title="${dados[i].nome}">
          <img src="image/produto/${dados[i].nome}.webp">
        </div>
        <div class="card-titulo"> ${dados[i].nome} </div>
        <div class="card-preco"><b>R$ ${dados[i].preco}</b></div>
        <div class="card-carrinho-add" title="Adicionar" onclick="add_carrinho(${dados[i].id_produto})">
          <i class="fa-solid fa-cart-plus"></i> Adicionar ao carrinho
        </div>
      </div>`;
              
    document.getElementById('produtos').innerHTML += conteudo;
  }
}

//Função para adicionar produto no carrinho

function add_carrinho(id_produto) {
  var dados = new FormData();
  dados.append("produto_id", id_produto);

  if (id_produto != '' && id_produto != null) {
    var elementoClicado = event.currentTarget; // Acesse o elemento que disparou o evento
    fetch("php/add_carrinho.php", {
      method: "POST",
      body: dados
    }).then(response => {
      if (response.ok) {
        // Mudar a cor apenas do elemento clicado
        elementoClicado.classList.add("confirmacao");
        setTimeout(() => {
          elementoClicado.classList.remove("confirmacao");
        }, 1000);
      }
    })
    .catch(error => {
      console.error("Erro no fetch:", error);
    });
  } else {
    alert("Problemas ao carregar o produto no carrinho");
  }
}

