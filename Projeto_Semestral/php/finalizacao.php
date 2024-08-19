<?php

    include "conexao_mysql.php"; // Inclui o arquivo de configuração do banco de dados

    //DQL - Consulta de Produtos do Carrinho a serem comprados 

    $query = "SELECT * FROM compra cp
                INNER JOIN carrinho c ON cp._status = c._status
                INNER JOIN produto p ON c.produto_id = p.id_produto
                WHERE cp._status = 0";

    $resultado = mysqli_query($conn, $query); //Execução do SQL

    $dados = array(); //Inicializando um novo array

    //Loop para buscar e processar cada linha de $resultado

    while($registro = mysqli_fetch_assoc($resultado)) {

        array_push($dados, $registro); //Adicinando elementos de $registro no final do array $dados

    }

    //Codificando em json e chamando os dados recebidos do MySQL

    $json = json_encode($dados);
    echo $json;

?>