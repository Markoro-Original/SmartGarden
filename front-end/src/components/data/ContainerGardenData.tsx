import React, { useEffect, useState } from "react";
import "./ContainerGardenData.css";

interface Props {
  data: PropsData[];
}

interface PropsData {
  value: number;
  description: string;
  temperature?: boolean;
}

const ContainerGardenData: React.FC<Props> = (props) => {
  const [data, setData] = useState(props.data);

  useEffect(() => {
    setData(props.data);
  }, [props.data]);

  return (
    <div className="container-garden-data">
      <div className="container-garden-data_header">
        Informações gerais sobre seus jardins
      </div>

      <div className="container-garden-data_information">
        {data.map((item: any) => {
          return (
            <div className="container-garden-data_percentage-description">
              <div className="container-garden-data_value">
                {item.value !== 999 ? item.value : "--"}
                {item.value !== 999 ? (
                  item.temperature ? (
                    <span>°</span>
                  ) : (
                    <span>%</span>
                  )
                ) : (
                  ""
                )}
              </div>
              <div className="container-garden-data_description">
                {item.value !== 999 ? item.name : "------"}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ContainerGardenData;
