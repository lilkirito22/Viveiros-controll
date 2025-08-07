// src/components/TanqueCard.tsx

// Este componente vai exibir as informações de um único tanque.
function TanqueCard() {
  return (
    <div style={{ border: '1px solid black', padding: '16px', margin: '16px', borderRadius: '8px' }}>
      <h2>Tanque 01</h2>
      <p>Status: Em operação</p>
      <p>Lote Atual: LOTE-001</p>
    </div>
  );
}

export default TanqueCard;