import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

import "./GardenHeader.css";
import { useMediaQuery } from "react-responsive";

type GardenHeaderProps = {
  name: string;
};

const GardenHeader = ({ name }: GardenHeaderProps) => {
  const navigate = useNavigate();

  const isMobile = useMediaQuery({ maxWidth: 768 });

  function backToDashboard() {
    console.log("Back to dashboard");
    navigate("/dashboard");
  }

  return (
    <div className="container-garden-header">
      <div className="container-garden-header_logo">
        <img className="garden-header-logo" src="/logo.png" alt="logo" />
      </div>
      <div>Garden</div>
      <div
        className="garden-header-back-button"
        onClick={() => backToDashboard()}
      >
        <ArrowLeft className="arrow-left" />
        {isMobile ? "" : "Voltar"}
      </div>
    </div>
  );
};

export default GardenHeader;
