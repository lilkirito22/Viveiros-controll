// src/pages/FinanceiroPage.tsx

import { type Tanque, type Despesa, type Venda } from "../App"; // 1. Importando os tipos
import DespesaCard from "../components/DespesaCard";
import RegistrarDespesaForm from "../components/RegistrarDespesaForm";
import RegistrarVendaForm from "../components/RegistrarVendaForm";

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
}: FinanceiroPageProps) {
  // Por enquanto, podemos mostrar um contador de despesas registradas
  // E também o formulário para registrar novas despesas

  return (
    <div>
      <h1>Página Financeira</h1>
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
    </div>
  );
}

export default FinanceiroPage;
