import BurgerMenu from "./BurgerMenu";
import Menu from "./Menu";
import { useState } from "react";
import { Link } from "react-router-dom";

const Header = () => {
  const [menu, setMenu] = useState(false);

  const toggleMenu = () => {
    setMenu((prev) => !prev);
  };

  return (
    <header className="h-[8vh] w-screen flex justify-between items-center bg-slate-300 mb-12 px-3">
      <div className="md:w-3/10 flex justify-center">
        <Link to="/">
          <img
            src="/logo.jpg"
            alt="Logo Leme Work"
            className="w-30 md:w-35 object-cover"
          />
        </Link>
      </div>
      <menu className="px-2 md:pr-10 md:scale-125">
        <BurgerMenu toggleMenu={toggleMenu} menu={menu} />
      </menu>
      {menu && <Menu toggleMenu={toggleMenu} />}
    </header>
  );
};

export default Header;
