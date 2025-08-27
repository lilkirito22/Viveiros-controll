import { useState } from "react";
import { type Tanque } from "../App";

type Props = {
  tanques: Tanque[];
  onRegistrar: (dadosDaDespesa: {
    descricao: string;
    valor: string;
    data: string;
    tanqueId: string;
  }) => void;
};

function RegistrarDespesaForm({ tanques, onRegistrar }: Props) {
  // A lógica e os estados do formulário virão aqui
  const [novoDesc, setNovoDesc] = useState("");
  const [novoValor, setNovoValor] = useState("");
  const [novoData, setNovoData] = useState("");
  const [tanqueSelecionadoId, setTanqueSelecionadoId] = useState("");

  const handleSubmit = (evento: React.FormEvent) => {
    evento.preventDefault();

    // validar se os dados foram preenchidos

    if (!novoDesc || !novoValor || !tanqueSelecionadoId) {
      alert("Por favor, preencha todos os campos obrigatórios.");
      return;
    }

    //chamar a função pai passando os dados

    onRegistrar({
      descricao: novoDesc,
      valor: novoValor,
      data: novoData,
      tanqueId: tanqueSelecionadoId,
    });

    //limpar os campos do formulario apos o envio

    setNovoDesc("");
    setNovoValor("");
    setNovoData("");
    setTanqueSelecionadoId("");
  };

  return (
    // O JSX do formulário virá aqui
    <form onSubmit={handleSubmit}>
      <h2>Registrar Nova Despesa</h2>
      <input
        type="text"
        value={novoDesc}
        onChange={(e) => setNovoDesc(e.target.value)}
        placeholder="Descrição"
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
        placeholder="Valor"
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

      <button type="submit">Registrar Despesa</button>
    </form>
  );
}

export default RegistrarDespesaForm;
