import React, { useState, useEffect } from "react";
import "./GardenList.css";
import { useNavigate } from "react-router-dom";

interface Props {
  data: PropsData[];
}

interface PropsData {
  imagePath: string;
  description: string;
  topic: string;
  ownerId: number;
}

const GardenList: React.FC<Props> = (props) => {
  const [data, setData] = useState(props.data);
  const navigate = useNavigate();

  useEffect(() => {
    setData(props.data);
  }, [props.data]);

  return (
    <div className="container-garden-list">
      <div className="container-garden-list_header">Seus Jardins</div>

      <div className="container-garden-list_data-container">
        <div className="container-garden-list_data">
          {data.map((item: any) => {
            return (
              <div
                className="container-garden-list_img-description"
                onClick={() => navigate("/garden/" + item.id)}
              >
                <div className="container-garden-list_img">
                  <img width="100%" src={item.imagePath} />
                </div>
                <div className="container-garden-list_description">
                  {item.description}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default GardenList;
