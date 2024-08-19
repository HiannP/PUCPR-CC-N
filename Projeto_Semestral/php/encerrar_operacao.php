<?php

    include "conexao_mysql.php"; // Inclui o arquivo de configuração do banco de dados

    $id_compra = $_POST["id_compra"]; //ID da Compra a ser efetuada

    $query_compra = "UPDATE compra SET _status = 1 WHERE id_compra = $id_compra"; // DML - Atualização de Status da compra

    if (mysqli_query($conn, $query_compra)) {
        // Atualiza a tabela 'carrinho' apenas se a atualização da 'compra' for bem-sucedida
        $query_carrinho = "DELETE FROM carrinho WHERE _status = 0"; // DML - Exclusão dos produtos comprados já comprados dentro do carrinho
        if (mysqli_query($conn, $query_carrinho)) {
            echo "Status atualizado com sucesso em ambas as tabelas.";
        } else {
            echo "Erro ao atualizar a tabela 'carrinho': " . mysqli_error($conn);
        }
    } else {
        echo "Erro ao atualizar a tabela 'compra': " . mysqli_error($conn);
    }

?>