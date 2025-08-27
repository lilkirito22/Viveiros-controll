import { useState } from "react";

type VendasCardProps = {
  id: string;
  tanqueId: string;
  data: string;
  pesoTotalKg: number;
  valorTotal: number;
  gramatura: number;
  precoTabela: number;
  onDelete: (id: string) => void;
  // Adicionamos a prop para atualizar, que vem lá do App.tsx
  onEditar: (
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

function VendasCard({
  id,
  tanqueId,
  data,
  pesoTotalKg,
  valorTotal,
  gramatura,
  precoTabela,
  onEditar,
  onDelete,
}: VendasCardProps) {
  const [estaEditando, setEstaEditando] = useState(false);

  const [dataEditada, setDataEditada] = useState(data);
  const [pesoEditado, setPesoEditado] = useState(String(pesoTotalKg));
  const [valorEditado, setValorEditado] = useState(String(valorTotal));
  const [gramaEditado, setGramaEditado] = useState(String(gramatura));
  const [tabelaEditado, setTabelaEditado] = useState(String(precoTabela));

  // --- FUNÇÕES LOCAIS ---

  // 3. Função chamada quando o botão "Salvar" é clicado.
  const handleSalvar = () => {
    // Validação para garantir que o valor não é vazio
    if (!valorEditado) {
      alert("O valor não pode ficar em branco.");
      return;
    }

    // Avisa ao "pai" (App.tsx) para rodar a lógica de atualização,
    // enviando o ID da despesa e os novos dados coletados dos estados locais.
    onEditar(id, {
      data: dataEditada,
      pesoTotalKg: parseFloat(pesoEditado),
      valorTotal: parseFloat(valorEditado),
      gramatura: parseFloat(gramaEditado),
      precoTabela: parseFloat(tabelaEditado),
    });

    // Desliga o modo de edição para voltar à visualização normal.
    setEstaEditando(false);
  };

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
      {/* 4. AQUI ESTÁ A RENDERIZAÇÃO CONDICIONAL */}
      {estaEditando ? (
        // ============ SE ESTIVÉR EDITANDO (true), MOSTRAR ISSO: ============
        <>
          <input
            type="number"
            value={pesoEditado}
            onChange={(e) => setPesoEditado(e.target.value)}
            style={{ marginBottom: "8px", width: "95%" }}
          />
          <input
            type="date"
            value={dataEditada}
            onChange={(e) => setDataEditada(e.target.value)}
            style={{ marginBottom: "8px", width: "95%" }}
          />
          <input
            type="number"
            value={valorEditado}
            onChange={(e) => setValorEditado(e.target.value)}
            style={{ marginBottom: "8px", width: "95%" }}
          />
          <input
            type="number"
            value={gramaEditado}
            onChange={(e) => setGramaEditado(e.target.value)}
            style={{ marginBottom: "8px", width: "95%" }}
          />
          <input
            type="number"
            value={tabelaEditado}
            onChange={(e) => setTabelaEditado(e.target.value)}
            style={{ marginBottom: "8px", width: "95%" }}
          />
          <hr />
          <button onClick={handleSalvar} style={{ marginRight: "10px" }}>
            Salvar
          </button>
          <button onClick={() => setEstaEditando(false)}>Cancelar</button>
        </>
      ) : (
        // ============ SE NÃO ESTIVER EDITANDO (false), MOSTRAR ISSO: ============
        <>
          <p>
            <strong>Peso Total:</strong>{" "}
            {pesoTotalKg.toLocaleString("pt-BR", {
              style: "unit",
              unit: "kilogram",
              minimumFractionDigits: 2,
            })}
          </p>

          <p>
            <strong>Valor Total:</strong>{" "}
            {valorTotal.toLocaleString("pt-BR", {
              style: "currency",
              currency: "BRL",
            })}
          </p>
          <p>
            <strong>Data:</strong> {data}
          </p>
          <p>
            <strong>Gramatura:</strong>{" "}
            {gramatura.toLocaleString("pt-BR", {
              style: "unit",
              unit: "gram",
            })}
          </p>
          <p>
            <strong>Valor Tabela:</strong>{" "}
            {precoTabela.toLocaleString("pt-BR", {
              style: "currency",
              currency: "BRL",
            })}
          </p>
          <p>
            <small>ID do Tanque: {tanqueId}</small>
          </p>
          <hr style={{ margin: "10px 0" }} />
          <div>
            <button
              onClick={() => setEstaEditando(true)}
              style={{ marginRight: "10px" }}
            >
              Editar
            </button>
            <button onClick={() => onDelete(id)}>Deletar</button>
          </div>
        </>
      )}
    </div>
  );
}

export default VendasCard;
