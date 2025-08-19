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
    <div className="m-4 w-80 rounded-lg border border-gray-200 bg-white p-6 shadow-md"  >
      {/* 3. Em vez de texto fixo, usamos as variáveis que recebemos via props. */}
      <h2>{nomeDoTanque}</h2>
      <p>{status}</p>
      <p>Lote Atual: {loteAtual}</p>

      <button onClick={() => onDelete(idDoTanque)}>Deletar</button>
      <button onClick={() => onEdite(idDoTanque)}>Mudar Status</button>
    </div>
  );
}

export default TanqueCard;
