import { useState, useEffect } from "react";
import { AiOutlineGithub } from "react-icons/ai";
import BarsMenu from "./BarsMenu";
import useScreenWidth from "../../hooks/useScreenWidth";
import useScrollDirection from "../../hooks/useScrollDirection";

import "./header.scss";

const Header = () => {
  const [showBarsMenu, setShowBarsMenu] = useState(false);
  const scrollDirection = useScrollDirection();
  const isDesktop = useScreenWidth();

  useEffect(() => {
    if (showBarsMenu && scrollDirection === "down") {
      setShowBarsMenu(false);
    }
  }, [scrollDirection, showBarsMenu]);

  const toggleBarsMenu = () => setShowBarsMenu(!showBarsMenu);

  return (
    <header
      className={`header ${
        scrollDirection === "up"
          ? "scroll-up"
          : scrollDirection === "down"
          ? "scroll-down"
          : ""
      }`}
    >
      <div className="container">
        <a href="/">
          <img src={`${process.env.PUBLIC_URL}/logo.png`} alt="homepage" />
        </a>
        {isDesktop ? (
          <nav className="desktop-nav">
           
          </nav>
        ) : (
          <BarsMenu showBarsMenu={showBarsMenu} toggle={toggleBarsMenu} />
        )}
      </div>
    </header>
  );
};

export default Header;
