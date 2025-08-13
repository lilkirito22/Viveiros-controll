import { useState } from "react";

type DespesaCardProps = {
  tanqueId: string;
  id: string;
  descricao: string;
  valor: number;
  data: string;
  onDelete: (id: string) => void;
  onEditar: (
    id: string,
    novosDados: {
      descricao: string;
      valor: number;
      data: string;
    }
  ) => void;
};

function DespesaCard({
  tanqueId,
  id,
  descricao,
  valor,
  data,
  onDelete,
  onEditar,
}: DespesaCardProps) {
  const [estaEditando, setEstaEditando] = useState(false);

  const [descEditada, setDescEditada] = useState(descricao);
  const [valorEditado, setValorEditado] = useState(valor);
  const [dataEditada, setDataEditada] = useState(data);
  return (
    <div
      style={{
        border: "1px solid #ccc",
        borderRadius: "8px",
        padding: "16px",
        margin: "10px",
        width: "300px",
      }}
    >
      <h4>{descricao}</h4>
      <p>
        <strong>Valor:</strong>{" "}
        {valor.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
      </p>
      <p>
        <strong>Data:</strong> {data}
      </p>
      <p>
        <small>ID do Tanque: {tanqueId}</small>
      </p>
      <hr style={{ margin: "10px 0" }} />
      <div>
        <button style={{ marginRight: "10px" }}>Editar</button>
        <button onClick={() => onDelete(id)}>Deletar</button>
      </div>
    </div>
  );
}

export default DespesaCard;
