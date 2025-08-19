// src/pages/FinanceiroPage.tsx

import { type Tanque, type Despesa, type Venda } from "../App"; // 1. Importando os tipos
import DespesaCard from "../components/DespesaCard";
import VendasCard from "../components/VendasCard";
import RegistrarDespesaForm from "../components/RegistrarDespesaForm";
import RegistrarVendaForm from "../components/RegistrarVendaForm";

import GraficoLucro from "../components/GraficoLucro";
import { useState } from "react";

// 2. Definindo o contrato de props
type FinanceiroPageProps = {
  tanques: Tanque[];
  despesas: Despesa[];
  vendas: Venda[];
  onRegistrarDespesa: (dadosDaDespesa: {
    descricao: string;
    valor: string;
    data: string;
    tanqueId: string;
  }) => void;
  onDeletarDespesa: (id: string) => void;
  onEditarDespesa: (
    id: string,
    novosDados: {
      descricao: string;
      valor: number;
      data: string;
    }
  ) => void;

  onRegistrarVenda: (dadosDaVenda: {
    tanqueId: string;
    data: string;
    pesoTotalKg: string;
    valorTotal: string;
    gramatura: string;
    precoTabela: string;
  }) => void;

  onDeletarVenda: (id: string) => void;
  // Adicionamos a prop para atualizar, que vem lá do App.tsx
  onEditarVenda: (
    id: string,
    novosDados: {
      data: string;
      pesoTotalKg: number;
      valorTotal: number;
      gramatura: number;
      precoTabela: number;
    }
  ) => void;
};

// 3. Recebendo as props na função
function FinanceiroPage({
  tanques,
  despesas,
  vendas,
  onRegistrarDespesa,
  onDeletarDespesa,
  onEditarDespesa,
  onRegistrarVenda,
  onEditarVenda,
  onDeletarVenda,
}: FinanceiroPageProps) {
  // 1. Calculando o total de Vendas
  const totalVendas = vendas.reduce((acumulador, vendaAtual) => {
    // A cada passo, pegamos o valor que já foi somado (acumulador)
    // e adicionamos o 'valorTotal' da venda que estamos olhando agora.
    return acumulador + vendaAtual.valorTotal;
  }, 0); // O '0' é importante! Dizemos para a soma começar do zero.

  const totalDespesas = despesas.reduce((acumulador, despesaAtual) => {
    return acumulador + despesaAtual.valor;
  }, 0);

  const lucroTotal = totalVendas - totalDespesas;

  const [abaAtiva, setAbaAtiva] = useState("dashboard");

  const dadosDoGrafico = [
    {
      name: "Totais",
      Vendas: totalVendas,
      Despesas: totalDespesas,
    },
  ];

  // Por enquanto, podemos mostrar um contador de despesas registradas
  // E também o formulário para registrar novas despesas

  return (
    <div>
      <h1>Página Financeira</h1>

      <div>
        {/* CARDS DE RESUMO */}
        <div style={{ display: "flex", gap: "20px", marginBottom: "20px" }}>
          <div
            style={{
              border: "1px solid green",
              padding: "10px",
              borderRadius: "8px",
            }}
          >
            <h3>Total de Vendas</h3>
            <p style={{ fontSize: "1.5em", color: "green" }}>
              {totalVendas.toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
              })}
            </p>
          </div>
          <div
            style={{
              border: "1px solid red",
              padding: "10px",
              borderRadius: "8px",
            }}
          >
            <h3>Total de Despesas</h3>
            <p style={{ fontSize: "1.5em", color: "red" }}>
              {totalDespesas.toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
              })}
            </p>
          </div>
          <div
            style={{
              border: "1px solid blue",
              padding: "10px",
              borderRadius: "8px",
            }}
          >
            <h3>Lucro Total</h3>
            <p style={{ fontSize: "1.5em", color: "blue" }}>
              {lucroTotal.toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
              })}
            </p>
          </div>
        </div>
        {/* FIM DOS CARDS */}

        {/* NAVEGAÇÃO DAS ABAS */}
        <div className="my-4 flex border-b border-slate-200">
          <button
            onClick={() => setAbaAtiva("dashboard")}
            className={`px-4 py-2 text-sm font-medium ${
              abaAtiva === "dashboard"
                ? "border-b-2 border-sky-500 text-sky-600"
                : "text-slate-500 hover:text-slate-700"
            }`}
          >
            Dashboard
          </button>
          <button
            onClick={() => setAbaAtiva("despesas")}
            className={`px-4 py-2 text-sm font-medium ${
              abaAtiva === "despesas"
                ? "border-b-2 border-sky-500 text-sky-600"
                : "text-slate-500 hover:text-slate-700"
            }`}
          >
            Despesas
          </button>
          <button
            onClick={() => setAbaAtiva("vendas")}
            className={`px-4 py-2 text-sm font-medium ${
              abaAtiva === "vendas"
                ? "border-b-2 border-sky-500 text-sky-600"
                : "text-slate-500 hover:text-slate-700"
            }`}
          >
            Vendas
          </button>
        </div>

        {/* ÁREA DE CONTEÚDO DINÂMICO */}
        {/* --- ÁREA DE CONTEÚDO DINÂMICO COM EFEITO SLIDER --- */}

        {/* 1. O Contêiner que "corta" o conteúdo que vaza */}
        <div className="relative w-full overflow-hidden">
          {/* 2. O Wrapper que contém todos os painéis e se move */}
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{
              // 3. A Mágica do movimento acontece aqui
              transform: `translateX(${
                abaAtiva === "dashboard"
                  ? "0%"
                  : abaAtiva === "despesas"
                  ? "-33.3333%"
                  : "-66.6666%"
              })`,
              // Definimos uma largura de 300% para caber os 3 painéis
              width: "300%",
            }}
          >
            {/* Painel 1: Dashboard */}
            <div className="w-1/3 flex-shrink-0 p-4">
              <div style={{ marginTop: "40px" }}>
                <h2>Resumo Gráfico</h2>
                <GraficoLucro data={dadosDoGrafico} />
              </div>
            </div>

            {/* Painel 2: Despesas */}
            <div className="w-1/3 flex-shrink-0 p-4">
              <RegistrarDespesaForm
                tanques={tanques}
                onRegistrar={onRegistrarDespesa}
              />
              <hr className="my-6" />
              <h3 className="text-xl font-semibold">Despesas Registradas</h3>
              <div className="lista-de-despesa mt-4 flex flex-wrap gap-4">
                {despesas.map((despesa) => (
                  <DespesaCard
                    key={despesa.id}
                    id={despesa.id}
                    tanqueId={despesa.tanqueId}
                    descricao={despesa.descricao}
                    valor={despesa.valor}
                    data={despesa.data}
                    onDelete={onDeletarDespesa}
                    onEditar={onEditarDespesa}
                  />
                ))}
              </div>
            </div>

            {/* Painel 3: Vendas */}
            <div className="w-1/3 flex-shrink-0 p-4">
              <RegistrarVendaForm
                tanques={tanques}
                onRegistrar={onRegistrarVenda}
              />
              <hr className="my-6" />
              <h3 className="text-xl font-semibold">Vendas Registradas</h3>
              <div className="lista-de-vendas mt-4 flex flex-wrap gap-4">
                {vendas.map((venda) => (
                  <VendasCard
                    key={venda.id}
                    id={venda.id}
                    tanqueId={venda.tanqueId}
                    data={venda.data}
                    pesoTotalKg={venda.pesoTotalKg}
                    valorTotal={venda.valorTotal}
                    gramatura={venda.gramatura}
                    precoTabela={venda.precoTabela}
                    onDelete={onDeletarVenda}
                    onEditar={onEditarVenda}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        <hr />

        {/* ... resto da sua página, como os formulários e as listas ... */}
      </div>
    </div>
  );
}

export default FinanceiroPage;
