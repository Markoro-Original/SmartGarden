import React, { useState } from "react";
import "./MobileHeader.css";
import { Menu } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface Props {
  userName: string;
}

const MobileHeader: React.FC<Props> = ({ userName }) => {
  const navigate = useNavigate();

  const [isToggled, setIsToggled] = useState(false);

  function toggleMenu() {
    setIsToggled(!isToggled);
  }

  function logout() {
    console.log("logout");
    navigate("/");
  }

  return (
    <div className="container-mobile-header">
      <div className="container-mobile-header_logo">
        <img src="logo.png" />
      </div>
      <div className="container-mobile-header_username">
        Olá, {userName}
        <Menu onClick={toggleMenu} className="mobile-header_menu" />
        {isToggled && (
          <div className="container-mobile-header_menu">
            <div className="container-mobile-header_menu-item">
              Configurações
            </div>
            <div
              className="container-mobile-header_menu-item"
              onClick={() => logout()}
            >
              Sair
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MobileHeader;
