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
      {estaEditando ? (
        // --- INÍCIO DO MODO DE EDIÇÃO ---
        <>
          <p>Modo de Edição Ativado!</p>
          {/* TODO: Coloque seus <input>s e os botões "Salvar" e "Cancelar" aqui. */}
        </>
      ) : (
        // --- FIM DO MODO DE EDIÇÃO ---

        // --- INÍCIO DO MODO DE VISUALIZAÇÃO ---
        <>
          {/* TODO: Coloque o JSX que você já tinha, com o texto e os botões "Editar" e "Deletar", aqui. */}
          <h4>{descricao}</h4>
          <p>
            <strong>Valor:</strong>{" "}
            {valor.toLocaleString("pt-BR", {
              style: "currency",
              currency: "BRL",
            })}
          </p>
          <p>
            <strong>Data:</strong> {data}
          </p>
          <p>
            <small>ID do Tanque: {tanqueId}</small>
          </p>
          <hr style={{ margin: "10px 0" }} />
          <div>
            <button onClick={() => setEstaEditando(true)}>Editar</button>
            <button onClick={() => onDelete(id)}>Deletar</button>
          </div>
        </>
        // --- FIM DO MODO DE VISUALIZAÇÃO ---
      )}
    </div>
  );
}

export default DespesaCard;
