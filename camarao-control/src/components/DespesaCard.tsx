// src/components/DespesaCard.tsx

import { useState } from "react";
// Importamos o "molde" Tanque para usar nas props, se necessário
import { type Despesa } from "../App";


type DespesaCardProps = {
  id: string;
  tanqueId: string;
  descricao: string;
  valor: number;
  data: string;
  onDelete: (id: string) => void;
  onEditar: (
    id: string,
    novosDados: { descricao: string; valor: number; data: string }
  ) => void;
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
  const [estaEditando, setEstaEditando] = useState(false);
  const [descEditada, setDescEditada] = useState(descricao);
  const [valorEditado, setValorEditado] = useState(String(valor));
  const [dataEditada, setDataEditada] = useState(data);

  const handleSalvar = () => {
    if (!valorEditado || !descEditada) {
      alert("A descrição e o valor não podem ficar em branco.");
      return;
    }
    onEditar(id, {
      descricao: descEditada,
      valor: parseFloat(valorEditado),
      data: dataEditada,
    });
    setEstaEditando(false);
  };

  return (
    // Adicionamos 'flex flex-col' para que o card se estique verticalmente se precisar
    <div className={`m-4 flex w-80 flex-col overflow-hidden rounded-lg bg-slate-50 shadow-md ring-1 ${estaEditando ? 'ring-2 ring-sky-500' : 'ring-slate-200'}`}>
      {/* Barra de status no topo */}
      <div className="h-2 bg-red-500"></div>

      {/* Container principal com padding, que será flex e terá um espaçamento (gap) entre os filhos */}
      <div className="flex h-full flex-col justify-between p-6">
        {estaEditando ? (
          // ============ MODO DE EDIÇÃO ============
          // Usamos 'flex flex-col' e 'gap-4' para criar espaçamento vertical entre os inputs
          <div className="flex flex-grow flex-col gap-4">
            <div>
              <label htmlFor="descricao" className="block text-xs font-medium text-slate-600">Descrição</label>
              <textarea
                id="descricao"
                value={descEditada}
                onChange={(e) => setDescEditada(e.target.value)}
                rows={2}
                // Aumentamos o tamanho do texto do input com 'text-base'
                className="mt-1 block w-full rounded-md border-gray-300 text-base shadow-sm focus:border-sky-500 focus:ring-sky-500"
              />
            </div>
            
            <div>
              <label htmlFor="valor" className="block text-xs font-medium text-slate-600">Valor (R$)</label>
              <input
                id="valor"
                type="number"
                value={valorEditado}
                onChange={(e) => setValorEditado(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 text-base shadow-sm focus:border-sky-500 focus:ring-sky-500"
              />
            </div>

            <div>
              <label htmlFor="data" className="block text-xs font-medium text-slate-600">Data</label>
              <input
                id="data"
                type="date"
                value={dataEditada}
                onChange={(e) => setDataEditada(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 text-base shadow-sm focus:border-sky-500 focus:ring-sky-500"
              />
            </div>

            {/* Botões de ação do modo de edição */}
            <div className="mt-2 flex justify-end gap-3 border-t pt-4">
              <button onClick={() => setEstaEditando(false)} className="rounded-md px-3 py-1.5 text-sm font-semibold text-slate-600 shadow-sm ring-1 ring-inset ring-slate-300 transition-all hover:bg-slate-100">
                Cancelar
              </button>
              <button onClick={handleSalvar} className="rounded-md bg-green-500 px-3 py-1.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-green-600">
                Salvar
              </button>
            </div>
          </div>
        ) : (
          // ============ MODO DE VISUALIZAÇÃO ============
          // 'flex-grow' faz esta seção ocupar o espaço disponível, empurrando os botões para baixo
          <div className="flex flex-grow flex-col">
            <h4 className="text-xl font-bold text-slate-800">{descricao}</h4>
            <div className="mt-4 space-y-2">
              <p className="text-sm text-slate-700">
                <strong>Valor:</strong>
                <span className="ml-2 text-lg font-semibold text-red-600">
                  {valor.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
                </span>
              </p>
              <p className="text-sm text-slate-700">
                <strong>Data:</strong> {data}
              </p>
            </div>
            <p className="mt-2 text-xs text-slate-500">
              ID do Tanque: {tanqueId}
            </p>
            {/* Botões de ação do modo de visualização */}
            <div className="mt-4 flex justify-end gap-3 border-t pt-4">
              <button onClick={() => setEstaEditando(true)} className="rounded-md bg-violet-500 px-3 py-1.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-violet-600">
                Editar
              </button>
              <button onClick={() => onDelete(id)} className="rounded-md px-3 py-1.5 text-sm font-semibold text-red-600 shadow-sm ring-1 ring-inset ring-red-300 transition-all hover:bg-red-50">
                Deletar
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default DespesaCard;