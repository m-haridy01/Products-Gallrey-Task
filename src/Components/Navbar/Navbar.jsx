import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { HandleThemeContext } from "../../../../Contexts/ThemeContextProvider";
import { LogOut, MoonIcon, ShoppingCart, SunIcon } from "lucide-react";
export default function Navbar() {
  let { theme, toggleTheme } = useContext(HandleThemeContext);

  return (
    <nav className=" fixed top-0 left-0 right-0 py-4 bg-slate-300 shadow-md z-50 dark:bg-slate-800">
      <div className="container flex justify-between items-center ">
        {/* Logo */}
        <Link className="text-main text-2xl font-semibold" to={"/"}>
          Products Gallery
        </Link>

        {/* Dark & Cart */}
        <div className="flex items-center gap-10">
          {/* Cart */}
          <Link to="/cart" className="relative">
            
            <ShoppingCart size={25} className="cursor-pointer text-main" />
          </Link>

          {/* Dark Mood */}
          <span onClick={toggleTheme}>
            {theme === "light" ? (
              <MoonIcon size={25} className="cursor-pointer text-main" />
            ) : (
              <SunIcon size={25} className="cursor-pointer text-main" />
            )}
          </span>

          {/* LogOut */}
          <Link to={'/register'}>
            <LogOut className="cursor-pointer text-main" />
          </Link>
        </div>
      </div>
    </nav>
  );
}
