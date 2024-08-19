//Finalização\\

//Função para carregar a caixa de finalização de compra

window.onload = async function () {
  var resultado = await fetch("../php/finalizacao.php", {
    method: "GET"
  });
  var dados = await resultado.json();
  if(dados.length > 0) {

    var conteudo = '<div class="caixa-compra">';

    //Valor total, forma de pagamento e finalização
    conteudo += 
      `<div class="finalizar">
        <div class="valor-total">
          Valor Total
          <div><b>R$ ${dados[0].valor_total}</b></div>
        </div>
        <div class="opcoes-pagamento">
          Forma de Pagamento
          <form>
            <input type="radio" id="credito" name="pagamento" value="Credito" onclick="mostrarFormulario('credito')">
            <label for="credito">Crédito</label>

            <input type="radio" id="debito" name="pagamento" value="Debito" onclick="mostrarFormulario('debito')">
            <label for="debito">Débito</label>

            <input type="radio" id="pix" name="pagamento" value="Pix" onclick="mostrarFormulario('pix')">
            <label for="pix">Pix</label>
          </form>
          
          <form id="formulario-credito" class="hidden">
            <label for="C-nbc">Número do Cartão de Crédito</label>
            <input type="text" id="C-nbc" name="C-nbc" placeholder="xxxx-xxxx-xxxx-xxxx">

            <label for="C-dv">Data de Validade</label>
            <input type="text" id="C-dv" name="C-dv" placeholder="mês/ano">

            <label for="C-ntc">Nome do Titular do Cartão</label>
            <input type="text" id="C-ntc" name="C-ntc" placeholder="João Silva">

            <label for="C-cvv">CVV</label>
            <input type="text" id="C-cvv" name="C-cvv" placeholder="xxx">

            <div class="botao-finalizar" onclick="finalizar(${dados[0].id_compra})">Finalizar Operação</div>
          </form>

          <form id="formulario-debito" class="hidden">
            <label for="D-nbd">Número do Cartão de Débito</label>
            <input type="text" id="D-nbd" name="D-nbd" placeholder="xxxx-xxxx-xxxx-xxxx">

            <label for="D-dv">Data de Validade</label>
            <input type="text" id="D-dv" name="D-dv" placeholder="mês/ano">

            <label for="D-ntc">Nome do Titular do Cartão</label>
            <input type="text" id="D-ntc" name="D-ntc" placeholder="Marcio Costa">

            <label for="D-cvv">CVV</label>
            <input type="text" id="D-cvv" name="D-cvv" placeholder="xxx">

            <div class="botao-finalizar" onclick="finalizar(${dados[0].id_compra})">Finalizar Operação</div>
          </form>

          <form id="formulario-pix" class="hidden">
            <img src="../image/header/qrcode-pix.webp">
          </form>
        </div>
      </div>`;
    
    //Produtos
    for (var i = 0; i < dados.length; i++) {
      conteudo += 
        `<div class="produto">
          <img src="../image/produto/${dados[i].nome}.webp">
          <div class="info">
            <div>${dados[i].nome}</div>
            <div>R$ ${dados[i].preco}</div>
          </div>
        </div>`;
    }
    
    document.getElementById('caixa').innerHTML += conteudo;
  }
}

//Função para cancelar a operação de compra

function cancelar_operacao() {
  fetch("../php/cancelar_operacao.php");
  window.location.href = "carrinho.html";
}

//Função para selecionar opção de pagamento

//Adicione um ouvinte de eventos para o formulário de seleção de pagamento

function mostrarFormulario(opcao) {

  //Oculta todos os formulários

  document.getElementById("formulario-credito").style.display = "none";
  document.getElementById("formulario-debito").style.display = "none";
  document.getElementById("formulario-pix").style.display = "none";

  //Mostra o formulário correspondente à opção selecionada

  document.getElementById("formulario-" + opcao).style.display = "flex";

}

//Adiciona um ouvinte de eventos ao documento para detectar alterações nos campos

document.addEventListener("change", function () {
  validarCampos();
});

//Função para validar todas as entradas de dados da forma de pagamento

function validarCampos() {

  //Verifiqua qual opção de pagamento foi selecionada

  var selectedOption = document.querySelector('input[name="pagamento"]:checked');
  if (selectedOption) {
      var selectedValue = selectedOption.value;
      var formulario = document.getElementById("formulario-" + selectedValue.toLowerCase());

      //Obtem o botão de finalização associado ao formulário

      var botaoFinalizar = formulario.querySelector(".botao-finalizar");

      //Obtem todos os campos dentro do formulário selecionado

      var campos = formulario.querySelectorAll("input");

      // Verifiqua se todos os campos foram preenchidos

      var todosPreenchidos = Array.from(campos).every(function (campo) {
          return campo.value.trim() !== "";
      });

      // Se todos os campos estiverem preenchidos, mostra o botão de finalização

      if (todosPreenchidos) {
          botaoFinalizar.style.display = "flex";
      } else {
          botaoFinalizar.style.display = "none";
      }
  }
}

//Função para finalizar a operação de compra

function finalizar(id_compra) {
  var dados = new FormData();
  dados.append("id_compra", id_compra);

  if (id_compra != '' && id_compra != null) {
    fetch("../php/encerrar_operacao.php", {
      method: "POST",
      body: dados
    });
    alert("Compra efetuada com sucesso");
    window.location.href = "../index.html";
  } else {
    alert("Problemas para finalizar a compra");
  }
}