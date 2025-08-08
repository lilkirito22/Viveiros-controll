// src/App.tsx

// 1. Importamos o 'useState' do React. É a nossa ferramenta para criar "memória" no componente.
import { useState } from "react";
import TanqueCard from "./components/TanqueCard";

// 2. Criamos uma interface para definir o "molde" de um tanque.
//    Isso ajuda o TypeScript a garantir que nossos dados estejam sempre corretos.
interface Tanque {
  id: string;
  nome: string;
  status: string;
  lote: string;
}

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

  //states para salvar oque estiver escrito nos inputs
  const [novoNome, setNovoNome] = useState("");
  const [novoStatus, setNovoStatus] = useState("");
  const [novoLote, setNovoLot] = useState("");

  // Abaixo dos useStates, mas ainda dentro da função App()

  const handleAdicionarTanque = (evento: React.FormEvent) => {
    // 1. Impede o comportamento padrão do navegador de recarregar a página
    evento.preventDefault();

    // 2. Cria o objeto do novo tanque com os dados dos estados
    const novoTanque = {
      id: new Date().toISOString(), // Usamos a data como um ID único simples
      nome: novoNome,
      status: novoStatus,
      lote: novoLote,
    };

    // 3. A GRANDE MÁGICA: atualiza o estado dos tanques
    //    Isso cria um NOVO array contendo todos os tanques antigos (...tanques)
    //    mais o novoTanque no final. O React detecta essa mudança e redesenha a tela!
    setTanques([...tanques, novoTanque]);

    // 4. Limpa os campos do formulário após o envio
    setNovoNome("");
    setNovoStatus("");
    setNovoLote("");
  };

  return (
    <div>
      <h1>Controle de Viveiros de Camarão</h1>

      <div className="lista-de-tanques">
        {/* 5. A MÁGICA ACONTECE AQUI! */}
        {tanques.map((tanque) => (
          <TanqueCard
            key={tanque.id} // O React precisa de uma 'key' única para cada item em uma lista. Usamos o ID.
            nomeDoTanque={tanque.nome}
            status={tanque.status}
            loteAtual={tanque.lote}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
