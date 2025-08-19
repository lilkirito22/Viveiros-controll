// 1. Importamos as ferramentas do React Router
import { useState, useEffect } from "react";
import { Routes, Route, Link } from "react-router-dom";
import { supabase } from "./services/supabaseClient";
// 2. Importamos nossos novos componentes de página
import HomePage from "./pages/HomePage";
import FinanceiroPage from "./pages/FinanceiroPage";
import Layout from "./components/Layout";

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

  const [tanques, setTanques] = useState<Tanque[]>([]);
  const [despesas, setDespesas] = useState<Despesa[]>([]);
  const [vendas, setVendas] = useState<Venda[]>([]);

  // Em App.tsx, dentro da função App()

  useEffect(() => {
    // 1. Definimos uma função assíncrona para buscar os dados
    async function buscarTanques() {
      // 2. Usamos o cliente supabase para fazer a "query" (consulta)
      //    A sintaxe é quase inglês: "do supabase, da tabela 'tanques', selecione tudo (*)"
      const { data, error } = await supabase.from("tanques").select("*");

      // 3. É uma boa prática sempre verificar se houve um erro
      if (error) {
        console.error("Erro ao buscar tanques:", error);
      } else {
        // 4. Se deu tudo certo, colocamos os dados que vieram do banco
        //    de dados no nosso estado!
        setTanques(data);
      }
    }
    async function buscarDespesas() {
      const { data, error } = await supabase.from("despesas").select();
      if (error) {
        console.error("Erro ao buscar tanques:", error);
      } else {
        // 4. Se deu tudo certo, colocamos os dados que vieram do banco
        //    de dados no nosso estado!
        setDespesas(data);
      }
    }

    async function buscarVendas() {
      const { data, error } = await supabase.from("vendas").select();
      if (error) {
        console.error("Erro ao buscar vendas:", error);
      } else {
        // 4. Se deu tudo certo, colocamos os dados que vieram do banco
        //    de dados no nosso estado!
        setVendas(data);
      }
    }

    // 5. Chamamos a função que acabamos de criar para que ela seja executada.
    buscarTanques();
    buscarDespesas();
    buscarVendas();
  }, []); // O array vazio garante que isso rode só uma vez.

  const statusOptions = ["Em operação", "Vazio", "Manutenção"];

  // FUNÇOES DE MANIPULAÇÃO

  const handleAdicionarTanque = async (dadosDoForm: {
    nome: string;
    status: string;
    lote: string;
  }) => {
    const { data, error } = await supabase
      .from("tanques")
      .insert({
        nome: dadosDoForm.nome,
        status: dadosDoForm.status,
        lote: dadosDoForm.lote,
      })
      .select();

    if (error) {
      console.error("Erro ao adicionar tanque:", error);
      return; // Para a execução se deu erro
    }

    const tanqueRecemCriado = data[0];

    setTanques([...tanques, tanqueRecemCriado]);
  };

  const handleDeletarTanque = async (idToDel: string) => {
    const { error } = await supabase.from("tanques").delete().eq("id", idToDel);

    if (error) {
      console.error("Erro ao adicionar tanque:", error);
      return; // Para a execução se deu erro
    }
    const newTanque = tanques.filter((item) => item.id !== idToDel);
    setTanques(newTanque);
  };

  const handleMudarStatus = async (idParaMudar: string) => {
    // 1. Encontrar o tanque no nosso estado atual
    const tanqueAtual = tanques.find((t) => t.id === idParaMudar);

    // Se, por algum motivo, o tanque não for encontrado, paramos aqui.
    if (!tanqueAtual) {
      console.error("Tanque não encontrado!");
      return;
    }

    // 2. Calcular qual será o próximo status
    let proximoStatus = "";
    if (tanqueAtual.status === "Em operação") proximoStatus = "Vazio";
    else if (tanqueAtual.status === "Vazio")
      proximoStatus = "Manutenção"; // Corrigi o typo "Manuntenção"
    else proximoStatus = "Em operação";

    // 3. Atualizar o Supabase COM O VALOR CORRETO
    const { error } = await supabase
      .from("tanques")
      .update({ status: proximoStatus }) // Usando a variável que calculamos
      .eq("id", idParaMudar);

    if (error) {
      console.error("Erro ao atualizar status:", error);
      return;
    }

    // 4. Atualizar o estado local do React
    //    Não precisamos mais do retorno do Supabase aqui, pois já sabemos qual o próximo status
    setTanques(
      tanques.map((tanque) => {
        if (tanque.id === idParaMudar) {
          // Apenas aplicamos a mudança que já calculamos
          return { ...tanque, status: proximoStatus };
        }
        return tanque;
      })
    );
  };
  const handleRegistrarDespesa = async (dadosDaDespesa: {
    descricao: string;
    valor: string;
    data: string;
    tanqueId: string;
  }) => {
    const { data, error } = await supabase
      .from("despesas")
      .insert({
        tanqueId: dadosDaDespesa.tanqueId,
        descricao: dadosDaDespesa.descricao,
        data: dadosDaDespesa.data,
        valor: parseFloat(dadosDaDespesa.valor),
      })
      .select();

    if (error) {
      console.error("Erro ao adicionar despesa:", error);
      return; // Para a execução se deu erro
    }

    const despesaRecemCriada = data[0];
    setDespesas([...despesas, despesaRecemCriada]);
  };

  const handleDeletarDespesa = async (idToDell: string) => {
    const { error } = await supabase
      .from("despesas")
      .delete()
      .eq("id", idToDell)
      .select();

    if (error) {
      console.error("Erro ao adicionar tanque:", error);
      return; // Para a execução se deu erro
    }

    const newDespesa = despesas.filter((item) => item.id !== idToDell);
    setDespesas(newDespesa);
  };

  const handleAtualizarDespesa = async (
    idParaAtualizar: string,
    novosDados: { descricao: string; valor: number; data: string }
  ) => {
    // 3. Atualizar o Supabase COM O VALOR CORRETO
    const { error } = await supabase
      .from("despesas")
      .update(novosDados) // Usando a variável que calculamos
      .eq("id", idParaAtualizar);

    if (error) {
      console.error("Erro ao atualizar status:", error);
      return;
    }

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

  const handleRegistrarVenda = async (dadosDaVenda: {
    tanqueId: string;
    data: string;
    pesoTotalKg: string;
    valorTotal: string;
    gramatura: string;
    precoTabela: string;
  }) => {
    const { data, error } = await supabase
      .from("vendas")
      .insert({
        tanqueId: dadosDaVenda.tanqueId,
        data: dadosDaVenda.data,
        pesoTotalKg: parseFloat(dadosDaVenda.pesoTotalKg),
        valorTotal: parseFloat(dadosDaVenda.valorTotal),
        gramatura: parseFloat(dadosDaVenda.gramatura),
        precoTabela: parseFloat(dadosDaVenda.precoTabela),
      })
      .select();

    if (error) {
      console.error("Erro ao adicionar despesa:", error);
      return; // Para a execução se deu erro
    }

    const vendaRecemCriada = data[0];
    setVendas([...vendas, vendaRecemCriada]);
  };

  const handleAtualizarVenda = async (
    idParaAtualizar: string,
    novosDados: {
      data: string;
      pesoTotalKg: number;
      valorTotal: number;
      gramatura: number;
      precoTabela: number;
    }
  ) => {

    const { error } = await supabase
      .from("vendas")
      .update(novosDados) // Usando a variável que calculamos
      .eq("id", idParaAtualizar);

    if (error) {
      console.error("Erro ao atualizar a venda:", error);
      return;
    }

    setVendas(
      vendas.map((venda) => {
        // Se encontrarmos a despesa com o ID correspondente...
        if (venda.id === idParaAtualizar) {
          // ...retornamos um novo objeto com os dados antigos (...despesa)
          // mas sobrescrevemos com os novos dados que recebemos.
          return { ...venda, ...novosDados };
        }
        // Se não for a despesa que queremos mudar, apenas a retornamos como estava.
        return venda;
      })
    );



  };
const handleDeletarVenda = async (idToDell: string) => {
    const { error } = await supabase
      .from("vendas")
      .delete()
      .eq("id", idToDell)
      .select();

    if (error) {
      console.error("Erro ao deletar venda:", error);
      return; // Para a execução se deu erro
    }

    const newVenda = vendas.filter((item) => item.id !== idToDell);
    setVendas(newVenda);
  };
  // interface
  return (
    <div>
      {/* 3. Criamos um menu de navegação simples */}
     
      <hr />

      {/* PALCO ONDE AS PAGINAS SAO TROCADAS */}
      <Routes>
        <Route element={<Layout />}>
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
              onEditarVenda ={handleAtualizarVenda}
              onDeletarVenda ={handleDeletarVenda}
            />
          }
        />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
