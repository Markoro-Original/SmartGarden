import {Request, Response} from "express";
import {prisma} from "../database/prismaClient";

interface Sensor {
    type: string,
    value: number,
}

interface SensorData {
    sensors: Sensor[],
}

export class GardenController {

    static createGarden = async (req: Request, res: Response) => {
        console.log(req.body)
        const {title, topic} = req.body;
        const garden = await prisma.garden.create({
            data: {
                title,
                topic,
                ownerId: req.body.user.id
            }
        });
        return res.json(garden);
    };

    static getGardensByUserId = async (req: Request, res: Response) => {
        console.log(req.body)
        const gardens = await prisma.garden.findMany({
            where: {
                ownerId: req.body.user.id
            }
        });
        return res.json(gardens);
    }

    static getGardenById = async (req: Request, res: Response) => {
        const garden = await prisma.garden.findFirst({
            where: {
                id: Number(req.params.id)
            }
        });
        return res.json(garden);
    }

    static getSimulationsByGardenId = async (req: Request, res: Response) => {
        const { gardenId } = req.params;
        const id = Number(gardenId) || 0;
        console.log(id)
        const simulations = await prisma.simulation.findMany({
            where: {
                gardenId: id
            }
        });
        return res.json(simulations);
    }
    static createSimulation = async (req: Request, res: Response) => {
        const {gardenId, name, sensorData} = req.body;

        const simulation = await prisma.simulation.create({
            data: {
                name,
                gardenId: Number(gardenId),
                isRunning: true,
                data: "0",
            }
        });

        this.gerarSimulacaoEAtualizar(simulation.id, sensorData);

        return res.json(simulation);
    }


    static gerarSimulacaoEAtualizar = async (simulationId: number, sensorData: any) => {
        try {
            console.log(sensorData)
            console.log(simulationId)
            console.log("Gerando simulação...");

            const simulationData = this.calculatePlantHealth(sensorData, 30)

            // Wait for 30 seconds
            await new Promise(resolve => setTimeout(resolve, 10000));
            console.log("Simulação gerada!")
            console.log("==>");
            const updatedSimulation = await prisma.simulation.update({
                where: {
                    id: simulationId
                },
                data: {
                    isRunning: false,
                    data: JSON.stringify(simulationData),
                }
            });
            console.log("Simulação atualizada!")
        } catch (error) {
            console.error(`Error while generating simulation: ${error}`);
        }
    }

    static calculateInitialHealth(soilMoisture: number, airHumidity: number, temperature: number): number {
        // Os pesos podem ser ajustados conforme a necessidade
        const soilMoistureWeight = 0.5;
        const airHumidityWeight = 0.3;
        const temperatureWeight = 0.2;

        // Calcula a saúde inicial com base nos valores dos sensores
        let initialHealth = soilMoisture * soilMoistureWeight + airHumidity * airHumidityWeight + (100 - temperature) * temperatureWeight;
        return Math.min(Math.max(initialHealth, 0), 100); // Garante que a saúde esteja entre 0 e 100
    }

    static calculatePlantHealth(sensorData: SensorData, days: number): number[] {
        const soilMoistureSensor = sensorData.sensors.find(sensor => sensor.type === "Umidade_do_Solo");
        const airHumiditySensor = sensorData.sensors.find(sensor => sensor.type === "Umidade");
        const temperatureSensor = sensorData.sensors.find(sensor => sensor.type === "Tempratura");

        if (!soilMoistureSensor || !airHumiditySensor || !temperatureSensor) {
            throw new Error("Missing sensor data");
        }

        let currentHealth = this.calculateInitialHealth(soilMoistureSensor.value, airHumiditySensor.value, temperatureSensor.value);
        const healthOverTime = [currentHealth];

        for (let day = 1; day <= days; day++) {
            let soilMoistureEffect = soilMoistureSensor.value > 50 ? 0 : (50 - soilMoistureSensor.value) / this.getRandonInt(5, 45);
            let airHumidityEffect = airHumiditySensor.value > 40 ? 0 : (40 - airHumiditySensor.value) / this.getRandonInt(50, 88);
            let temperatureEffect = temperatureSensor.value < 30 ? 0 : (temperatureSensor.value - 30) / this.getRandonInt(5, 66);

            currentHealth -= soilMoistureEffect + airHumidityEffect + temperatureEffect;
            currentHealth = Math.max(0, currentHealth); // Garante que a saúde não seja negativa
            healthOverTime.push(Math.round(currentHealth));
        }

        return healthOverTime;
    }

    static getRandonInt(min: number, max: number) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

}