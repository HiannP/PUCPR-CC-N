public class Fila {
    private int primeiro;
    private int ultimo;
    private int[] dados;

    // Método Construtor
    public Fila(int capacidade) {
        this.primeiro = 0;
        this.ultimo = 0;
        this.dados = new int[capacidade + 1]; // Um espaço a mais para distinguir cheia de vazia
    }

    // Método para verificar se a fila está cheia
    private boolean cheia() {
        return (ultimo + 1) % dados.length == primeiro;
    }

    // Método para verificar se a fila está vazia
    private boolean vazia() {
        return primeiro == ultimo;
    }

    // Método para inserir um elemento na fila
    public void insere(int elemento) {
        if (cheia()) {
            System.out.println("A fila está cheia");
            return;
        }
        dados[ultimo] = elemento;
        ultimo = (ultimo + 1) % dados.length; // Incrementa o índice 'ultimo' de forma circular
    }

    // Método para remover um elemento da fila
    public int remove() {
        if (vazia()) {
            System.out.println("A fila está vazia");
            return -1; // Indica que a fila estava vazia
        }
        int elementoRemovido = dados[primeiro];
        primeiro = (primeiro + 1) % dados.length; // Incrementa o índice 'primeiro' de forma circular
        return elementoRemovido;
    }

    // Método para imprimir todos os elementos da fila
    public void imprime() {
        if (vazia()) {
            System.out.println("A fila está vazia");
            return;
        }
        System.out.print("Fila: ");
        for (int i = primeiro; i != ultimo; i = (i + 1) % dados.length) {
            System.out.print("[" + dados[i] + "] ");
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
    }
}
