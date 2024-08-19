<?php

    include "conexao_mysql.php"; //Incluindo o arquivo de configuração do banco de dados

    $valor_total = $_POST["valor_total"]; //Valor total da compra
    
    $query = "INSERT INTO compra (valor_total) VALUES ('$valor_total')"; //DML - Inserção
    mysqli_query($conn, $query); //Execução do SQL
    
?>