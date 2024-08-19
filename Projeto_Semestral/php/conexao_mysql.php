<?php

    $host = "localhost:3306"; //Host do banco de dados
    $usuario = "root"; //Nome de usuário do banco de dados
    $senha = "PUC@1234"; //Senha do banco de dados
    $banco = "loja"; //Nome do banco de dados

    $conn = mysqli_connect($host, $usuario, $senha, $banco); //Estabelecendo conexão

    if (!$conn) {
        die("Erro na conexão com o banco de dados: " . mysqli_connect_error());
    }

?>