// src/components/AdicionarTanqueForm.tsx

// 1. Precisamos importar o 'useState' aqui também!
import { useState } from "react";

// 2. Este é o nosso "contrato". O componente espera receber:
//    - statusOptions: um array de strings.
//    - onAdicionar: uma função que recebe um objeto com os dados do novo tanque.
type AdicionarTanqueFormProps = {
  statusOptions: string[];
  onAdicionar: (novoTanqueData: {
    nome: string;
    status: string;
    lote: string;
  }) => void;
};

// 3. Avisamos ao componente que ele receberá essas props.
export default function AdicionarTanqueForm({
  statusOptions,
  onAdicionar,
}: AdicionarTanqueFormProps) {
  // 4. Os estados agora vivem DENTRO do componente.
  const [novoNome, setNovoNome] = useState("");
  const [novoStatus, setNovoStatus] = useState("");
  const [novoLote, setNovoLote] = useState("");

  // 5. Criamos uma função de submit LOCAL.
  const handleSubmitLocal = (evento: React.FormEvent) => {
    evento.preventDefault();
    if (!novoNome || !novoStatus) {
      // Uma pequena validação
      alert("Por favor, preencha o nome e o status.");
      return;
    }

    // 6. Chamamos a função que recebemos do "pai" (via props),
    //    enviando para ele os dados que coletamos nos nossos estados locais.
    onAdicionar({
      nome: novoNome,
      status: novoStatus,
      lote: novoLote,
    });

    // 7. Limpamos os campos do nosso próprio formulário.
    setNovoNome("");
    setNovoStatus("");
    setNovoLote("");
  };

  // 8. O JSX agora usa a nossa função de submit LOCAL.
  return (
    <form onSubmit={handleSubmitLocal}>
      <h2>Adicionar Novo Tanque</h2>
      <input
        type="text"
        placeholder="Nome do Tanque"
        value={novoNome}
        onChange={(e) => setNovoNome(e.target.value)}
      />
      <label htmlFor="status">Status:</label>
      <select
        id="status"
        value={novoStatus}
        onChange={(e) => setNovoStatus(e.target.value)}
      >
        <option value="">Selecione um status</option>
        {/* Agora ele usa o statusOptions que veio via props */}
        {statusOptions.map((status) => (
          <option key={status} value={status}>
            {status}
          </option>
        ))}
      </select>

      <input
        type="text"
        placeholder="Lote"
        value={novoLote}
        onChange={(e) => setNovoLote(e.target.value)}
      />
      <button type="submit">
        Adicionar Tanque
      </button>
    </form>
  );
}
