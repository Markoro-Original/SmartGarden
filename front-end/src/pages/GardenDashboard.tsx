import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMediaQuery } from "react-responsive";

import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";
import MobileHeader from "../components/mobile-header/MobileHeader";
import ContainerGardenData from "../components/data/ContainerGardenData";
import GardenList from "../components/cards-list/GardenList";
import "./GardenDashboard.css";
import { useAuth } from "../components/AuthContext";
import apiService from "../services/apiService";
import { IMessage, MqttService } from "../services/mqttService";

const defaultData = [
  {
    value: 999,
    description: "Tempratura",
    temperature: true,
  },
  {
    value: 999,
    description: "Umidade",
  },
  {
    value: 999,
    description: "Luminosidade",
  },
];

const card = [
  {
    description: "Jardim 1",
    topic: "garden1",
    ownerId: 1,
    imagePath: "garden1.png",
  },
  {
    description: "Jardim 2",
    topic: "garden2",
    ownerId: 1,
    imagePath: "garden2.png",
  },
  {
    description: "Jardim 3",
    topic: "garden3",
    ownerId: 1,
    imagePath: "garden3.png",
  },
  {
    description: "Jardim 4",
    topic: "garden4",
    ownerId: 1,
    imagePath: "garden4.png",
  },
];

interface Sensor {
  id: string;
  tipo: string;
  valor: string;
  unidade: string;
}

interface SensorData {
  mac: string;
  ssid: string;
  data: string;
  sensores: Sensor[];
}

interface SeparatedSensorValues {
  temperatura: number[];
  umidade: number[];
  umidadeDoSolo: number[];
  luz: number[];
}

const GardenDashboard: React.FC = () => {
  const { name, token } = useAuth();

  const isMobile = useMediaQuery({ maxWidth: 768 });

  const [gardenAverage, setGardenAverage] = useState(defaultData);
  const [gardenList, setGardenList] = useState(card);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchGardens = () => {
      apiService
        .getGardenList(token)
        .then((gardens) => {
          const formattedGardens = gardens.map((garden, index) => {
            return {
              id: garden.id,
              description: garden.title,
              topic: garden.topic,
              ownerId: garden.ownerId,
              imagePath: `garden${index + 1}.png`,
            };
          });
          console.log(formattedGardens);
          setGardenList(formattedGardens);
        })
        .catch((error) => {
          navigate("/");
        });
    };
    fetchGardens();
  }, []);

  useEffect(() => {
    const mqttService = new MqttService();
    mqttService.subscribe((message: IMessage) => {
      console.log("=>", JSON.stringify(message));
      const sensorValues = separarValoresPorTipo(message as SensorData);
      const temperatura = calculateAverage(sensorValues.temperatura);
      const umidade = calculateAverage(sensorValues.umidade);
      const umidadeDoSolo = calculateAverage(sensorValues.umidadeDoSolo);

      const newGardenAverage = [
        {
          value: temperatura,
          description: "Tempratura",
          temperature: true,
        },
        {
          value: umidade,
          description: "Umidade",
        },
        {
          value: umidadeDoSolo,
          description: "Umidade do Solo",
        },
      ];
      setGardenAverage(newGardenAverage);
    });
  }, []);

  const calculateAverage = (sensorValues: number[]): number => {
    const sum = sensorValues.reduce(
      (previousValue, currentValue) => previousValue + currentValue,
      0
    );
    return Math.round(sum / sensorValues.length);
  };

  function separarValoresPorTipo(dados: SensorData): SeparatedSensorValues {
    const valoresSeparados: SeparatedSensorValues = {
      temperatura: [],
      umidade: [],
      umidadeDoSolo: [],
      luz: [],
    };

    dados.sensores.forEach((sensor) => {
      const valorNumerico = parseFloat(sensor.valor);

      switch (sensor.tipo) {
        case "temperatura":
          valoresSeparados.temperatura.push(valorNumerico);
          break;
        case "umidade":
          valoresSeparados.umidade.push(valorNumerico);
          break;
        case "umidade_do_solo":
          valoresSeparados.umidadeDoSolo.push(valorNumerico);
          break;
        case "luz":
          valoresSeparados.luz.push(valorNumerico);
          break;
      }
    });

    return valoresSeparados;
  }

  return (
    <div className="garden-dashboard">
      {isMobile ? <MobileHeader userName={name} /> : <Header userName={name} />}
      <ContainerGardenData data={gardenAverage} />
      <GardenList data={gardenList} />
      <div className="footer">
        <Footer />
      </div>
    </div>
  );
};

export default GardenDashboard;
