public class Pilha {
    private int capacidade;
    private int topo;
    private int[] dados;

    // Método Construtor
    public Pilha(int capacidade) {
        this.capacidade = capacidade;
        this.topo = -1; // Inicia o programa com a pilha vazia
        this.dados = new int[capacidade];
    }

    // Método para verificar se a pilha está cheia
    private boolean cheia() {
        return topo == capacidade - 1;
    }

    // Método para verificar se a pilha está vazia
    private boolean vazia() {
        return topo == -1;
    }

    // Método para inserir um elemento na pilha
    public void insere(int elemento) {
        if (cheia()) {
            System.out.println("A pilha está cheia");
            return;
        }
        dados[++topo] = elemento;
    }

    // Método para remover um elemento da pilha
    public int remove() {
        if (vazia()) {
            System.out.println("A pilha está vazia");
            return -1; // Indica que a pilha estava vazia
        }
        return dados[topo--];
    }

    // Método para imprimir todos os elementos da pilha
    public void imprime() {
        if (vazia()) {
            System.out.println("A pilha está vazia");
            return;
        }
        System.out.println("Pilha: ");
        for (int i = topo; i >= 0; i--) {
            System.out.println("[" + dados[i] + "] ");
        }
        System.out.println();
    }

    public static void main(String[] args) {
        Pilha pilha = new Pilha(5);

        pilha.insere(10);
        pilha.insere(20);
        pilha.insere(30);

        pilha.imprime();

        pilha.remove();
        pilha.imprime();
    }
}
