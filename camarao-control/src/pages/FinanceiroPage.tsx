// src/pages/FinanceiroPage.tsx

import { type Tanque, type Despesa, type Venda } from "../App"; // 1. Importando os tipos
import DespesaCard from "../components/DespesaCard";
import VendasCard from "../components/VendasCard";
import RegistrarDespesaForm from "../components/RegistrarDespesaForm";
import RegistrarVendaForm from "../components/RegistrarVendaForm";

import GraficoLucro from "../components/GraficoLucro";

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

        <hr />

        <div style={{ marginTop: "40px" }}>
          <h2>Resumo Gráfico</h2>
          <GraficoLucro data={dadosDoGrafico} />
        </div>

        {/* ... resto da sua página, como os formulários e as listas ... */}
      </div>

      <p>Total de despesas registradas: {despesas.length}</p>
      <p>Total de vendas registradas: {vendas.length}</p>
      <hr />
      {/* 4. Usando as props para passar para o componente filho */}
      <RegistrarDespesaForm
        tanques={tanques}
        onRegistrar={onRegistrarDespesa}
      />
      <RegistrarVendaForm tanques={tanques} onRegistrar={onRegistrarVenda} />
      {/* No futuro, vamos adicionar a lista de despesas aqui */}
      <div className="lista-de-despesa">
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
      {/* --- SEÇÃO DE EXIBIÇÃO DAS VENDAS --- */}
      <hr />
      <h3>Vendas Registradas</h3>
      <div
        className="lista-de-vendas"
        style={{ display: "flex", flexWrap: "wrap" }}
      >
        {/* Mapeamos o array 'vendas' que a página recebe via props */}
        {vendas.map((venda) => (
          <VendasCard
            // A "matrícula" para o React saber quem é quem na lista
            key={venda.id}
            // As props com os dados da venda
            id={venda.id}
            tanqueId={venda.tanqueId}
            data={venda.data}
            pesoTotalKg={venda.pesoTotalKg}
            valorTotal={venda.valorTotal}
            gramatura={venda.gramatura}
            precoTabela={venda.precoTabela}
            // As props com as FUNÇÕES que vêm lá do App.tsx
            // (Assumindo que você as nomeou assim nas props da página)
            onDelete={onDeletarVenda}
            onEditar={onEditarVenda}
          />
        ))}
      </div>
    </div>
  );
}

export default FinanceiroPage;
