//Cadastro de Produto\\ 

//Função para mostrar imagem escolhida

function displayImageFile() {
  var foto = document.getElementById("foto");
  var imageFile = document.getElementById("imageFile");

  foto.addEventListener("change", function () {
    var file = foto.files[0];

    if (file) {
      var reader = new FileReader();

      reader.onload = function (read) {
        imageFile.src = read.target.result;
      };

      reader.readAsDataURL(file);
    } else {
      imageFile.src = "";
    }
  });
}

document.addEventListener("DOMContentLoaded", function () {
  displayImageFile();
});

//Função para cadastrar produto

function cadastrar_prod() {
  var form = document.getElementById("form-cadastrar");
  var dados = new FormData(form);

  var foto = document.getElementById("foto").value;
  var nome = document.getElementById("nome").value;
  var preco = document.getElementById("preco").value;

  if ((foto != '' && foto != null) && (nome != '' && nome != null) && (preco != '' && preco != null)) {
    fetch("../php/admin_cadastrar.php", {
      method: "POST",
      body: dados
    });
    alert("Produto cadastrado com sucesso");
  } else {
    alert("Insira as informações em todos os campos");
  }
}

//-------------------------------------------------------------------------------\\
//Exclusão de Produto\\ 

//Função para excluir produto

function excluir_prod() {
  var form = document.getElementById("form-excluir");
  var dados = new FormData(form);
    
  var nome = document.getElementById("txt-excluir").value;

  if (nome != '' && nome != null) {
    fetch("../php/admin_excluir.php", {
      method: "POST",
      body: dados
    }).then(response => response.json()) //Traz uma mensagem echo JSON do PHP
      .then(data => {
        if (data.status === "sucesso") {
          alert(data.mensagem);
        } else if (data.status === "erro") {
          alert(data.mensagem);
        }
      });
  } else {
    alert("Insira o nome de um produto");
  }
}