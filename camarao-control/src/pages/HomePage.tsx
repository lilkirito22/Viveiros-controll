// src/pages/HomePage.tsx

// --- IMPORTS ---
// Importamos as ferramentas e componentes que esta página usa
import AdicionarTanqueForm from '../components/AdicionarTanqueForm';
import TanqueCard from '../components/TanqueCard';
// Importamos os "moldes" que o App.tsx exportou
import { type Tanque } from '../App';

// --- CONTRATO DE PROPS ---
// Definimos tudo que essa página ESPERA RECEBER do seu pai (App.tsx)
type HomePageProps = {
  tanques: Tanque[];
  statusOptions: string[];
  onAdicionarTanque: (dados: { nome: string; status: string; lote: string; }) => void;
  onDeletarTanque: (id: string) => void;
  onMudarStatus: (id: string) => void;
};

// --- O COMPONENTE ---
// Recebemos o "kit de ferramentas" (as props) e as usamos para montar a página
function HomePage({
  tanques,
  statusOptions,
  onAdicionarTanque,
  onDeletarTanque,
  onMudarStatus,
}: HomePageProps) {

  // !!! NOTE QUE NÃO HÁ MAIS NENHUM useState OU handle... AQUI !!!
  // Toda a lógica foi movida para o App.tsx

  return (
    <div>
      <h1>Gerenciamento de Viveiros</h1>

      <AdicionarTanqueForm
        statusOptions={statusOptions}
        onAdicionar={onAdicionarTanque}
      />

      <hr />

      <div className="lista-de-tanques">
        {tanques.map((tanque) => (
          <TanqueCard
            key={tanque.id}
            idDoTanque={tanque.id}
            nomeDoTanque={tanque.nome}
            status={tanque.status}
            loteAtual={tanque.lote}
            onDelete={onDeletarTanque}
            onEdite={onMudarStatus} // 'onEdite' era um typo, o ideal é onEdit ou onUpdate, mas mantive seu padrão
          />
        ))}
      </div>
    </div>
  );
}

export default HomePage;