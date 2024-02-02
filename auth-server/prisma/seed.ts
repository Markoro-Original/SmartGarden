import {PrismaClient} from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
    const user1 = await prisma.user.create({
        data: {
            email: "test@test.com",
            name: "Test User",
            password: "test",
            gardens: {
                create: [
                    {
                        title: "Jardim 1",
                        topic: "Gardening",
                        esps: {
                            create: [
                                {
                                    name: "ESP1",
                                    mac: "00:00:00:00:00:00",
                                    ssid: "ESP_SSID",
                                    sensors: {
                                        create: [
                                            {
                                                name: "Sensor1",
                                                type: "temperature",
                                                value: "25",
                                            },
                                            {
                                                name: "Sensor2",
                                                type: "soilMoisture",
                                                value: "25",
                                            },
                                            {
                                                name: "Sensor3",
                                                type: "humidity",
                                                value: "25",
                                            },
                                            {
                                                name: "Sensor4",
                                                type: "light",
                                                value: "25",
                                            },
                                        ],
                                    },
                                },
                            ],
                        },
                        Simulation: {
                            create: [
                                {
                                    name: "Simulação 1",
                                    isRunning: false,
                                    data: "Dados da simulação",
                                },
                            ],
                        },
                    },
                ],
            },
        },
    });
    const user2 = await prisma.user.create({
        data: {
            email: "bob@example.com",
            name: "Bob",
            password: "bobpassword",
            gardens: {
                create: [
                    {
                        title: "Bob's Garden",
                        topic: "Gardening",
                        esps: {
                            create: [
                                {
                                    name: "ESP2",
                                    mac: "00:00:00:00:00:01",
                                    ssid: "ESP_SSID",
                                    sensors: {
                                        create: [
                                            {
                                                name: "Sensor1",
                                                type: "temperature",
                                                value: "25",
                                            },
                                            {
                                                name: "Sensor2",
                                                type: "soilMoisture",
                                                value: "25",
                                            },
                                            {
                                                name: "Sensor3",
                                                type: "humidity",
                                                value: "25",
                                            },
                                            {
                                                name: "Sensor4",
                                                type: "light",
                                                value: "25",
                                            },
                                        ],
                                    },
                                },
                            ],
                        },
                    },
                ],
            },
        },
    });

    console.log({user1, user2});
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });