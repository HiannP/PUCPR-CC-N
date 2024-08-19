<?php

    include "conexao_mysql.php"; //Incluindo o arquivo de configuração do banco de dados

    //DQL - Consulta de Produtos no Carrinho

    $query = "SELECT * FROM produto p 
                INNER JOIN carrinho c ON p.id_produto = c.produto_id 
                WHERE c._status = 0";

    $resultado = mysqli_query($conn, $query); //Execução do SQL

    $dados = array(); //Inicializando um novo array

    //Loop para buscar e processar cada linha de resultados

    while($registro = mysqli_fetch_assoc($resultado)) {

        array_push($dados, $registro); //Adicinando elementos de $registro no final do array $dados

    }

    //Codificando em json e chamando os dados recebidos do MySQL

    $json = json_encode($dados);
    echo $json;

?>