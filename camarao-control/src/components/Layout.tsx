// src/components/Layout.tsx

import { Link, Outlet } from "react-router-dom";

function Layout() {
  return (
    // O container principal com a cor de fundo cinza que cobre toda a tela
    <div className="min-h-screen bg-slate-100 text-slate-800">
      {/* Cabeçalho */}
      <header className="bg-white shadow-sm">
        <nav className="mx-auto max-w-5xl px-4 py-3">
          <ul className="flex items-center gap-6">
            <li>
              <Link
                to="/"
                className="font-semibold text-slate-600 hover:text-sky-500 transition-colors"
              >
                Viveiros
              </Link>
            </li>
            <li>
              <Link
                to="/financeiro"
                className="font-semibold text-slate-600 hover:text-sky-500 transition-colors"
              >
                Financeiro
              </Link>
            </li>
          </ul>
        </nav>
      </header>

      {/* Área de Conteúdo Principal */}
      <main className="mx-auto max-w-5xl p-4 sm:p-6 md:p-8">
        {/* A MÁGICA ACONTECE AQUI! */}
        <Outlet />
      </main>
    </div>
  );
}

export default Layout;
