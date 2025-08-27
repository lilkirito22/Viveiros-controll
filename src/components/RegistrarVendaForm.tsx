import { useState } from "react";
import { type Tanque } from "../App";

type Props = {
  tanques: Tanque[];
  onRegistrar: (dadosDaVenda: {
    tanqueId: string;
    data: string;
    pesoTotalKg: string;
    valorTotal: string;
    gramatura: string;
    precoTabela: string;
  }) => void;
};

function RegistrarVendaForm({ tanques, onRegistrar }: Props) {
  // A lógica e os estados do formulário virão aqui
  const [tanqueSelecionadoId, setTanqueSelecionadoId] = useState("");
  const [novoData, setNovoData] = useState("");
  const [novoPeso, setNovoPeso] = useState("");
  const [novoValor, setNovoValor] = useState("");
  const [novoGram, setNovoGram] = useState("");
  const [novoTabela, setNovoTabela] = useState("");

  const handleSubmit = (evento: React.FormEvent) => {
    evento.preventDefault();

    // validar se os dados foram preenchidos

    if (
      !novoPeso ||
      !novoValor ||
      !tanqueSelecionadoId ||
      !novoGram ||
      !novoTabela ||
      !novoData
    ) {
      alert("Por favor, preencha todos os campos obrigatórios.");
      return;
    }

    //chamar a função pai passando os dados

    onRegistrar({
      tanqueId: tanqueSelecionadoId,
      data: novoData,
      pesoTotalKg: novoPeso,
      valorTotal: novoValor,
      gramatura: novoGram,
      precoTabela: novoTabela,
    });

    //limpar os campos do formulario apos o envio

    setNovoPeso("");
    setNovoValor("");
    setNovoData("");
    setTanqueSelecionadoId("");
    setNovoGram("");
    setNovoTabela("");
  };

  return (
    // O JSX do formulário virá aqui
    <form onSubmit={handleSubmit}>
      <h2>Registrar Nova Venda</h2>
      <input
        type="number"
        value={novoPeso}
        onChange={(e) => setNovoPeso(e.target.value)}
        placeholder="Peso total da despesca"
      />
      <input
        type="date"
        value={novoData}
        onChange={(e) => setNovoData(e.target.value)}
        placeholder="Data"
        name=""
        id=""
      />
      <input
        type="number"
        value={novoValor}
        onChange={(e) => setNovoValor(e.target.value)}
        placeholder="Valor Total da venda"
        name=""
        id=""
      />

      <input
        type="number"
        value={novoGram}
        onChange={(e) => setNovoGram(e.target.value)}
        placeholder="Gramatura do Camarao"
        name=""
        id=""
      />

      <input
        type="number"
        value={novoTabela}
        onChange={(e) => setNovoTabela(e.target.value)}
        placeholder="Valor da Tabela vendido"
        name=""
        id=""
      />

      <label htmlFor="Tanques">Tanque:</label>
      <select
        id="Tanques"
        value={tanqueSelecionadoId}
        onChange={(e) => setTanqueSelecionadoId(e.target.value)} // Corrigi o nome da função aqui também
      >
        <option value="">Selecione um Tanque</option>
        {/* Agora ele usa o statusOptions que veio via props */}
        {tanques.map((tanque) => (
          <option key={tanque.id} value={tanque.id}>
            {tanque.nome}
          </option>
        ))}
      </select>

      <button type="submit">Registrar Venda</button>
    </form>
  );
}

export default RegistrarVendaForm;
