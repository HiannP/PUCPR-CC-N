<?php

    include "conexao_mysql.php"; // Inclui o arquivo de configuração do banco de dados

    $query = "DELETE FROM compra WHERE _status = 0"; // DML - Exclusão de Produto

    mysqli_query($conn, $query); // Execução do SQL

?>