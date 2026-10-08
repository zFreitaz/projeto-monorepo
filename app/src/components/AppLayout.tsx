import { Outlet, Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export function AppLayout() {
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <header className="bg-white border-b px-6 py-4 flex justify-between items-center">
        {/* Lado Esquerdo: apenas o título */}
        <div>
          <span className="font-bold text-slate-800">Sistema Web</span>
        </div>

        {/* Lado Direito: Navegação + Usuário + Logout */}
        <div className="flex items-center gap-6 text-sm">
          <nav className="flex gap-4 font-medium text-slate-600">
            <Link to="/dashboard" className="hover:text-blue-600">
              Painel
            </Link>
            <Link to="/perfil" className="hover:text-blue-600">
              Perfil
            </Link>
          </nav>

          <span className="text-slate-600 font-medium">
            {user?.nome || user?.email}
          </span>
          <button
            onClick={logout}
            className="text-red-600 hover:text-red-700 font-medium transition-colors"
          >
            Sair
          </button>
        </div>
      </header>
      <main className="flex-1 max-w-6xl w-full mx-auto p-6">
        {/* As rotas filhas serão renderizadas aqui */}
        <Outlet />
      </main>
    </div>
  );
}