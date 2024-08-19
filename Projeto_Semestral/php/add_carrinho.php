<?php

    include "conexao_mysql.php"; //Inclui o arquivo de configuração do banco de dados

    $produto_id = $_POST["produto_id"]; //ID do produto a ser adicionado no carrinho

    $query = "INSERT INTO carrinho (produto_id) VALUES ('$produto_id')"; //DML - Inserção de Produto

    mysqli_query($conn, $query); //Execução do SQL

?>