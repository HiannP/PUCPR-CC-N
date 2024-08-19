<?php

    include "conexao_mysql.php"; //Incluindo o arquivo de configuração do banco de dados

    $excluir = $_POST["txt-excluir"]; //Nome do Produto a ser excluido

    // Consultar o banco de dados para obter o ID do produto

    $query_consulta = "SELECT id_produto FROM produto WHERE nome = '$excluir'";
    $resultado = mysqli_query($conn, $query_consulta);

    if (mysqli_num_rows($resultado) > 0) {

        // Produto encontrado, obtendo seu ID

        $row = mysqli_fetch_assoc($resultado);
        $id_produto = $row['id_produto'];

        //Verifica se o produto está presente no carrinho

        $query_consulta = "SELECT produto_id FROM carrinho WHERE produto_id = '$id_produto'";
        $resultado = mysqli_query($conn, $query_consulta);

        if (mysqli_num_rows($resultado) > 0) {

            //Se o produto está no carrinho, não pode ser excluído do banco de dados

            $mensagem = "Não é possível excluir o produto, ele está presente no carrinho.";
        } else {

            //Se o produto não está no carrinho, então pode ser excluido do banco de dados

            $query = "DELETE FROM produto WHERE id_produto = $id_produto";
            if (mysqli_query($conn, $query)) {
                $mensagem = "Produto excluído com sucesso.";
            } else {
                $mensagem = "Erro ao excluir o produto: " . mysqli_error($conn);
            }

            $nomeArquivo = $excluir;
            $pastaImage = '../image/produto/';
            $caminhoCompleto = $pastaImage . $nomeArquivo.'.webp';

            if (file_exists($caminhoCompleto) && unlink($caminhoCompleto)) {
                $mensagemArquivo = "Arquivo apagado com sucesso.";
            } else {
                $mensagemArquivo = "Não foi possível apagar o arquivo.";
            }

            // Retornar mensagens como JSON

            echo json_encode(array("status" => "sucesso", "mensagem" => $mensagem, "mensagemArquivo" => $mensagemArquivo));
        }
    } else {

        // Produto não encontrado no banco de dados

        echo json_encode(array("status" => "erro", "mensagem" => "Produto não encontrado."));
    }

?>
