<?php

    include "conexao_mysql.php"; //Inclui o arquivo de configuração do banco de dados

    $query = "SELECT * FROM produto"; //DQL - Consulta de Produtos

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