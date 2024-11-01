package vetores_e_hashing;

import java.io.BufferedWriter;
import java.io.FileWriter;
import java.io.IOException;

public class Main {
    public static void main(String[] args) {
        // Tamanhos de vetores da tabela hash
        int Tamanho_Tabela1 = 500000;
        int Tamanho_Tabela2 = 2500000;
        int Tamanho_Tabela3 = 10000000;

        int[] Tamanhos_Dados = {1000000, 5000000, 20000000}; // Conjunto de dados

        long seed = 42; // Definir tamanho da seed

        try (BufferedWriter writer = new BufferedWriter(new FileWriter("resultados1.csv"))) {
            writer.write("Tamanho da Tabela,Tamanho dos Dados,Tipo Hash,Tempo de Insercao (ns),Colisoes,Tempo de Busca Medio (ns)\n");

            // Executa testes para cada tamanho de tabela
            Testes(Tamanho_Tabela1, Tamanhos_Dados, seed, writer);
            Testes(Tamanho_Tabela2, Tamanhos_Dados, seed, writer);
            Testes(Tamanho_Tabela3, Tamanhos_Dados, seed, writer);

        } catch (IOException e) {
            System.err.println("Erro ao escrever o arquivo: " + e.getMessage());
        }
    }

    public static void Testes(int Tamanho_Tabela, int[] Tamanhos_Dados,
                                      long seed, BufferedWriter writer) throws IOException {
        System.out.println("Executando testes: Tamanho de Tabela = " + Tamanho_Tabela);

        for (int Tamanho_Dados : Tamanhos_Dados) {
            Tabela_Hash tabela = new Tabela_Hash(Tamanho_Tabela, seed);
            int[] dados = tabela.Gerar_Dados(Tamanho_Dados);

            for (int Hash = 1; Hash <= 3; Hash++) {
                tabela = new Tabela_Hash(Tamanho_Tabela, seed);

                // Inserção e contagem de tempo
                long Tempo_Inicial = System.nanoTime();
                for (int numero : dados) {
                    tabela.inserir(new Registro(numero), Hash);
                }
                long Tempo_Insercao = (System.nanoTime() - Tempo_Inicial);
                int colisoes = tabela.getColisoes();

                // Busca e tempo médio de buscas
                long Tempo_Busca_Total = 0;
                for (int i = 0; i < 5; i++) {
                    int chave = dados[i];
                    Tempo_Inicial = System.nanoTime();
                    tabela.buscar(chave, Hash);
                    Tempo_Busca_Total += (System.nanoTime() - Tempo_Inicial);
                }
                long Tempo_Busca_Medio = Tempo_Busca_Total / 5;

                // Escrevendo os resultados em um arquivo CSV
                writer.write(Tamanho_Tabela + "," + Tamanho_Dados + "," + Hash + "," +
                        Tempo_Insercao + "," + colisoes + "," + Tempo_Busca_Medio + "\n");
                System.out.println("Teste concluído: Tamanho de Dados = " + Tamanho_Dados + " e Tipo Hash = " + Hash);
            }
        }
    }
}
