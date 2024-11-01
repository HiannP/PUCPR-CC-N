package vetores_e_hashing;

public class Node {
    public Registro registro; // Registro armazenado no nó
    public Node proximo; // Referência para o próximo nó na lista

    // Construtor que inicializa o nó com um registro
    public Node(Registro registro) {
        this.registro = registro;
        this.proximo = null;
    }
}
