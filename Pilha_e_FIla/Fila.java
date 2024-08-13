public class Fila {
    private int primeiro;
    private int ultimo;
    private int capacidade;
    private int tamanho;
    private int[] dados;

    // Método Construtor
    public Fila(int capacidade) {
        this.capacidade = capacidade;
        this.primeiro = 0;
        this.ultimo = 0;
        this.tamanho = 0;
        this.dados = new int[capacidade];
    }

    // Método para verificar se a fila está cheia
    public boolean cheia() {
        return tamanho == capacidade;
    }

    // Método para verificar se a fila está vazia
    public boolean vazia() {
        return tamanho == 0;
    }

    // Método para inserir um elemento na fila
    public void insere(int elemento) {
        if (cheia()) {
            System.out.println("A fila está cheia!");
            return;
        }
        dados[ultimo] = elemento;
        ultimo = (ultimo + 1) % capacidade; // Incrementa o índice 'ultimo' de forma circular
        tamanho++;
    }

    // Método para remover um elemento da fila
    public int remove() {
        if (vazia()) {
            System.out.println("A fila está vazia!");
            return -1;
        }
        int elementoRemovido = dados[primeiro];
        primeiro = (primeiro + 1) % capacidade; // Incrementa o índice 'primeiro' de forma circular
        tamanho--;
        return elementoRemovido;
    }

    // Método para imprimir todos os elementos da fila
    public void imprime() {
        System.out.print("Fila: ");
        for (int i = 0; i < tamanho; i++) {
            int indice = (primeiro + i) % capacidade;
            System.out.print("[" + dados[indice] + "] ");
        }
        System.out.println();
    }

    public static void main(String[] args) {
        Fila fila = new Fila(5);

        fila.insere(10);
        fila.insere(20);
        fila.insere(30);
        fila.insere(40);
        fila.insere(50);

        fila.imprime();

        fila.remove();
        fila.remove();

        fila.imprime();

        fila.insere(60);
        fila.insere(70);

        fila.imprime();

        System.out.println("Fila cheia? " + fila.cheia());
        System.out.println("Fila vazia? " + fila.vazia());
    }
}
