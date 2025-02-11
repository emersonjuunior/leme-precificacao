import BurgerMenu from "./BurgerMenu";
import Menu from "./Menu";
import { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { useAuthValue } from "../context/AuthContext";

const Header = () => {
  const [menu, setMenu] = useState(false);
  const { user } = useAuthValue();

  const toggleMenu = () => {
    setMenu((prev) => !prev);
  };

  return (
    <header className="h-[8vh] w-screen flex justify-between items-center bg-slate-300 mb-12 px-3">
      <div className="md:w-[25%] flex justify-center">
        <Link to="/">
          <img
            src="/logo.jpg"
            alt="Logo Leme Work"
            className="w-30 md:w-35 object-cover"
          />
        </Link>
      </div>
      {user && (
        <>
          <nav className="hidden menu:block w-1/2">
            <ul className="flex w-full justify-end items-center pr-10 gap-10 text-xl text-zinc-700 font-medium">
              <li className="min-w-fit">
                <NavLink to="/">Início</NavLink>
              </li>
              <li className="min-w-fit">
                <NavLink to="/valor-trabalho">Valor do Trabalho</NavLink>
              </li>
              <li className="min-w-fit">
                <NavLink to="/despesas-fixas">Despesas Fixas</NavLink>
              </li>
              <li className="min-w-fit">
                <NavLink to="/despesas-variaveis">Despesas Variáveis</NavLink>
              </li>
              <li className="min-w-fit">
                <NavLink to="/servicos">Meus Serviços</NavLink>
              </li>
            </ul>
          </nav>
          <menu className="menu:hidden px-2 md:pr-10 md:scale-125">
            <BurgerMenu toggleMenu={toggleMenu} menu={menu} />
          </menu>
          {menu && <Menu toggleMenu={toggleMenu} />}
        </>
      )}
    </header>
  );
};

export default Header;
