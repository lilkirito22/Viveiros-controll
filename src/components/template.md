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
    <div className="m-4 w-80 rounded-lg border border-gray-200 bg-white p-6 shadow-md">
      {/* 3. Em vez de texto fixo, usamos as variáveis que recebemos via props. */}
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-slate-800">{nomeDoTanque}</h2>
        <span className="rounded-full bg-green-100 px-2 py-1 text-xs font-semibold text-green-800">
          {status}
        </span>
      </div>
      <p className="my-4 text-slate-600">Lote Atual: {loteAtual}</p>
      <div className="flex justify-end gap-2">
        <button
          className="bg-sky-500 text-white hover:bg-sky-600 rounded px-3 py-1 text-sm font-semibold transition-colors"
          onClick={() => onDelete(idDoTanque)}
        >
          Deletar
        </button>
        <button onClick={() => onEdite(idDoTanque)}>Mudar Status</button>
      </div>
    </div>
  );
}

export default TanqueCard;
