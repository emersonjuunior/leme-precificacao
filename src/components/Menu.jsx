import { useAuthValue } from "../context/AuthContext";
import { useAuthentication } from "../hooks/useAuthentication";
import { Link } from "react-router-dom";

const Menu = ({ toggleMenu }) => {
  const { user } = useAuthValue();
  const { logout } = useAuthentication();

  return (
    <nav className="absolute z-30 right-0 top-[8vh] min-h-[92vh] w-full max-w-[400px] bg-slate-200 border-slate-300 border-1 text-slate-700 text-xl">
      {user && (
        <ul className="pt-4 flex flex-col items-center justify-center gap-6">
          <li className="text-2xl relative flex-1 w-7/10 text-center border-b-1 border-gray-400 p-4">
            Olá, <span className="font-bold">{user.displayName}</span>
          
          </li>
          <li onClick={toggleMenu}>
            <Link to="/despesas-fixas">Despesas Fixas</Link>
          </li>
          <li onClick={toggleMenu}>
            <Link to="/despesas-variaveis">Despesas Variáveis</Link>
          </li>
          <li onClick={toggleMenu}>
            <Link to="/servicos">Meus Serviços</Link>
          </li>
          <li
            className="cursor-pointer"
            onClick={() => {
              logout();
              toggleMenu();
            }}
          >
            Sair
          </li>
        </ul>
      )}
    </nav>
  );
};

export default Menu;
