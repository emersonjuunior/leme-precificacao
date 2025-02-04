import { useAuthValue } from "../context/AuthContext";
import { useAuthentication } from "../hooks/useAuthentication";
import { Link } from "react-router-dom";

const Menu = ({toggleMenu}) => {
  const { user } = useAuthValue();
  const { logout } = useAuthentication()

  return (
    <nav className="absolute z-30 right-0 top-[8vh] min-h-[92vh] w-full max-w-sm bg-slate-200 border-slate-300 border-1 text-slate-700 text-xl">
      <ul className="pt-4 flex flex-col items-center justify-center gap-6">
        {user && <li>Olá, <span className="font-bold">{user.displayName}</span></li>}
        {user && <li><Link to="/despesas-fixas">Despesas Fixas</Link></li>}
        {user && <li className="absolute bottom-4 cursor-pointer" onClick={logout}>Sair</li>}
      </ul>
    </nav>
  );
};

export default Menu;
