// src/App.tsx

import TanqueCard from "./components/TanqueCard";

function App() {
  return (
    <div>
      <h1>Controle de Viveiros de Camarão</h1>

      {/* 2. Usamos o componente como se fosse uma tag HTML */}
      <TanqueCard />
      <TanqueCard />
      <TanqueCard />
    </div>
  );
}

export default App;
