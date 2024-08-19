<?php

    include "conexao_mysql.php"; // Inclui o arquivo de configuração do banco de dados

    $nome = $_POST["nome"]; // Nome do produto a ser cadastrado
    $preco = $_POST["preco"]; // Preço do produto a ser cadastrado

    $query = "INSERT INTO produto (nome, preco) VALUES ('$nome', '$preco')"; // DML - Inserção de Produto
    
    mysqli_query($conn, $query); // Execução do SQL

    $nomeTemporario = $_FILES['foto']['tmp_name']; // Nome temporário do arquivo de upload
    $novoNome = $nome; // Novo nome do arquivo
    $pastaDestino = '../image/produto/'; // Pasta de destino

    move_uploaded_file($nomeTemporario, $pastaDestino . $novoNome.'.webp') // Destino do arquivo de upload com novo nome

?>