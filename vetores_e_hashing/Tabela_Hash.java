package vetores_e_hashing;

import java.util.Random;
public class Tabela_Hash {
    private Node[] tabela;
    private int tamanho;
    private int colisoes;
    private Random random;

    public Tabela_Hash(int tamanho, long seed) {
        this.tamanho = tamanho;
        this.random = new Random(seed);
        tabela = new Node[tamanho];
        colisoes = 0;
    }

    // Método que gera um número aleatório de 9 digitos
    public int Num_Aleatorio() {
        return 100000000 + random.nextInt(900000000);
    }

    // Gera um array de números aleatórios com base na seed
    public int[] Gerar_Dados(int n) {
        int[] dados = new int[n];
        for (int i = 0; i < n; i++) {
            dados[i] = Num_Aleatorio(); // Gera números aleatórios
        }
        return dados;
    }

    // Função hash de Resto (Tipo Hash 1)
    public int Resto(int chave) {
        int resultado = chave % tamanho;
        return (resultado < 0) ? resultado + tamanho : resultado;
    }

    // Função hash de Multiplicação (Tipo Hash 2)
    public int Multiplicacao(int chave) {
        double A = 0.6180339887; // Constante
        int resultado = (int) (tamanho * ((chave * A) % 1));
        return (resultado < 0) ? resultado + tamanho : resultado;
    }

    // Função hash Fowler–Noll–Vo (FNV) (Tipo Hash 3)
    public int FNV(int chave) {
        final int Fnv_prime = 0x01000193; // Número primo (32 bits)
        final int Offset_basis = 0x811c9dc5; // Valor inicial (32 bits)

        int hash = Offset_basis;
        String strChave = Integer.toString(chave);

        for (int i = 0; i < strChave.length(); i++) {
            hash ^= strChave.charAt(i); // XOR com o byte atual
            hash *= Fnv_prime; // Multiplica pelo número primo
        }
        return (hash & Integer.MAX_VALUE) % tamanho;
    }

    // Método de inserção com contagem de colisões
    public void inserir(Registro registro, int Hash) {
        int hash;
        switch (Hash) {
            case 1:
                hash = Resto(registro.chave);
                break;
            case 2:
                hash = Multiplicacao(registro.chave);
                break;
            case 3:
                hash = FNV(registro.chave);
                break;
            default:
                throw new IllegalArgumentException("Tipo de hash inválido");
        }

        Node Novo_No = new Node(registro);
        if (tabela[hash] == null) {
            tabela[hash] = Novo_No;
        } else {
            colisoes++;
            Node atual = tabela[hash];
            while (atual.proximo != null) {
                atual = atual.proximo;
            }
            atual.proximo = Novo_No;
        }
    }

    // Método de busca com contagem de comparações
    public boolean buscar(int chave, int Hash) {
        int hash;
        switch (Hash) {
            case 1:
                hash = Resto(chave);
                break;
            case 2:
                hash = Multiplicacao(chave);
                break;
            case 3:
                hash = FNV(chave);
                break;
            default:
                throw new IllegalArgumentException("Tipo de hash inválido");
        }

        Node atual = tabela[hash];
        while (atual != null) {
            if (atual.registro.chave == chave) {
                return true;
            }
            atual = atual.proximo;
        }
        return false;
    }

    // Método de retorno da quantidade de colisões acumuladas
    public int getColisoes() {
        return colisoes;
    }
}
