// src/components/DespesaCard.tsx

import { useState } from "react";

type DespesaCardProps = {
  id: string;
  tanqueId: string;
  descricao: string;
  valor: number;
  data: string;
  onDelete: (id: string) => void;
  // Adicionamos a prop para atualizar, que vem lá do App.tsx
  onEditar: (id: string, novosDados: { descricao: string; valor: number; data: string }) => void;
};

function DespesaCard({
  id,
  tanqueId,
  descricao,
  valor,
  data,
  onDelete,
  onEditar,
}: DespesaCardProps) {
  // --- ESTADOS LOCAIS DO CARD ---

  // 1. O "Interruptor" que controla se estamos em modo de edição ou visualização.
  const [estaEditando, setEstaEditando] = useState(false);

  // 2. Estados temporários para guardar o que o usuário digita nos inputs de edição.
  //    Iniciamos eles com os valores atuais da despesa (vindas das props).
  const [descEditada, setDescEditada] = useState(descricao);
  const [valorEditado, setValorEditado] = useState(String(valor)); // Inputs de número funcionam melhor com strings
  const [dataEditada, setDataEditada] = useState(data);

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
      descricao: descEditada,
      valor: parseFloat(valorEditado), // Converte o valor de volta para número
      data: dataEditada,
    });

    // Desliga o modo de edição para voltar à visualização normal.
    setEstaEditando(false);
  };

  return (
    <div style={{ border: '1px solid #ccc', borderRadius: '8px', padding: '16px', margin: '10px', width: '300px' }}>
      
      {/* 4. AQUI ESTÁ A RENDERIZAÇÃO CONDICIONAL */}
      {estaEditando ? (
        // ============ SE ESTIVÉR EDITANDO (true), MOSTRAR ISSO: ============
        <>
          <input
            type="text"
            value={descEditada}
            onChange={(e) => setDescEditada(e.target.value)}
            style={{ marginBottom: '8px', width: '95%' }}
          />
          <input
            type="number"
            value={valorEditado}
            onChange={(e) => setValorEditado(e.target.value)}
            style={{ marginBottom: '8px', width: '95%' }}
          />
          <input
            type="date"
            value={dataEditada}
            onChange={(e) => setDataEditada(e.target.value)}
            style={{ marginBottom: '8px', width: '95%' }}
          />
          <hr />
          <button onClick={handleSalvar} style={{ marginRight: '10px' }}>Salvar</button>
          <button onClick={() => setEstaEditando(false)}>Cancelar</button>
        </>
      ) : (
        // ============ SE NÃO ESTIVER EDITANDO (false), MOSTRAR ISSO: ============
        <>
          <h4>{descricao}</h4>
          <p>
            <strong>Valor:</strong> {valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
          </p>
          <p>
            <strong>Data:</strong> {data}
          </p>
          <p><small>ID do Tanque: {tanqueId}</small></p>
          <hr style={{ margin: '10px 0' }} />
          <div>
            <button onClick={() => setEstaEditando(true)} style={{ marginRight: '10px' }}>Editar</button>
            <button onClick={() => onDelete(id)}>Deletar</button>
          </div>
        </>
      )}
    </div>
  );
}

export default DespesaCard;