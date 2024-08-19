-- DROP SCHEMA IF EXISTS loja;
CREATE SCHEMA IF NOT EXISTS loja;

USE loja;

-- DROP TABLE IF EXISTS produto;
CREATE TABLE IF NOT EXISTS produto(
	id_produto INT NOT NULL AUTO_INCREMENT,
    nome VARCHAR(255) NOT NULL,
    preco DECIMAL(7,2) NOT NULL,
    PRIMARY KEY(id_produto)
);

-- DROP TABLE IF EXISTS carrinho;
CREATE TABLE IF NOT EXISTS carrinho (
	id_carrinho INT NOT NULL AUTO_INCREMENT,
    produto_id INT NOT NULL,
    _status TINYINT NOT NULL DEFAULT '0',
    PRIMARY KEY(id_carrinho),
    FOREIGN KEY (produto_id) REFERENCES produto(id_produto)
);

-- DROP TABLE IF EXISTS compra;
CREATE TABLE IF NOT EXISTS compra (
	id_compra INT NOT NULL AUTO_INCREMENT,
    valor_total INT NOT NULL,
    _status TINYINT NOT NULL DEFAULT '0',
    PRIMARY KEY(id_compra)
);

SELECT * FROM produto;
SELECT * FROM carrinho;
SELECT * FROM compra;