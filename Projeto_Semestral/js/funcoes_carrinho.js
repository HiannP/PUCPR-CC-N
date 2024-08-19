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
//Produtos\\

//Função para mostrar cards

window.onload = async function () {
  var resultado = await fetch("../php/produto_carrinho.php", {
    method: "GET"
  });

  var dados = await resultado.json();
  for(var i = 0; i < dados.length; i++) {

    var conteudo = 
      `<div class="card">
        <div class="card-lado-direito">
          <div class="card-imagem" title="${dados[i].nome}">
            <img src="../image/produto/${dados[i].nome}.webp">
          </div>
          <div class="card-conteudo">
            <div class="card-titulo"> ${dados[i].nome} </div>
            <div class="card-preco">R$ ${dados[i].preco} </div>
          </div>
        </div>

        <div class="card-lado-esquerdo">
          <i class="fa-solid fa-xmark" onclick="del_carrinho(${dados[i].produto_id})"></i>
        </div>
      </div>`;
              
    document.getElementById('produtos').innerHTML += conteudo;
  }
}

//Função para retirar produto do carrinho

function del_carrinho(produto_id) {
  var dados = new FormData();
  dados.append("produto_id", produto_id);

  if (produto_id != '' && produto_id != null) {
    fetch("../php/del_carrinho.php", {
      method: "POST",
      body: dados
    });
    location.reload();
  } else {
    alert("Problemas para retirar o produto do carrinho");
  }
}

//Função para calcular o resultado e atualizar o elemento "resultado" no HTML

function calcularResultado() {
  var precos = document.querySelectorAll(".card-preco");

  var resultado = 0;

  precos.forEach(function (precoElement) {
    var preco = parseFloat(precoElement.textContent.replace("R$ ", ""));
    resultado += preco;
  });

  // Atualiza o elemento "resultado" no HTML

  var resultadoElement = document.getElementById("resultado");
  resultadoElement.textContent = resultado.toFixed(2);
}

//-------------------------------------------------------------------------------\\
//Finalizar Compra\\

//Quando a página terminar de carregar, o processo se iniciara

window.addEventListener("DOMContentLoaded", function () {

  //Carregua os dados

  carregarDados().then(function () {

    //Após carregar os dados, a função de calculo do resultado é chamada

    calcularResultado();
  });
});

//Função simulada para carregar dados

function carregarDados() {
  return new Promise(function (resolve) {

    setTimeout(resolve, 100); //Simulando um atraso na carga de dados
  });
}

//Função para finalizar compra

function finalizar_compra() {
  var valor = document.getElementById("resultado").textContent;

  var dados = new FormData();
  dados.append("valor_total", valor);

  if (valor != '' && valor != null && valor != 'NaN') {
    fetch("../php/compra.php", {
      method: "POST",
      body: dados
    });
    window.location.href = "finalizar_compra.html";
  } else {
    alert("Problemas para finalizar a compra");
  }
}