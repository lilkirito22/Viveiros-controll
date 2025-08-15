// 1. Importamos as ferramentas do React Router
import { useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
// 2. Importamos nossos novos componentes de página
import HomePage from "./pages/HomePage";
import FinanceiroPage from "./pages/FinanceiroPage";

// Tipagem (Nossos "Moldes" de Dados)
// Usamos 'export' para que outros arquivos possam importar esses moldes
export interface Tanque {
  id: string;
  nome: string;
  status: string;
  lote: string;
}

export interface Despesa {
  id: string;
  descricao: string;
  valor: number;
  data: string;
  tanqueId: string;
}

export interface Venda {
  id: string; // ID único da venda
  tanqueId: string; // Para saber de qual tanque veio a venda
  data: string; // Data em que a venda ocorreu
  pesoTotalKg: number; // O peso total vendido que você mencionou
  valorTotal: number; // O valor total recebido
  gramatura: number; // A gramatura (ex: 10, 12, 14g) que meu pai usa
  precoTabela: number; // O preço por kg naquela gramatura da tabela
}

function App() {
  //  ESTADOS GLOBAIS
  const dadosIniciaisDosTanques: Tanque[] = [
    { id: "t1", nome: "Tanque 01", status: "Em operação", lote: "LOTE-001" },
    { id: "t2", nome: "Tanque 02", status: "Vazio", lote: "Nenhum" },
  ];
  const [tanques, setTanques] = useState(dadosIniciaisDosTanques);
  const [despesas, setDespesas] = useState<Despesa[]>([]);
  const [vendas, setVendas] = useState<Venda[]>([]);
  const statusOptions = ["Em operação", "Vazio", "Manutenção"];

  // FUNÇOES DE MANIPULAÇÃO

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

  const handleRegistrarDespesa = (dadosDaDespesa: {
    descricao: string;
    valor: string;
    data: string;
    tanqueId: string;
  }) => {
    const novaDespesa = {
      id: new Date().toISOString(),
      tanqueId: dadosDaDespesa.tanqueId,
      descricao: dadosDaDespesa.descricao,
      data: dadosDaDespesa.data,
      valor: parseFloat(dadosDaDespesa.valor),
    };

    setDespesas([...despesas, novaDespesa]);
  };

  const handleDeletarDespesa = (idToDell: string) => {
    const newDespesa = despesas.filter((item) => item.id !== idToDell);
    setDespesas(newDespesa);
  };

  const handleAtualizarDespesa = (
    idParaAtualizar: string,
    novosDados: { descricao: string; valor: number; data: string }
  ) => {
    setDespesas(
      despesas.map((despesa) => {
        // Se encontrarmos a despesa com o ID correspondente...
        if (despesa.id === idParaAtualizar) {
          // ...retornamos um novo objeto com os dados antigos (...despesa)
          // mas sobrescrevemos com os novos dados que recebemos.
          return { ...despesa, ...novosDados };
        }
        // Se não for a despesa que queremos mudar, apenas a retornamos como estava.
        return despesa;
      })
    );
  };

  const handleRegistrarVenda = (dadosDaVenda: {
    tanqueId: string;
    data: string;
    pesoTotalKg: string;
    valorTotal: string;
    gramatura: string;
    precoTabela: string;
  }) => {
    const novaVenda = {
      id: new Date().toISOString(),
      tanqueId: dadosDaVenda.tanqueId,
      data: dadosDaVenda.data,
      pesoTotalKg: parseFloat(dadosDaVenda.pesoTotalKg),
      valorTotal: parseFloat(dadosDaVenda.valorTotal),
      gramatura: parseFloat(dadosDaVenda.gramatura),
      precoTabela: parseFloat(dadosDaVenda.precoTabela),
    };
    setVendas([...vendas, novaVenda]);
  };

  // interface
  return (
    <div>
      {/* 3. Criamos um menu de navegação simples */}
      <nav>
        <Link to="/">Viveiros</Link> | <Link to="/financeiro">Financeiro</Link>
      </nav>

      <hr />

      {/* PALCO ONDE AS PAGINAS SAO TROCADAS */}
      <Routes>
        <Route
          path="/"
          element={
            <HomePage
              tanques={tanques}
              statusOptions={statusOptions}
              onAdicionarTanque={handleAdicionarTanque}
              onDeletarTanque={handleDeletarTanque}
              onMudarStatus={handleMudarStatus}
            />
          }
        />
        <Route
          path="/financeiro"
          element={
            <FinanceiroPage
              tanques={tanques}
              despesas={despesas}
              vendas={vendas}
              onRegistrarDespesa={handleRegistrarDespesa}
              onDeletarDespesa={handleDeletarDespesa}
              onEditarDespesa={handleAtualizarDespesa}
              onRegistrarVenda={handleRegistrarVenda}
            />
          }
        />
      </Routes>
    </div>
  );
}

export default App;
