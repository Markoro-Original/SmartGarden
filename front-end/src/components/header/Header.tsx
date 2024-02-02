import React from "react";
import "./Header.css";
import { useNavigate } from "react-router-dom";

interface Props {
  userName: string;
}

const Header: React.FC<Props> = (props) => {
  const { userName } = props;
  const navigate = useNavigate();

  function logout() {
    console.log("logout");
    navigate("/");
  }

  return (
    <div className="container-header">
      <div className="container-header_data">
        <div className="container-header_logo-action">
          <div className="container-header_logo">
            <img src="logo.png" />
            <p>
              SmartGarden<span>Web</span>
            </p>
          </div>

          <div className="container-header_logout" onClick={() => logout()}>
            Sair <i className="bi bi-door-open-fill" />
          </div>
        </div>

        <div className="container-header_username-settings">
          <div className="container-header_username">Olá, {userName}</div>

          <div className="container-header_settings">
            Configurações <i className="bi bi-gear-fill"></i>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
