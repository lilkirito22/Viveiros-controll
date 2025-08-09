// src/App.tsx

// 1. Importamos o 'useState' do React. É a nossa ferramenta para criar "memória" no componente.
import { useState } from "react";
import TanqueCard from "./components/TanqueCard";
import AdicionarTanqueForm from "./components/AdicionarTanqueForm";

// 2. Criamos uma interface para definir o "molde" de um tanque.
//    Isso ajuda o TypeScript a garantir que nossos dados estejam sempre corretos.
interface Tanque {
  id: string;
  nome: string;
  status: string;
  lote: string;
}

interface Despesa {
  id: string;
  descricao: string;
  valor: number;
  data: string;
  tanqueID: string;
}

const statusOptions = ["Em operação", "Vazio", "Manutenção"];

function App() {
  // 3. Aqui está a nossa lista de dados, como no desafio de JS.
  const dadosIniciaisDosTanques: Tanque[] = [
    { id: "t1", nome: "Tanque 01", status: "Em operação", lote: "LOTE-001" },
    { id: "t2", nome: "Tanque 02", status: "Vazio", lote: "Nenhum" },
    { id: "t3", nome: "Berçário 01", status: "Manutenção", lote: "Nenhum" },
    { id: "t4", nome: "Tanque 03", status: "Em operação", lote: "LOTE-004" },
  ];

  // 4. Usamos o useState para criar nosso estado.
  //    'tanques' é a variável que guarda a lista de dados.
  //    'setTanques' é a função que usaremos no futuro para ATUALIZAR a lista.
  //    Passamos nossos 'dadosIniciaisDosTanques' para que o estado comece com essa lista.
  const [tanques, setTanques] = useState(dadosIniciaisDosTanques);
  const [despesas, setDespesas] = useState<Despesa[]>([]);

  // Abaixo dos useStates, mas ainda dentro da função App()

  const handleAdicionarTanque = (dadosDoForm: {
    nome: string;
    status: string;
    lote: string;
  }) => {
    // 2. Cria o objeto do novo tanque com os dados dos estados
    const novoTanque = {
      id: new Date().toISOString(), // Usamos a data como um ID único simples
      // usando agora os dados que recebemos do filho
      nome: dadosDoForm.nome,
      status: dadosDoForm.status,
      lote: dadosDoForm.lote,
    };

    // 3. A GRANDE MÁGICA: atualiza o estado dos tanques
    //    Isso cria um NOVO array contendo todos os tanques antigos (...tanques)
    //    mais o novoTanque no final. O React detecta essa mudança e redesenha a tela!
    setTanques([...tanques, novoTanque]);
  };

  const handleDeletarTanque = (idToDel: string) => {
    const newTanque = tanques.filter((item) => item.id !== idToDel);
    setTanques(newTanque);
  };

  const handleMudarStatus = (idParaMudar: string) => {
    setTanques((prev) =>
      prev.map((tanque) => {
        if (tanque.id === idParaMudar) {
          let novoStatus = "";
          if (tanque.status == "Em operação") novoStatus = "Vazio";
          else if (tanque.status === "Vazio") novoStatus = "Manuntenção";
          else novoStatus = "Em operação";

          return { ...tanque, status: novoStatus };
        }
        return tanque;
      })
    );
  };
  return (
    <div>
      <h1>Controle de Viveiros de Camarão</h1>

      <div>
        <AdicionarTanqueForm
          statusOptions={statusOptions}
          onAdicionar={handleAdicionarTanque}
        />
      </div>

      <hr />

      <div className="lista-de-tanques">
        {/* 5. A MÁGICA ACONTECE AQUI! */}
        {tanques.map((tanque) => (
          <TanqueCard
            key={tanque.id} // O React precisa de uma 'key' única para cada item em uma lista. Usamos o ID.
            idDoTanque={tanque.id}
            nomeDoTanque={tanque.nome}
            status={tanque.status}
            loteAtual={tanque.lote}
            onDelete={handleDeletarTanque}
            onEdite={handleMudarStatus}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
