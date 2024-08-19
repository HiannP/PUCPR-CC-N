<?php

    include "conexao_mysql.php"; //Inclui o arquivo de configuração do banco de dados

    $produto_id = $_POST["produto_id"]; //ID do produto a ser retirado no carrinho

    $query = "DELETE FROM carrinho WHERE produto_id = $produto_id"; //DML - Exclusão de Produto

    mysqli_query($conn, $query); //Execução do SQL

?>