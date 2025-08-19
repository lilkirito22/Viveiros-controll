// 1. Definimos o "molde" das informações que nosso componente vai receber.
//    Ele espera receber um nome, um status e um lote, todos como texto (string).

type TanqueCardProps = {
  idDoTanque: string;
  nomeDoTanque: string;
  status: string;
  loteAtual: string;
  onDelete: (id: string) => void;
  onEdite: (id: string) => void;
};

// 2. Avisamos à função que ela vai receber 'props' que seguem aquele molde.
//    Usamos a "desestruturação" ({...}) para pegar as propriedades diretamente.

function TanqueCard({
  idDoTanque,
  nomeDoTanque,
  status,
  loteAtual,
  onDelete,
  onEdite,
}: TanqueCardProps) {
  return (
// Opção C: Robusto e Informativo
<div className="m-4 w-80 overflow-hidden rounded-lg bg-slate-50 shadow-md ring-1 ring-slate-200">
  {/* Barra de Status Colorida no Topo */}
  <div className="h-2 bg-green-500"></div>

  <div className="flex flex-col justify-between p-6">
    {/* Cabeçalho */}
    <div>
      <h2 className="text-lg font-bold text-slate-800">{nomeDoTanque}</h2>
      <p className="text-sm text-slate-500">Status: {status}</p>
    </div>

    {/* Corpo */}
    <div className="my-4 rounded-md border border-slate-200 bg-white p-3">
      <p className="text-sm font-medium text-slate-700">Lote Atual</p>
      <p className="text-lg text-slate-900">{loteAtual}</p>
    </div>

    {/* Rodapé com os Botões */}
    <div className="mt-2 flex justify-end gap-3">
      {/* Botão com estilo "outline" */}
      <button
        onClick={() => onDelete(idDoTanque)}
        className="rounded-md px-3 py-1.5 text-sm font-semibold text-red-600 shadow-sm ring-1 ring-inset ring-red-300 transition-all hover:bg-red-50"
      >
        Deletar
      </button>
      <button
        onClick={() => onEdite(idDoTanque)}
        className="rounded-md bg-slate-700 px-3 py-1.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-slate-800"
      >
        Mudar Status
      </button>
    </div>
  </div>
</div>
  );
}

export default TanqueCard;
