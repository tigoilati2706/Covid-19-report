import { AiOutlineGithub, AiOutlineClose } from "react-icons/ai";

import "./barsmenu.scss";

const BarMenu = ({ showBarsMenu, toggle }) => {
  return (
    <>
      <div className="bars__container">
        <div className="bars-menu" onClick={() => toggle()}>
          <span className="bars"></span>
        </div>
      </div>
      <nav className={`side-nav ${showBarsMenu ? "active" : ""}`}>
        <ul>
          <div className="close-icon" onClick={() => toggle()}>
            <AiOutlineClose size={25} />
          </div>
          <li onClick={() => toggle()}>
            <a className="" href="#global">
              Global
            </a>
          </li>
          <li onClick={() => toggle()}>
            <a className="" href="#countries">
              Country
            </a>
          </li>
        </ul>
        <div className="source-links">
          <p>
            Source:{" "}
            <span>
              <a
                href="https://ourworldindata.org/coronavirus"
                target="_blank"
                rel="noopener noreferrer"
              >
                Our World in Data
              </a>
            </span>
          </p>
          <a
            className="github-link"
            target="_blank"
            rel="noopener noreferrer"
          >
            <AiOutlineGithub size={0} />
          </a>
        </div>
      </nav>
    </>
  );
};

export default BarMenu;
