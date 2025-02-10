import { useAuthValue } from "../context/AuthContext";
import { useAuthentication } from "../hooks/useAuthentication";
import { NavLink } from "react-router-dom";

const Menu = ({ toggleMenu }) => {
  const { user } = useAuthValue();
  const { logout } = useAuthentication();

  return (
    <nav className="absolute z-30 right-0 top-[8vh] min-h-[92vh] w-full max-w-[400px] bg-slate-200 border-slate-300 border-1 text-slate-700 text-xl menu:hidden">
      {user && (
        <ul className="pt-4 flex flex-col items-center justify-center gap-6">
          <li className="text-2xl relative flex-1 w-7/10 text-center border-b-1 border-gray-400 p-4">
            Olá, <span className="font-bold">{user.displayName}</span>
          </li>
          <li onClick={toggleMenu}>
            <NavLink to="/">Início</NavLink>
          </li>
          <li onClick={toggleMenu}>
            <NavLink to="/valor-trabalho">Valor do Trabalho</NavLink>
          </li>
          <li onClick={toggleMenu}>
            <NavLink to="/despesas-fixas">Despesas Fixas</NavLink>
          </li>
          <li onClick={toggleMenu}>
            <NavLink to="/despesas-variaveis">Despesas Variáveis</NavLink>
          </li>
          <li onClick={toggleMenu}>
            <NavLink to="/servicos">Meus Serviços</NavLink>
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
