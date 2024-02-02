import React, {useEffect, useMemo, useState} from "react";
import {useParams} from "react-router-dom";
import "./Garden.css";
import {IMessage, MqttService} from "../services/mqttService";
import LineChart from "../components/chart/LineChart";
import apiService from "../services/apiService";
import {useAuth} from "../components/AuthContext";
import Modal from "react-modal";
import GardenHeader from "../components/garden-header/GardenHeader";
import Footer from "../components/footer/Footer";
import ContainerGardenData from "../components/data/ContainerGardenData";
import {useMediaQuery} from "react-responsive";

const defaultData = [
    {
        value: 999,
        name: "Tempratura",
        temperature: true,
        description: "------------",
    },
    {
        value: 999,
        name: "Umidade",
        description: "------------",
    },
    {
        value: 999,
        name: "Luminosidade",
        description: "------------",
    },
];

const defaultSimulacao = [
    {
        data: "[100, 89, 80, 71, 63, 56, 50, 44, 39, 35, 31, 27, 24, 21, 18, 16, 14, 12, 10, 8, 7, 6, 5]",
        gardenId: 1,
        id: 1,
        isRunning: true,
        name: "Loading...",
    }
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

interface Simulacao {
    data: string;
    gardenId: number;
    id: number;
    isRunning: false;
    name: string;
}

interface SimulacaoList {
    simulacoes: Simulacao[];
}

const Garden: React.FC = () => {
    const {id} = useParams();
    const isMobile = useMediaQuery({maxWidth: 768});

    const [gardenName, setGardenName] = useState();
    const [gardenAverage, setGardenAverage] = useState(defaultData);
    const [selectedOption, setSelectedOption] = useState(0);
    const [loading, setLoading] = useState(false);
    const [chartData, setChartData] = useState(
        createChartData([
            100, 89, 80, 71, 63, 56, 50, 44, 39, 35, 31, 27, 24, 21, 18, 16, 14, 12,
            10, 8, 7, 6, 5,
        ])
    );
    const [simulacoes, setSimulacoes] = useState(defaultSimulacao);
    const {name, token} = useAuth();

    //MODAL:
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [simulationName, setSimulationName] = useState("");
    const [simulationType, setSimulationType] = useState("");
    const [simulationDays, setSimulationDays] = useState("");

    function openModal() {
        setModalIsOpen(true);
    }

    function closeModal() {
        setModalIsOpen(false);
    }

    function handleFormSubmit(e: React.FormEvent) {
        e.preventDefault();
        createNewSimulation(simulationName, simulationType, simulationDays);
        closeModal();
    }

    function createChartData(data: number[]): {
        labels: string[];
        datasets: {
            label: string;
            data: number[];
            fill: boolean;
            borderColor: string;
            tension: number;
        }[];
    } {
        return {
            labels: Array.from({length: data.length}, (_, i) => (i + 1).toString()),
            datasets: [
                {
                    label: "Saúde do Jardim",
                    data: data,
                    fill: false,
                    borderColor: "rgb(113, 201, 68)", // Cor verde
                    tension: 0.4,
                },
            ],
        };
    }

    function changeGraph(id: number) {
        setChartData(
            createChartData(simulacoes[id - 1].data.split(",").map(Number))
        );
    }

    const handleChange = (event: any) => {
        const selectedIndex = event.target.value;
        setSelectedOption(selectedIndex);

        const isRunning = simulacoes[selectedIndex].isRunning;
        setLoading(isRunning);
    };


    useEffect(() => {
        const intervalId = setInterval(() => {
            apiService.getSimulationList(token, id).then((response) => {
                if (JSON.stringify(response) !== JSON.stringify(simulacoes)) {
                    setSimulacoes(response);
                    console.log("==> Response: ", response)
                    if (selectedOption && response[selectedOption]) {
                        const newChartData = createChartData(
                            response[selectedOption].data.split(",").map(Number)
                        );
                        // Verifica se os dados do gráfico são diferentes antes de atualizar
                        if (JSON.stringify(newChartData) !== JSON.stringify(chartData)) {
                            setChartData(newChartData);
                            setLoading(false); // Atualiza o estado de loading apenas se o gráfico for atualizado
                        }
                    }
                }
            });
        }, 2000);
        return () => clearInterval(intervalId);
    }, [id, token, selectedOption, chartData, simulacoes]);

    function createNewSimulation(name: string, type: string, days: string) {
        const sensorData = gardenAverage.map((sensor) => {
            return {
                type: sensor.name,
                value: sensor.value
            };
        });
        const nome = name;
        const gardenId = id || "0";
        console.log("==> Garden ID: ", id);
        console.log("==> Token: ", token);
        console.log("==> Nome: ", nome);
        console.log("==> type: ", type);
        console.log("==> days: ", days);
        apiService
            .createSimulation(token, gardenId, nome, {sensors: sensorData})
            .then((response) => {
                console.log("====>", response);
                simulacoes.push(response);
            });
    }

    //MQTT
    useEffect(() => {
        const mqttService = new MqttService();
        mqttService.subscribe((message: IMessage) => {

            const sensorValues = separarValoresPorTipo(message as SensorData);
            const temperatura = calculateAverage(sensorValues.temperatura);
            const umidade = calculateAverage(sensorValues.umidade);
            const umidadeDoSolo = calculateAverage(sensorValues.umidadeDoSolo);

            const newGardenAverage = [
                {
                    value: temperatura,
                    name: "Tempratura",
                    temperature: true,
                    description:
                        "Tempratura media do jardim, para que as plantas possam crescer saudaveis a temperatura deve estar entre 20ºC e 30ºC",
                },
                {
                    value: umidade,
                    name: "Umidade",
                    description:
                        "Umidade media do jardim, para que as plantas possam crescer saudaveis a umidade deve estar entre 60% e 80%",
                },
                {
                    value: umidadeDoSolo,
                    name: "Umidade_do_Solo",
                    description:
                        "Umidade do solo media do jardim, para que as plantas possam crescer saudaveis a umidade do solo deve estar entre 60% e 80%",
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

    const lineChartComponent = useMemo(() => {
        return (
            <LineChart
                data={chartData}
                height={isMobile ? 300 : 400}
                width={isMobile ? 300 : 400}
            />
        );
    }, [chartData, isMobile]); // Dependências que, quando alteradas, irão disparar a recriação do componente memorizado

    return (
        <div className="garden-dashboard">
            <GardenHeader name={name}/>
            <ContainerGardenData data={gardenAverage}/>
            <div className="lista-simulacoes">
                <div className="lista-simulacoes_header">
                    <h2>Minhas Simulações</h2>
                </div>
                <div className="simulacoes">
                    <select
                        value={selectedOption}
                        onChange={(event) => {
                            handleChange(event);
                            changeGraph(parseInt(event.target.value, 10) + 1);
                        }}
                    >
                        {simulacoes.map((simulacao, index) => (
                            <option key={index} value={index}>
                                {simulacao.name}
                            </option>
                        ))}
                    </select>
                    <button className="btn-simulacao" onClick={openModal}>
                        Nova Simulaçao
                    </button>
                </div>
            </div>

            <div className="grafico">
                {loading ? (
                    <div className="loading">
                        <div className="loader"></div>
                    </div>
                ) : lineChartComponent}
            </div>

            <div className="footer">
                <Footer/>
            </div>

            <Modal
                className="formModal-container"
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                contentLabel="Nova Simulação"
                style={{
                    overlay: {
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                    },
                }}
            >
                <h2>Nova Simulação</h2>
                <form className="formModal" onSubmit={handleFormSubmit}>
                    <label>
                        Nome:
                        <input
                            type="text"
                            value={simulationName}
                            onChange={(e) => setSimulationName(e.target.value)}
                            placeholder="Digite o nome da simulação"
                        />
                    </label>
                    <label>
                        Tipo de Simulação:
                        <select
                            value={simulationType}
                            onChange={(e) => setSimulationType(e.target.value)}
                        >
                            <option value="">Selecione o tipo de simulação</option>
                            <option value="1">Sem Regar</option>
                            <option value="2">Temperatura Alta (50ºC)</option>
                            <option value="3">Baixas Temperaturas (-10ºC)</option>
                            <option value="4">Exposição Prolongada ao Sol</option>
                        </select>
                    </label>
                    <label>
                        Quantidade de Dias:
                        <input
                            type="number"
                            min="1"
                            value={simulationDays}
                            onChange={(e) => setSimulationDays(e.target.value)}
                            placeholder="Digite a quantidade de dias"
                        />
                    </label>
                    <button type="submit">Criar</button>
                </form>
            </Modal>
        </div>
    );
};

export default Garden;
